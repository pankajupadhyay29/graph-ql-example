const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')

const cors = require('cors')
const bodyParser = require('body-parser')

const config = require('./config')
const schema = require('./schema/schema')

const app = express()
const prod = process.env.NODE_ENV === 'prod'

mongoose.connect(
  `mongodb+srv://${config.db.username}:${config.db.username}@${config.db.url}?retryWrites=true`,
  { autoIndex: false }
)

const PORT = 3000
const server = express()

server.use('*', cors({ origin: 'http://localhost:{PORT}' }))

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema
  })
)

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  })
)

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server)

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`)

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: '/subscriptions'
    }
  )
})
