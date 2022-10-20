import { gql } from 'apollo-server';

// One type of approach where we use the gql export in this strange way with grave accent marks
// and alternative approach in our case of TS would be to utilize type-graphql package with it's provided decorators, as seen in the User class in models folder
export const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: ID!
    username: String!
    age: Int!
  }
`;
