import { compare } from 'bcryptjs';
import UserModel from '../database/models/User';
import User from '../entities/UserEntities/User';
import InvalidFieldsError from '../errorClasses.ts/InvalidFields';

export default class LoginService {
  static async login(email: string, password: string) {
    const user = new User(email, password);
    const userChecked = await UserModel.findOne({ where: { email: user.email } });
    if (!userChecked) throw new InvalidFieldsError('Invalid email or password');
    const passwordMatch = await compare(user.password, userChecked.password);
    console.log('******* As senhas são iguais? ', passwordMatch);
    return 'token';
  }
}
