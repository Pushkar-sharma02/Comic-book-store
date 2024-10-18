import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ComicList() {
  const [comics, setComics] = useState([]);
  const [filters, setFilters] = useState({
    bookName: '',
    authorName: '',
    yearOfPublication: '',
    price: '',
    condition: ''
  });
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchComics = useCallback(async () => {
    try {
      let url = `http://localhost:5000/api/comics?page=${currentPage}`;
      
      // Add filters to URL
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          url += `&${key}=${filters[key]}`;
        }
      });

      // Add sort to URL
      if (sort) {
        url += `&sort=${sort}`;
      }

      const response = await axios.get(url);
      setComics(response.data.comics);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching comics:', error);
    }
  }, [filters, sort, currentPage]);

  useEffect(() => {
    fetchComics();
  }, [fetchComics]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Comic Books</h1>
      
      {/* Filter inputs */}
      <div>
        <input
          type="text"
          name="bookName"
          placeholder="Filter by Book Name"
          value={filters.bookName}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="authorName"
          placeholder="Filter by Author Name"
          value={filters.authorName}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="yearOfPublication"
          placeholder="Filter by Year"
          value={filters.yearOfPublication}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Filter by Max Price"
          value={filters.price}
          onChange={handleFilterChange}
        />
        <select
          name="condition"
          value={filters.condition}
          onChange={handleFilterChange}
        >
          <option value="">All Conditions</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>

      {/* Sort selector */}
      <div>
        <select value={sort} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="yearOfPublication">Year</option>
          <option value="bookName">Book Name</option>
        </select>
      </div>

      {/* Comic list */}
      <ul>
        {comics.map(comic => (
          <li key={comic._id}>
            <Link to={`/comic/${comic._id}`}>
              {comic.bookName} by {comic.authorName} - ${comic.price}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ComicList;