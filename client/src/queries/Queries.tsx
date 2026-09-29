import { gql, type TypedDocumentNode } from "@apollo/client";

// --- Types ---
export interface Author {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  name: string;
  genre: string;
  author: Author;
}

export interface BooksData {
  books: Book[];
}

export interface AuthorsData {
  authors: Author[];
}

// --- GraphQL Documents ---
export const GET_BOOKS: TypedDocumentNode<BooksData> = gql`
  query GetBooks {
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

export const GET_AUTHORS: TypedDocumentNode<AuthorsData> = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

// --- Types for ADD_BOOK ---
export interface AddBookData {
  addBook: {
    id: string;
    name: string;
  };
}

export interface AddBookVariables {
  name: string;
  genre: string;
  authorId: string;
}

export const ADD_BOOK: TypedDocumentNode<AddBookData, AddBookVariables> = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;