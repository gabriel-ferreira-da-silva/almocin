import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { HttpNotFoundError,HttpBadRequestError } from '../utils/errors/http.error';
import UserRepository from '../repositories/user.repository';
import { generateToken } from '../utils/auth/generateToken';

class LoginService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpNotFoundError({ msg: 'User not found or password incorrect' });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    return token;
  }

  public static getUserIdFromRequest(req: Request): string | null {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
      return decodedToken.userId;
    } catch (error) {
      return null;
    }
  }
  public async resetPassword(email: string, recoveryQuestion: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new HttpNotFoundError({ msg: 'User not found' });
    }

    if (user.recoveryQuestion !== recoveryQuestion) {
      throw new HttpBadRequestError({ msg: 'Invalid recovery question' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashedPassword;
    await this.userRepository.updateUser(user.id, user);
  }
}

export default LoginService;
