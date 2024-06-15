import UserEntity from '../entities/user.entity';
import BaseRepository from './base.repository';

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super('user');
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.findAll();
  }

  public async getUser(id: string): Promise<UserEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createUser(data: UserEntity): Promise<UserEntity> {
    return await this.add(data);
  }

  public async updateUser(
    id: string,
    data: UserEntity
  ): Promise<UserEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
  public async findOneByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOne((item) => item.email === email);
  }
  
}

export default UserRepository;
