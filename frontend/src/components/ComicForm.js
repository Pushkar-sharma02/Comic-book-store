import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ComicForm() {
  const [comic, setComic] = useState({
    bookName: '',
    authorName: '',
    yearOfPublication: '',
    price: '',
    discount:'',
    numberOfPages: '',
    condition: 'new',
    description: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setComic({ ...comic, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/comics', comic);
      navigate('/');
    } catch (error) {
      console.error('Error adding comic:', error);
    }
  };

  return (
    <div>
      <h1>Add Comic Book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="bookName" placeholder="Book Name" onChange={handleChange} required />
        <input type="text" name="authorName" placeholder="Author Name" onChange={handleChange} required />
        <input type="number" name="yearOfPublication" placeholder="Year of Publication" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="number" name="discount" placeholder="Discount" onChange={handleChange}/>
        <input type="number" name="numberOfPages" placeholder="Number of Pages" onChange={handleChange} required />
        <select name="condition" onChange={handleChange}>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <button type="submit">Add Comic</button>
      </form>
    </div>
  );
}

export default ComicForm;