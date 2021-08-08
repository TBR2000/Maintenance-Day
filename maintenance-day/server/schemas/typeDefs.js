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
    possible_parts: InstalledParts
    part_number: String
    maintenance_month: String!
  }


  type InstalledParts {
    _id: ID
    asset_type: String
    possible_parts: String
    part_number: String 
    installed: Boolean
  }

  type Responses {
    question: String
    response: String
    asset: Assets

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

  type GetServers {
    Id: String!
    response: String!
  }

  type GetVavs {
    maintenanceObjects: String!
    assetValue: String!
    assetSetpoint: String!
    assetDamper: String!
    response: String!
  }

  type Query {
    users: [User]
    user(username: String!): User
    Assets: [Assets]
    Asset(assetid:ID!): [Assets]
    InstalledParts: [InstalledParts]
    Clients: [Clients]
    Parts: [Parts]
    Responses: [Responses]
    getServers: [GetServers]
    getVavs: [GetVavs]
    getValues: [GetVavs]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addAsset(asset_type: String!, asset_name: String!, possible_parts:String maintenance_month: String!): Assets
    addParts(possible_parts: String, part_number: String): Assets
    addPartToAsset(partId:ID!, assetId:ID!): Assets
    addResponse (questions: String!, response: String!, asset: String!): Responses
    getAllServers(response: String!): GetServers
    getTodaysVavs(response: String!): GetVavs
    removeAsset(assetid:ID!,asset_name: String!):Assets
    removeResponse(responseid: ID!): Responses


  }
`;

module.exports = typeDefs;
