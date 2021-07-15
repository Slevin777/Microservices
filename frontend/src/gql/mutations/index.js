import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation LoginUser($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        email
        id
      }
    }
  }
`;
