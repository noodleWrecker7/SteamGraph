import express, { Express } from 'express'
import * as games from '../controllers/games'
import { logger } from '@noodlewrecker7/logger'

const log = logger.Logger

const gamesRouter = express.Router()
gamesRouter.use(express.json())
export default (app: Express): void => {
  app.use('/games', gamesRouter)
}

gamesRouter.all('*', (req, res, next) => {
  log.info('Request received /games')
  next()
})
