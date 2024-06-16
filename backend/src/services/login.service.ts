import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { HttpNotFoundError } from '../utils/errors/http.error';
import UserRepository from '../repositories/user.repository';

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
    const token = this.generateToken(user.id);

    return token;
  }

  private generateToken(userId: string): string {
    const payload = {
      userId,
    };

    const options = {
      expiresIn: '24h',
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'defaultSecret', options);
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
}

export default LoginService;
