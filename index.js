import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { typeDefs } from './ecom_agent_db_schema.js'
import { resolvers } from './aerd_resolver.js'

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT }
})

console.log(`Server ready at: ${url}`)

