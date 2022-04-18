import { logger } from '@noodlewrecker7/logger'

const log = logger.Logger

import schedule from 'node-schedule'
import { GameEntry } from '../models/gameEntry'
import { User } from '../models/user'
import { sequelize } from './database.service'
import { getOwnedGameData } from './steamdata.service'

export function startScheduler(): void {
  const job = schedule.scheduleJob('5 0 * * *', function () {
    log.info('Cron activated')
    doAllLogging().catch((err) => log.error(err))
  })
  log.info('Scheduling started')
}

export async function doAllLogging(): Promise<void> {
  const users: User[] = await User.findAll({ where: { isTracked: true } })
  log.info('Logging data for ' + users.length + ' users')

  users.forEach((user) => {
    logDataForUser(user).catch((err) => {
      log.debug('logDataForUser failed')
      log.error(err)
    })
  })
}

async function logDataForUser(user: User): Promise<void> {
  const data = (await getOwnedGameData(user.steamid)).response
  log.debug('got the data from steam')
  data.games.forEach((game: { appid: number; playtime_forever: number }) => {
    GameEntry.create({ user: user.steamid, game: game.appid, timePlayed: game.playtime_forever }).catch(
      (err) => {
        log.debug('creating gameEntry failed')
        log.error(err)
      }
    )
  })
}
