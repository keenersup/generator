import { ApolloServer } from 'apollo-server'
import path from "path"
import { mergeResolvers, mergeTypes, fileLoader } from 'merge-graphql-schemas'
import { schemaDirectives } from "./directives"
import { dbConnect } from "./utils/dbConnect"
import { models } from "./models"


import { IN_PROD } from "./config";

(() => {
  const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')))
  const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

  const server = new ApolloServer({
/*
    cors: {
      origin: `${REACT_CLIENT_ADDRESS}:${REACT_CLIENT_PORT}`,
      credentials: true,
    },
*/
    typeDefs,
    resolvers,
    schemaDirectives,
    playground: IN_PROD ? false : {
      settings: {
        'request.credentials': 'include',
      }
    },
    context: async ({ req }) => {
      // const user = await addUser(req) || ''
      return {
        req,
        models,
        // user,
      }
    }
  })

  try {
    server.listen({ port: process.env.SERVER_PORT }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
    dbConnect()
  } catch (err) {
    console.error(`server error: ${err}`)
  }
})()
