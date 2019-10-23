import { model, Schema } from 'mongoose'

const userSchema = new Schema({
    username: {
      type: String,
      unique: true,
    },
/*
    email: {
      type: String,
      unique: true
    },
    password: String,
    imageUrl: String,
    videos: [String],
    createOn: {
      type: Date,
      default: Date.now()
    }
*/
  }
)

export const User = model('User', userSchema)
