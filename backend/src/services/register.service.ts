import UserEntity from '../entities/user.entity';
import UserModel from '../models/user.model';
import UserRepository from '../repositories/user.repository';
import { HttpNotFoundError, HttpBadRequestError } from '../utils/errors/http.error';
import { ValidationMessages } from '../utils/validation/validationMessages';
import bcrypt from 'bcrypt';

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
    // Aqui no service ele passa nessa verificação:
    if (existingUserByEmail) {
      throw new HttpBadRequestError({ msg: 'User with this email already exists', msgCode: ValidationMessages.EMAIL_ALREADY_EXISTS });
    }
  
    const existingUserByCpf = await this.userRepository.findOneByCpf(data.cpf);
    if (existingUserByCpf) {
      throw new HttpBadRequestError({ msg: 'User with this CPF already exists', msgCode: ValidationMessages.CPF_ALREADY_EXISTS });
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
  
    if (data.password && typeof data.password !== 'string') {
      throw new HttpBadRequestError({ msg: 'Password must be a string' });
    }
  
    if (data.password && data.password.trim() === '') {
      throw new HttpBadRequestError({ msg: 'Password cannot be empty' });
    }
  
    // Fetch the existing user to preserve fields if not being updated
    const existingUser = await this.userRepository.getUser(id);
    if (!existingUser) {
      throw new HttpNotFoundError({ msg: 'User not found' });
    }
  
    if (data.password) {
      // Encrypt the password
      data.password = await bcrypt.hash(data.password, 10);
    }
  
    // Preserve existing fields if not provided in the update data
    const updatedData: Partial<UserEntity> = {
      name: data.name ?? existingUser.name,
      email: data.email ?? existingUser.email,
      gender: data.gender ?? existingUser.gender,
      cpf: data.cpf ?? existingUser.cpf,
      cep: data.cep ?? existingUser.cep,
      password: data.password ?? existingUser.password,
      paymentMethod: data.paymentMethod ?? existingUser.paymentMethod,
      recoveryQuestion: data.recoveryQuestion ?? existingUser.recoveryQuestion,
      active: data.active ?? existingUser.active
    };
  
    if (updatedData.email) {
      const existingUserByEmail = await this.userRepository.findOneByEmail(updatedData.email);
      if (existingUserByEmail && existingUserByEmail.id !== id) {
        throw new HttpBadRequestError({ msg: 'User with this email already exists' });
      }
    }
  
    if (updatedData.cpf) {
      const existingUserByCpf = await this.userRepository.findOneByCpf(updatedData.cpf);
      if (existingUserByCpf && existingUserByCpf.id !== id) {
        throw new HttpBadRequestError({ msg: 'User with this CPF already exists' });
      }
    }
  
    const entity = await this.userRepository.updateUser(id, updatedData);
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
