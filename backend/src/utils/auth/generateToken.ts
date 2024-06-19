import jwt from 'jsonwebtoken';

export function generateToken(userId: string): string {
  const payload = {
    userId,
  };

  const options = {
    expiresIn: '24h',
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'defaultSecret', options);
}

