const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String 
  }

  type Assets {
    _id: ID
    asset_type: String!
    asset_name: String!
    installed_parts: String
    part_number: String
    maintenance_month: String!
  }

  type InstalledParts {
    _id: ID
    asset_type: String
    possible_parts: String 
  }

  type Clients {
    id: ID!
    site_name: String
    client_name: String
    labour_rate: Int
  }

  type Parts {
    id: ID!
    part_name: String
    part_number: String
    unit_price: Int    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
   
  }
`;

module.exports = typeDefs;
