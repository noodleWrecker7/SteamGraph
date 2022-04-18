import { DataTypes, Model, Sequelize } from 'sequelize'
import { GameEntry } from './gameEntry'

export class User extends Model {
  declare steamid: string
  declare isTracked: boolean
}

export default function (sequelize: Sequelize): void {
  User.init(
    {
      steamid: { type: DataTypes.STRING, unique: true, primaryKey: true },
      isTracked: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    { sequelize: sequelize }
  )
}
