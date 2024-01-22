import gql from 'graphql-tag';

// GraphQL queries and mutations

export const getUsersQuery = gql`
  query {
    getUsers {
      id
      username
      displayName
    }
  }
`;

export const createUserMutation = gql`
  mutation {
    createUser(
      createUserData: { username: "testUser", displayName: "Test User" }
    ) {
      id
      username
      displayName
    }
  }
`;
