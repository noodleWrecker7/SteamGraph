import express, { Express, Request } from 'express'
import * as users from '../controllers/users'
import { logger } from '@noodlewrecker7/logger'

const log = logger.Logger

const usersRouter = express.Router()
usersRouter.use(express.json())
export default (app: Express): void => {
  app.use('/users', usersRouter)
}

usersRouter.all('*', (req: Request, res, next) => {
  log.info('Request received ' + req.originalUrl)
  next()
})

usersRouter.get('/:steamid/:appid', users.getAppData)
usersRouter.post('/', users.register)
usersRouter.delete('/:steamid', users.remove)
