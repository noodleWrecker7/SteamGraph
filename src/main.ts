import 'source-map-support/register'
import express, { Express } from 'express'
import cors from 'cors'
import routes from './routes'
import { Server } from 'http'
import { logger } from '@noodlewrecker7/logger'
import dotenv from 'dotenv'
dotenv.config()
import Logger = logger.Logger
import { getOwnedGameData } from './services/steamdata.service'
import { ConfigManager } from './configManager'
import { User } from './models/user'
import { sequelize } from './services/database.service'
import { doAllLogging, startScheduler } from './services/scheduler.service'
sequelize.sync({ alter: true }).catch((err) => {
  log.error(err)
})

/* process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  // application specific logging, throwing an error, or other logic here
}) */

const log = logger.Logger
log.setLevel(Logger.Levels.TRACE)
log.info('Token ' + process.env.token)

const PORT = process.env.PORT || 12345
const app: Express = express()
const http = new Server(app)

app.set('trust proxy', 1) // trust first
const origin = process.env.ORIGIN_URL
app.use(cors({ origin, credentials: true }))

app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ type: 'application/x-www-form-urlencoded', extended: true }))

routes(app)

http.listen(PORT, () => {
  log.info('Listening on port: ' + PORT)

  startScheduler()
})
