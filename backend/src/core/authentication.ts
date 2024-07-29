import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/auth/generateToken';

interface CustomRequest extends Request {
  user?: any; // Você pode definir um tipo mais específico se souber a estrutura do payload do token
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  let token;
  if (process.env.ENV == 'TEST') {
    token = generateToken('123');
  } else {
    token = req.headers.authorization;
  }

  if (!token) {
    return res.status(401).json({ msg: 'Access denied. No token provided.' });
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || 'defaultSecret');
    req.user = decodedToken; // Adiciona o payload do token ao objeto de request
    next();
  } catch (error) {
    return res.status(400).json({ msg: 'Invalid token.' });
  }
};

export default authMiddleware;
