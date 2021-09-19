// External Dependencies
import * as mongoDB from 'mongodb'
import dotenv from 'dotenv'

// Global Variables
export const collections: { games?: mongoDB.Collection; users?: mongoDB.Collection } = {}

// Initialize Connection
/** Connects to the mongo db*/
export async function connectToDB() {
  dotenv.config()
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw Error
  }
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri, {
    //@ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await client.connect()

  const db: mongoDB.Db = client.db(process.env.DB_NAME)

  // @ts-ignore
  const gameCollection: mongoDB.Collection = db.collection(process.env.GAMES_COLLECTION_NAME)

  collections.games = gameCollection

  // @ts-ignore
  const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME)

  collections.users = usersCollection
}
