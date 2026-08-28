const graphql = require('graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const dummyBooks = [
  { id: '1', name: 'The Great Gatsby', genre: 'Classic', authorId: '3' },
  { id: '2', name: '1984', genre: 'Dystopian', authorId: '1' },
  { id: '3', name: 'To Kill a Mockingbird', genre: 'Fiction', authorId: '2' },
  { id: '4', name: 'Brave New World', genre: 'Dystopian', authorId: '1' },
  { id: '5', name: 'The Catcher in the Rye', genre: 'Fiction', authorId: '2' },
  { id: '6', name: 'The Hobbit', genre: 'Fantasy', authorId: '3' },
  { id: '7', name: 'The Lord of the Rings', genre: 'Fantasy', authorId: '3' },
];

const dummyAuthors = [
  { id: '1', name: 'George Orwell', age: 46 },
  { id: '2', name: 'Harper Lee', age: 28 },
  { id: '3', name: 'J.R.R. Tolkien', age: 56 }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    },
    author: {
      type: AuthorType,
      resolve(book) {
        const authorId = book.authorId;
        return dummyAuthors.find(author => author.id === authorId) || null;
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(author) {
        return dummyBooks.filter(book => book.authorId === author.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'Hello, World!';
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return dummyBooks;
      }
    },
    book: {
      args: {
        id: { type: GraphQLID }
      },
      type: BookType,
      resolve(_, args) {
        return dummyBooks.find(book => book.id === args.id) || null;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return dummyAuthors;
      }
    },
    author: {
      args: {
        id: { type: GraphQLID }
      },
      type: AuthorType,
      resolve(_, args) {
        return dummyAuthors.find(author => author.id === args.id) || null;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});