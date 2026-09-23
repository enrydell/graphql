import { useQuery } from "@apollo/client/react";
import { GET_AUTHORS } from "../queries/Queries";

function AddBook() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input type="text" name="name" />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" />
        </div>

        <div className="field">
          <label>Author:</label>
          <select name="authorId">
            {loading ? (
              <option>Loading authors...</option>
            ) : (
              data.authors.map((author: any) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>

        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default AddBook;