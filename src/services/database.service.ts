// External Dependencies
import dotenv, { config } from 'dotenv'
import { logger } from '@noodlewrecker7/logger'
import uinit from '../models/user'
import ginit, { GameEntry } from '../models/gameEntry'
import { Sequelize, DataTypes } from 'sequelize'
import { cfg } from '../configManager'
import user, { User } from '../models/user'

const log = logger.Logger

// Global Variables

export const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: cfg.get('dbfile') + '.sqlite'
})

uinit(sequelize)
ginit(sequelize)

GameEntry.belongsTo(User, { foreignKey: 'user' })
User.hasMany(GameEntry)
