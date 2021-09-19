import { Request, Response } from 'express'
import User from '../models/user'
import { collections } from '../services/database.service'
import { logger } from '@noodlewrecker7/logger'

const log = logger.Logger

/**Creates a new user entry */
export async function create(req: Request, res: Response): Promise<void> {
  const user: User = req.body as User
  log.debug(JSON.stringify(user))
  const test = await collections.users?.findOne({ steamid: user.steamid })
  if (test) {
    res.status(409).send('User with that steam id already exists')
    return
  }

  const result = await collections.users?.insertOne(user)

  if (result) {
    res.status(201).send('Succesfully added')
  } else {
    res.status(500).send('Failed to add')
  }
}

/**Gets a single user by id */
export async function get(req: Request, res: Response) {
  const id = req.params.steamid

  const query = { steamid: id }
  const user = (await collections.users?.findOne(query)) as User
  if (user) {
    res.status(200).send(user)
  } else {
    res.status(404).send("Couldn't find that user.")
  }
}

export async function remove(req: Request, res: Response) {}
