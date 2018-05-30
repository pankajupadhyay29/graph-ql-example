const { GraphQLList, GraphQLNonNull } = require('graphql')
const isEmail = require('validator/lib/isEmail')
const caseModel = require('../../models/case')

const { CaseType, CaseInputType } = require('./caseTypes')

const caseQueries = {
  cases: {
    type: new GraphQLList(CaseType),
    resolve: async () => {
      const cases = await new Promise(resolve =>
        caseModel.getAll((err, cases) => {
          resolve(cases)
        })
      )
      return cases
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
    resolve: async (rootValue, { input }) => {
      const result = await new Promise(resolve => {
        caseModel.createCase(
          new caseModel({
            title: input.title,
            description: input.description,
            status: input.status,
            department: input.department,
            reporter: input.reporter,
            assignee: input.assignee,
          }),
          (err, newCase) => {
            if (err) throw err

            resolve(newCase)
          }
        )
      })
      return result
    },
  },
}

module.exports = {
  caseQueries,
  caseMutations,
}
