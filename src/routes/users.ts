import express, { Express } from 'express'
import * as users from '../controllers/users'
import { logger } from '@noodlewrecker7/logger'

const log = logger.Logger

const usersRouter = express.Router()
usersRouter.use(express.json())
export default (app: Express): void => {
  app.use('/users', usersRouter)
}

usersRouter.all('*', (req, res, next) => {
  log.info('Request received /users')
  log.debug(JSON.stringify(req.body))
  next()
})

usersRouter.get('/:steamid', users.get)
usersRouter.post('/', users.create)
usersRouter.delete('/:steamid', users.remove)
