const { GraphQLString, GraphQLObjectType } = require('graphql')

const DepartmentType = new GraphQLObjectType({
  name: 'DepartmentType',
  description: 'Department type definition',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  }),
})

module.exports = {
  DepartmentType,
}
