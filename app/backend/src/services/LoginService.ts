import { compare } from 'bcryptjs';
import UserModel from '../database/models/User';
import User from '../entities/UserEntities/User';
import InvalidFieldsError from '../errorClasses.ts/InvalidFields';
import newToken, { decodeToken } from '../utils/auth';

export default class LoginService {
  static async login(email: string, password: string) {
    const user = new User(email, password);
    const userMatched = await UserModel.findOne({ where: { email: user.email } });
    if (!userMatched) throw new InvalidFieldsError('Invalid email or password');
    const passwordMatch = await compare(user.password, userMatched.password);
    if (!passwordMatch) throw new InvalidFieldsError('Invalid email or password');
    return newToken({ id: userMatched.id, email: userMatched.email });
  }

  static async getRole(token: string) {
    const { id: userId } = decodeToken(token);
    const user = await UserModel.findByPk(userId);
    if (!user) throw new InvalidFieldsError('Invalid fields');
    const { role } = user;
    return role;
  }
}
