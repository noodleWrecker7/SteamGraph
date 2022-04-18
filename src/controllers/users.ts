import { Request, Response } from 'express'
import { User } from '../models/user'
import { logger } from '@noodlewrecker7/logger'
import { GameEntry } from '../models/gameEntry'

const log = logger.Logger

/**Creates a new user entry */
export async function register(req: Request, res: Response): Promise<void> {
  if (req.body.steamid == null) {
    res.status(400)
    res.send(new Error('Missing Steam ID'))
  }

  User.create({ steamid: req.body.steamid }).catch((err) => {
    log.error(err)
  })
}

/**Gets a single user by id */
export async function getAppData(req: Request, res: Response) {
  const id = req.params.steamid
  const appid = req.params.appid

  const entries: GameEntry[] = await GameEntry.findAll({
    where: { game: appid, user: id },
    attributes: ['createdAt', 'timePlayed']
  })
  res.send(entries)
}

export async function remove(req: Request, res: Response) {}
