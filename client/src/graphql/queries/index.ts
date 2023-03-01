import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_CLIENTS, GET_PROJECTS };
