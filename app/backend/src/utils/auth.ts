import { sign } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

const newToken = (user: { id: number, email: string }) => {
  const token = sign(user, secretKey as string);
  return token;
};

export default newToken;
