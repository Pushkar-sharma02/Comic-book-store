import React, { useState } from 'react';

function EditComicForm({ comic, onUpdate, onCancel }) {
  const [editedComic, setEditedComic] = useState(comic);

  const handleChange = (e) => {
    setEditedComic({ ...editedComic, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedComic);
  };

  return (
    <div>
      <h2>Edit Comic</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bookName"
          value={editedComic.bookName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="authorName"
          value={editedComic.authorName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="yearOfPublication"
          value={editedComic.yearOfPublication}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          value={editedComic.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discount"
          value={editedComic.discount}
          onChange={handleChange}
        />
        <input
          type="number"
          name="numberOfPages"
          value={editedComic.numberOfPages}
          onChange={handleChange}
          required
        />
        <select
          name="condition"
          value={editedComic.condition}
          onChange={handleChange}
        >
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <textarea
          name="description"
          value={editedComic.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Update Comic</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditComicForm;