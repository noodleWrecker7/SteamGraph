import got from 'got'
import { logger } from '@noodlewrecker7/logger'
import { cfg } from '../configManager'

const log = logger.Logger

/**Gets steam data for the user */
export async function getOwnedGameData(steamid: string) {
  const apistring =
    'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' +
    cfg.get('TOKEN') +
    '&steamid=' +
    steamid +
    '&format=json&include_played_free_games=true'

  try {
    const response = await got(apistring)
    return JSON.parse(response.body)
  } catch (error) {
    log.error(error)
  }
}
