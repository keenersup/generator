import { normalizeErrors } from "../utils/normalizeErrors";
import { UserInputError } from 'apollo-server'
import { register, login,  updateUser, editPassword } from "../schemas";
import { SECRET_KEY, REFRESH_SECRET_KEY } from "../config";
import { generateTokens, refreshTokens } from "../utils/generateToken";
import * as jwt from "jsonwebtoken";


const editUser = async(models,user) =>{
  const updatedUser = await models.User.findOneAndUpdate({ _id: user.id }, { $set: updateObj }, { new: true })
  const refreshSecret = updatedUser.password + REFRESH_SECRET_KEY
  const [accessToken, refreshToken] = generateTokens(user, SECRET_KEY, refreshSecret, clientId)
  await updatedUser.updateOne({ $set: { refreshToken } })
  return {
    ...updatedUser._doc,
    id: updatedUser._id,
    accessToken,
  }
}

export default {
  Query: {
    allUsers: async (_, args, { models }) => {
      try {
        return await models.User.find({})
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('allUsers error', { errors })
      }
    },
    getUser: async (_, { id }, { models }) => {
      try {
        const user = await models.User.findById(id)
        if (!user) {
          throw { user: 'no user' }
        }
        return {
          ...user._doc,
          id: user._id,
        }
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('getUser error', { errors })
      }
    },
  },
  Mutation: {
    register: async (_, { registerInput: { username, email, password, confirmPassword, clientId } }, { models, user }) => {
      try {
        await register.validate({ username, email, password, confirmPassword },  { abortEarly: false })

        /********* ********* ********* ********* ********* ********* ********* ********* *********
         todo: refreshToken save in object field and check with Fingerprint id
         ********* ********* ********* ********* ********* ********* ********* ********* *********/
        const refreshSecret = password + REFRESH_SECRET_KEY

        const newUser = await new models.User({
          username, email, password
        })

        if (user && user.roles.includes("admin")) {
          newUser.roles = ["admin", "user"]
          await newUser.save()
          return {
            ...newUser._doc,
            id: newUser._id,
          }
        }

        const [accessToken, refreshToken] = generateTokens(newUser, SECRET_KEY, refreshSecret, clientId);
        newUser.refreshToken = refreshToken;
        await newUser.save()
        return {
          ...newUser._doc,
          id: newUser._id,
          accessToken,
        }

      } catch (err) {
        console.log(err);
        const errors = normalizeErrors(err)
        throw new UserInputError('register mutation', { errors })
      }
    },

    login: async (_, { username, password, clientId }, { models }) => {
      try {
        await login.validate({ username, password },  { abortEarly: false })

        const user = await models.User.findOne({ username })
        if (!user) {
          throw { username: 'username not found' }
        }

        if (!await user.matchesPassword(password)) {
          throw { password: 'Wrong credentials' }
        }

        const refreshSecret = user.password + REFRESH_SECRET_KEY
        const [accessToken, refreshToken] = generateTokens(user, SECRET_KEY, refreshSecret, clientId)

        await user.updateOne({ $set: { refreshToken } }, { new: true })

        return {
          ...user._doc,
          id: user._id,
          accessToken,
        }
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('login mutation', { errors })
      }
    },

    updateUser: async (_, { updateUserInput }, { models, user }) => {
      const { email, currentPassword, password, confirmPassword, clientId } = updateUserInput

      const updateObj = {}
      Object.keys(updateUserInput).forEach(key => {
        if (key === 'password') {
          updateObj[key] = updateUserInput[key]
        }
      })

      try {
        await updateUser.validate({ email, currentPassword, password, confirmPassword }, { abortEarly: false })
        const foundUser = await models.User.findById(user.id)

        if (!await foundUser.matchesPassword(updateUserInput.currentPassword)) {
          throw { currentPassword: "not matched" }
        }
        return await editUser(models,user)
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('updateUser error', { errors })
      }
    },

    editPassword: async (_, { editPasswordInput }, { models, user }) => {
      const { currentPassword, password, confirmPassword, clientId } = editPasswordInput
      try {
        await editPassword.validate({ currentPassword, password, confirmPassword }, { abortEarly: false })

        const foundUser = await models.User.findById(user.id)

        if (!await foundUser.matchesPassword(currentPassword)) {
          throw { currentPassword: "not matched" }
        }

        if (await foundUser.matchesPassword(password)) {
          throw { password: "same password" }
        }
        return await editUser(models,user)
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('updateUser error', { errors })
      }
    },
    deleteUser: async (_, { id }, { models }) => {
      try {
        return !!await models.User.findByIdAndRemove(id)
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('deleteUser error', { errors })
      }
    },
    refreshToken: async (_, { accessToken, clientId }, { models, req }) => {
      try {
        const decodedUser = await jwt.decode(accessToken)
        if (!decodedUser) {
          throw { decoded: 'can not decoded' }
        }
        const user = await models.User.findById(decodedUser.id)
        if (!user) {
          throw { user: 'user not found' }
        }
        const [newAccessToken, newRefreshToken] = await refreshTokens(accessToken, user, clientId, req)
        await user.updateOne({ $set: { refreshToken: newRefreshToken } })
        return {
          accessToken: newAccessToken
        }
      } catch (err) {
        const errors = normalizeErrors(err)
        throw new UserInputError('refreshToken error', { errors })
      }
    },
  }
}