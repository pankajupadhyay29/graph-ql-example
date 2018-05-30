const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongo = require('mongodb')
const mongoose = require('mongoose')

const config = require('./config')
const schema = require('./schema/schema')

const app = express()
const prod = process.env.NODE_ENV === 'prod'

mongoose.connect(
  `mongodb+srv://${config.db.username}:${config.db.username}@${config.db.url}?retryWrites=true`,
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
