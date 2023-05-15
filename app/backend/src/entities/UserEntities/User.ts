import InvalidFieldsError from '../../errorClasses.ts/InvalidFields';
import MissingFieldsError from '../../errorClasses.ts/MissingFields';

export default class User {
  constructor(
    private _email: string,
    private _password: string,
  ) {
    if (!_email || !_password) throw new MissingFieldsError('All fields must be filled');
    if (!this.emailCheck(_email)) throw new InvalidFieldsError('Invalid email or password');
    if (this._password.length < 6) throw new InvalidFieldsError('Invalid email or password');
  }

  private emailCheck = (email: string) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }
}
