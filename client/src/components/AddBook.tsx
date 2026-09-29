import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_AUTHORS,
  type Author,
  ADD_BOOK,
  GET_BOOKS
} from "../queries/Queries";
import React, { useState } from "react";

interface BookFormData {
  name: string;
  genre: string;
  authorId: string;
}

function AddBook() {
  const [formData, setFormData] = useState<BookFormData>({
    name: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(GET_AUTHORS);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.genre || !formData.authorId) {
      return;
    }

    console.log("Submitting form data:", formData);
    addBook({
      variables: { ...formData },
    });

    setFormData({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select name="authorId" value={formData.authorId} onChange={handleChange}>
            <option value="">Select author</option>
            {loading ? (
              <option>Loading authors...</option>
            ) : (
              data?.authors.map((author: Author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>

        <button type="submit">
          +
        </button>
      </form>
    </div>
  );
}

export default AddBook;