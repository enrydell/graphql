import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  {
    books {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

const GET_AUTHORS = gql`
  {
    authors {
      id
      name
    }
  }
`;

export {
  GET_BOOKS,
  GET_AUTHORS
};