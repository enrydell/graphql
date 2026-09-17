const graphql = require('graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const Author = require('../models/author');
const Book = require('../models/book');

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
        return Author.findById(authorId);
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
        return Book.find({ authorId: author.id });
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
        return Book.find();
      }
    },
    book: {
      args: {
        id: { type: GraphQLID }
      },
      type: BookType,
      resolve(_, args) {
        return Book.findById(args.id);
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.find();
      }
    },
    author: {
      args: {
        id: { type: GraphQLID }
      },
      type: AuthorType,
      resolve(_, args) {
        return Author.findById(args.id);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(_, args) {
        const author = new Author({
          name: args.name,
          age: args.age
        });

        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(_, args) {
        const author = await Author.findOne({ name: args.author });

        if (!author) {
          throw new Error(`Author with name "${args.author}" not found.`);
        }

        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: author.id
        });

        return await book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

// mutation {
//   addAuthor(name: "C.S. Lewis", age: 55) {
//     id
//   }
//   addAuthor(name: "J.K. Rowling", age: 55) {
//     id
//     name
//     age
//   }
//   addBook(name: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy", author: "J.K. Rowling") {
//     id
//     name
//     genre
//     author {
//       id
//       name
//       age
//     }
//   }
//   addAuthor(name: "George R.R. Martin", age: 72) {
//     id
//     name
//     age
//   }
//   addBook(name: "A Game of Thrones", genre: "Fantasy", author: "George R.R. Martin") {
//     id
//     name
//     genre
//     author {
//       id
//       name
//       age
//     }
//   }
// }