import { normalizeErrors } from "../utils/normalizeErrors";
import { UserInputError } from 'apollo-server'


export default {
  Query: {
    getUser: async (_, { userId }, { models }) => {
      try{
        return await models.User.findById(userId)
      }catch(err){
        const errors = normalizeErrors(err)
        throw new UserInputError('getUser error', { errors })
      }
    },
    allUsers: async (_, args, { models }) => {
      try {
        return await models.User.find({})
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('allUsers error', { errors })
      }
    }
  },
  Mutation: {
    register: async (_, { username }, { models }) => {
      try {
        return await models.User.create({
          username,
        })
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('register mutation', { errors })
      }
    }
  }
}