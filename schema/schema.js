const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const { userQueries, userMutations } = require('./users/user')
const { caseQueries, caseMutations, caseSubscription } = require('./cases/case')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...userQueries,
      ...caseQueries,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...userMutations,
      ...caseMutations,
    }),
  }),
  subscription: new GraphQLObjectType({
    name: 'Subscription',
    fields: () => ({
      ...caseSubscription,
    }),
  }),
})
