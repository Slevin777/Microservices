import { gql } from "@apollo/client";

export const GET_SESSION = gql`
  {
    userSession(me: true) {
      id
      user {
        id
        email
      }
    }
  }
`;

export const GET_LISTINGS = gql`
  {
    listings {
      id
      title
      description
    }
  }
`;
