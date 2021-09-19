import { Express, NextFunction, Request, Response } from 'express'
import usersRouter from './users'
import gamesRouter from './games'
import { logger } from '@noodlewrecker7/logger'

const log = logger.Logger

export default (app: Express): void => {
  // all routes files need to be called here
  usersRouter(app)
  gamesRouter(app)

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    log.error(err.stack)
    res.status(500).send('Something broke!')
  })
}
