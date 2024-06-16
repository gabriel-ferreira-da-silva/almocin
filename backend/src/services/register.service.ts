import UserEntity from '../entities/user.entity';
import UserModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import { HttpNotFoundError, HttpBadRequestError } from '../utils/errors/http.error';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<UserModel[]> {
    const entities = await this.userRepository.getUsers();
    return entities.map(entity => new UserModel(entity));
  }

  public async getUser(id: string): Promise<UserModel> {
    const entity = await this.userRepository.getUser(id);
    if (!entity) {
      throw new HttpNotFoundError({
        msg: 'User not found',
        msgCode: 'user_not_found',
      });
    }
    return new UserModel(entity);
  }

  public async createUser(data: UserEntity): Promise<UserModel> {
    const existingUserByEmail = await this.userRepository.findOneByEmail(data.email);
    if (existingUserByEmail) {
      throw new HttpNotFoundError({ msg: 'User with this email already exists' });
    }
  
    const existingUserByCpf = await this.userRepository.findOneByCpf(data.cpf);
    if (existingUserByCpf) {
      throw new HttpNotFoundError({ msg: 'User with this CPF already exists' });
    }
  
    const entity = await this.userRepository.createUser(data);
    return new UserModel(entity);
  }

  public async updateUser(id: string, data: Partial<UserEntity>): Promise<UserModel> {
    if (data.email && typeof data.email !== 'string') {
      throw new HttpBadRequestError({ msg: 'Email must be a string' });
    }
  
    if (data.cpf && typeof data.cpf !== 'string') {
      throw new HttpBadRequestError({ msg: 'CPF must be a string' });
    }
  
    if (data.email) {
      const existingUserByEmail = await this.userRepository.findOneByEmail(data.email);
      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new HttpNotFoundError({ msg: 'User with this email already exists' });
      }
    }
  
    if (data.cpf) {
      const existingUserByCpf = await this.userRepository.findOneByCpf(data.cpf);
      if (existingUserByCpf && existingUserByCpf.id !== id) {
        throw new HttpNotFoundError({ msg: 'User with this CPF already exists' });
      }
    }
  
    const entity = await this.userRepository.updateUser(id, data);
    if (!entity) {
      throw new HttpNotFoundError({ msg: 'User not found' });
    }
    return new UserModel(entity);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}

export default UserService;
