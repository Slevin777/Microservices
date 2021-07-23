import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        email
        id
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation ($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;
