import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_SERVERS = gql`
query getServers ($path:String!) {
  getServers(path: $path) {
    Id
  }
}
`;

export const QUERY_VAVS = gql`
query getVavs ($path:String!) {
  getVavs(path: $path) {
    name
    value
    setpoint
    damper
  }
}
`;

