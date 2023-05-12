import { DataTypes, Model } from 'sequelize';
import db from '.';

export interface TeamAttributes {
  id: number,
  teamName: string,
}

export type TeamCreationalAttributes = Omit<TeamAttributes, 'id'>;

class TeamModel extends Model<TeamAttributes, TeamCreationalAttributes> implements TeamAttributes {
  declare id: number;
  declare teamName: string;
}

TeamModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

export default TeamModel;
