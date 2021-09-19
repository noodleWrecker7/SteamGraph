import got from 'got'
import { logger } from '@noodlewrecker7/logger'

const log = logger.Logger

/**Gets steam data for the user */
export async function getDataForUser(steamid: string) {
  const apistring =
    'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' +
    process.env.TOKEN +
    '&steamid=' +
    steamid +
    '&format=json'

  try {
    const response = await got(apistring)
    log.debug(response.body)
  } catch (error) {
    log.error(error)
  }
}
