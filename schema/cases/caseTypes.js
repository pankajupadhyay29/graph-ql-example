const {
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLEnumType
} = require('graphql')

const { UserType } = require('../users/userTypes')
const userModel = require('../../models/user')

const StatusType = new GraphQLEnumType({
  name: 'Status',
  values: {
    Open: { value: 0 },
    InProgress: { value: 1 },
    OnHold: { value: 2 },
    Resolved: { value: 3 },
    Closed: { value: 4 }
  }
})

const CaseType = new GraphQLObjectType({
  name: 'CaseType',
  description: 'Case type definition',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    department: {
      type: GraphQLString
    },
    reporter: {
      type: UserType,
      resolve: async parent => {
        const reporter = await new Promise(resolve => {
          userModel.getUserById(parent.reporter, user => resolve(user))
        })

        return reporter
      }
    },
    assignee: {
      type: UserType,
      resolve: async parent => {
        const assignee = await new Promise(resolve => {
          userModel.getUserById(parent.assignee, user => {
            return resolve(user)
          })
        })

        return assignee
      }
    }
  })
})

const CaseInputType = new GraphQLInputObjectType({
  name: 'CaseInputType',
  description: 'Case payload definition',
  fields: () => ({
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    status: {
      type: StatusType
    },
    department: {
      type: GraphQLString
    },
    reporter: {
      type: GraphQLID
    },
    assignee: {
      type: GraphQLID
    }
  })
})

module.exports = {
  CaseType,
  CaseInputType
}
