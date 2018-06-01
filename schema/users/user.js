const { GraphQLList, GraphQLNonNull } = require('graphql')
const { internet, random } = require('faker')
const isEmail = require('validator/lib/isEmail')
const userModel = require('../../models/user')

const { UserType, UserInputType } = require('./userTypes')

const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => {
      const users = await new Promise(resolve =>
        userModel.getAll((err, data) => {
          resolve(data.users)
        })
      )
      return users
    },
  },
}

const userMutations = {
  createUser: {
    type: UserType,
    args: {
      input: {
        type: new GraphQLNonNull(UserInputType),
      },
    },
    resolve: async (rootValue, { input }) => {
      if (!isEmail(input.email)) {
        throw new Error('The email is not in a valid format')
      }
      const existingUser = await userModel.getUserByEmail(input.email);

      if (existingUser) {
        throw new Error('The email ${input.email} is already used')
      }

      const result = await new Promise(resolve => {
        userModel.createUser(
          new userModel({
            name: input.name,
            email: input.email,
            password: input.password,
            username: input.username,
          }),
          () => {
            userModel.getUserByUsername(input.username, user => {
              resolve(user)
            })
          }
        )
      })
      return result
    },
  },
}

module.exports = {
  userQueries,
  userMutations,
}
