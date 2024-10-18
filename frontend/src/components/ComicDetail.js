import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import EditComicForm from './EditComicForm';  

function ComicDetail() {
  const [comic, setComic] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchComic = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comics/${id}`);
      setComic(response.data);
    } catch (error) {
      console.error('Error fetching comic:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchComic();
  }, [fetchComic]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/comics/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting comic:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (updatedComic) => {
    try {
      await axios.put(`http://localhost:5000/api/comics/${id}`, updatedComic);
      setComic(updatedComic);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating comic:', error);
    }
  };

  if (!comic) return <div>Loading...</div>;

  if (isEditing) {
    return <EditComicForm comic={comic} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div>
      <h1>{comic.bookName}</h1>
      <p>Author: {comic.authorName}</p>
      <p>Year: {comic.yearOfPublication}</p>
      <p>Price: ${comic.price}</p>
      <p>Discount: {comic.discount}%</p>
      <p>Pages: {comic.numberOfPages}</p>
      <p>Condition: {comic.condition}</p>
      <p>Description: {comic.description}</p>
      <button onClick={handleEdit}>Edit Comic</button>
      <button onClick={handleDelete}>Delete Comic</button>
    </div>
  );
}

export default ComicDetail;