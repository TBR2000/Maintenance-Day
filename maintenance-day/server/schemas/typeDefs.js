const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Assets {
    _id: ID
    asset_type: String!
    asset_name: String!
    installed_parts: String
    part_number: String
    maintenance_month: String!
  }

  type Parts {
    _id: ID
    asset_type: String
    possible_parts: String
    
  }

  type Auth {
    token: ID!
    user: Users
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    
`;

module.exports = typeDefs;
