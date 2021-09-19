import 'source-map-support/register'
import express, { Express } from 'express'
import cors from 'cors'
import routes from './routes'
import { Server } from 'http'
import { logger } from '@noodlewrecker7/logger'
import dotenv from 'dotenv'
dotenv.config()
import Logger = logger.Logger
import { connectToDB } from './services/database.service'
import { getDataForUser } from './services/steamdata.service'

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

connectToDB().then(() => {
  routes(app)

  http.listen(PORT, () => {
    log.info('Listening on port: ' + PORT)
    getDataForUser('76561198113074034')
  })
})
