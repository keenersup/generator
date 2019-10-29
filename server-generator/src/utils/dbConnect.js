import mongoose from 'mongoose'
import {
  MONGO_HOST,
  MONGO_PORT,
  MONGODB_DATABASE,
  MONGODB_USER,
  MONGODB_PASSWORD,
} from '../config'

const connect = () => {
  return mongoose.connect(
    // `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGODB_DATABASE}`
    `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGODB_DATABASE}`
    , {
      user: MONGODB_USER,
      pass: MONGODB_PASSWORD,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
}


export const dbConnect = () => {
  connect()
  const db = mongoose.connection

  db.on('error', () => {
    console.error.bind(console, 'DB error: ')
    setInterval(() => {
      connect()
    }, 5000)
  })
  db.once('open', () => {
    console.log('    DB connect');
  })
  db.on('disconnected', () => {
    console.error('    DB reconnect')
    setInterval(() => {
      connect()
    }, 5000)
  })
}
