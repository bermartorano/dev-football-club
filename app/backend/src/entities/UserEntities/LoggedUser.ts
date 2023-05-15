import User from './User';

export default class LoggedUser extends User {
  constructor(
    private _username: string,
    private _role: string,
    email: string,
    password: string,
  ) {
    super(email, password);
  }

  get username() {
    return this._username;
  }

  get role() {
    return this._role;
  }
}
