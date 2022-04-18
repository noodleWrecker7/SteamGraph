import { DataTypes, Model, Sequelize } from 'sequelize'
import { User } from './user'

export class GameEntry extends Model {
  declare user: string
  declare game: string
  declare timePlayed: number
}

export default function (sequelize: Sequelize): void {
  GameEntry.init(
    {
      user: { type: DataTypes.STRING, unique: false },
      game: { type: DataTypes.STRING, unique: false },
      timePlayed: { type: DataTypes.NUMBER }
    },
    {
      sequelize: sequelize,
      timestamps: true,
      createdAt: true
    }
  )
}
