import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

export default generateToken;
