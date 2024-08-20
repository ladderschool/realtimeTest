export const schema = gql`
  type Point {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    reason: String!
    amount: Int!
    user: User!
    userId: Int!
  }

  type Query {
    points: [Point!]! @requireAuth
    point(id: Int!): Point @requireAuth
  }

  input CreatePointInput {
    reason: String!
    amount: Int!
    userId: Int!
  }

  input UpdatePointInput {
    reason: String
    amount: Int
    userId: Int
  }

  type Mutation {
    createPoint(input: CreatePointInput!): Point! @requireAuth
    updatePoint(id: Int!, input: UpdatePointInput!): Point! @requireAuth
    deletePoint(id: Int!): Point! @requireAuth
  }
`
