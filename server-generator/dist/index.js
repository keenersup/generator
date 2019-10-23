"use strict";

var _apolloServer = require("apollo-server");

var _config = require("./config");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = _apolloServer.gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
    }
`;
const books = [{
  title: 'Harry Potter and the Chamber of Secrets',
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}]; // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: {
    books: () => books
  }
}; // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new _apolloServer.ApolloServer({
  cors: {
    // origin: `${REACT_CLIENT_ADDRESS}:${REACT_CLIENT_PORT}`,
    credentials: true
  },
  typeDefs,
  resolvers,
  // schemaDirectives,
  playground: _config.IN_PROD ? false : {
    settings: {
      'request.credentials': 'include'
    }
  },
  context: async ({
    req
  }) => {
    // const user = await addUser(req) || ''
    return {
      req // models,
      // user,

    };
  }
}); // const server = new ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.

server.listen({
  port: process.env.SERVER_PORT
}).then(({
  url
}) => {
  console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map