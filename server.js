const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const _ = require('lodash')

const config = require('./config')
const schema = require('./schema/schema')

const app = express()
const prod = process.env.NODE_ENV === 'prod'

const credentials = _.compact([config.db.username, config.db.username]).join(':')

const connectionStr = _.isEmpty(credentials) ? config.db.url : `${credentials}@${config.db.url}`
mongoose.connect(
  `mongodb+srv://${connectionStr}?retryWrites=true`,
  { autoIndex: false }
)

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: !prod,
  })
)

app.use('/', (req, res) => {
  res.json('Go to /graphql to test your queries and mutations!')
})

const server = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address()
  console.info(`\n\nExpress listen at http://localhost:${port} \n`)
})
