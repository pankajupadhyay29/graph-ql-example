const { GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql')
const isEmail = require('validator/lib/isEmail')
const caseModel = require('../../models/case')

const { CaseType, CaseInputType } = require('./caseTypes')

const caseQueries = {
  cases: {
    type: new GraphQLList(CaseType),
    resolve: caseModel.getAll,
  },
  CaseByTitle: {
    type: CaseType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: (rootValue, { title }) => {
      return caseModel.getCaseByTitle(title)
    },
  },
}

const caseMutations = {
  createUserCase: {
    type: CaseType,
    args: {
      input: {
        type: new GraphQLNonNull(CaseInputType),
      },
    },
    resolve: (rootValue, { input }) => {
      return caseModel.getCaseByTitle(input.title).then(existingCase => {
        if (existingCase) {
          throw Error('Case already exists with same title')
        }

        return caseModel.createCase(
          new caseModel({
            title: input.title,
            description: input.description,
            status: input.status,
            department: input.department,
            reporter: input.reporter,
            assignee: input.assignee,
          })
        )
      })
    },
  },
}

module.exports = {
  caseQueries,
  caseMutations,
}
