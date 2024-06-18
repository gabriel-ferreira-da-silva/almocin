import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: any; // Você pode definir um tipo mais específico se souber a estrutura do payload do token
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = process.env.ENV == 'TEST' ? 'defaultSecret' : req.headers.authorization?.split(' ')[1];

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
