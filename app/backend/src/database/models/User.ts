import { DataTypes, Model } from 'sequelize';
import db from '.';

export interface UserAttributes {
  id: number,
  role: string,
  email: string,
  password: string,
  username: string,
}

export type UserCreationalAttributes = Omit<UserAttributes, 'id'>;

class UserModel extends Model<UserAttributes, UserCreationalAttributes> implements UserAttributes {
  declare id: number;
  declare role: string;
  declare email: string;
  declare password: string;
  declare username: string;
}

UserModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  tableName: 'users',
});

export default UserModel;
