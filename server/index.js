const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const resolvers = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})
dotenv.config()
mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected')
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
