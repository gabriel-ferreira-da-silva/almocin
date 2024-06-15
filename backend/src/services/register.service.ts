import UserEntity from '../entities/user.entity';
import UserRepository from '../repositories/user.repository';
import { HttpBadRequestError, HttpNotFoundError } from '../utils/errors/http.error';

class RegisterService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async createUser(data: UserEntity): Promise<UserEntity> {
    // Verificar se já existe um usuário com o mesmo CPF ou e-mail
    const existingUser = await this.userRepository.findOne(
      (user) => user.cpf === data.cpf || user.email === data.email
    );

    if (existingUser) {
      throw new HttpBadRequestError({
        msg: 'User with the same CPF or email already exists',
        msgCode: 'user_conflict',
      });
    }

    const newUser = await this.userRepository.add(data);
    return newUser;
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.getUsers();
  }

  public async getUser(id: string): Promise<UserEntity> {
    const user = await this.userRepository.getUser(id);

    if (!user) {
      throw new HttpNotFoundError({
        msg: 'User not found',
        msgCode: 'user_not_found',
      });
    }

    return user;
  }

  public async updateUser(
    id: string,
    data: Partial<UserEntity>
  ): Promise<UserEntity | null> {
    // Verificar se já existe um usuário com o mesmo CPF ou e-mail (excluindo o próprio usuário)
    if (data.cpf || data.email) {
      const existingUser = await this.userRepository.findOne(
        (user) =>
          (user.cpf === data.cpf || user.email === data.email) && user.id !== id
      );

      if (existingUser) {
        throw new HttpBadRequestError({
          msg: 'User with the same CPF or email already exists',
          msgCode: 'user_conflict',
        });
      }
    }

    const updatedUser = await this.userRepository.update((user) => user.id === id, data);

    if (!updatedUser) {
      throw new HttpNotFoundError({
        msg: 'User not found',
        msgCode: 'user_not_found',
      });
    }

    return updatedUser;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete((user) => user.id !== id);
  }
}

export default RegisterService;
