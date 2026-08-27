const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;

const dummyBooks = [
  { id: '1', name: 'The Great Gatsby', genre: 'Classic' },
  { id: '2', name: '1984', genre: 'Dystopian' },
  { id: '3', name: 'To Kill a Mockingbird', genre: 'Fiction' },
  { id: '4', name: 'Brave New World', genre: 'Dystopian' },
  { id: '5', name: 'The Catcher in the Rye', genre: 'Fiction' },
  { id: '6', name: 'The Hobbit', genre: 'Fantasy' },
  { id: '7', name: 'The Lord of the Rings', genre: 'Fantasy' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    genre: {
      type: GraphQLString,
    }
  }
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
    book: {
      args: {
        id: { type: GraphQLString }
      },
      type: BookType,
      resolve(parent, args) {
        return dummyBooks.find(book => book.id === args.id) || null;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});