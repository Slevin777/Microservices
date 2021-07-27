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

export const SIGN_UP = gql`
  mutation ($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

export const LOGOUT = gql`
  mutation ($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

//Listings

export const ADD_LISTING = gql`
  mutation ($title: String!, $description: String!) {
    createListing(title: $title, description: $description) {
      id
    }
  }
`;
