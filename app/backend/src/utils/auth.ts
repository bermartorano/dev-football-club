import { decode, sign, verify } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

const newToken = (user: { id: number, email: string }) => {
  const token = sign(user, secretKey as string);
  return token;
};

export const decodeToken = (token: string) => {
  const decodedToken = decode(token);
  return decodedToken as { id: number, email: string };
};

export const verifyToken = (token: string) => {
  const isTokenValid = verify(token, secretKey as string);
  return isTokenValid;
};

export default newToken;
