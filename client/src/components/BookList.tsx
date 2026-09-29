import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from "../queries/Queries";

interface Book {
  id: string;
  name: string;
  genre: string;
  author: Author;
}

interface Author {
  name: string;
}

interface BooksData {
  books: Book[];
}

function BookList() {
  const { loading, error, data } = useQuery<BooksData>(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul id="book-list">
        {data?.books.map((book: Book) => (
          <li key={book.id}>
            <h3>{book.name}</h3>
            <p>Genre: {book.genre}</p>
            <p>Author: {book.author.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;