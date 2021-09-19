import { ObjectId } from 'mongodb'
export default class User {
  constructor(public steamid: string, public id?: ObjectId) {}
}
