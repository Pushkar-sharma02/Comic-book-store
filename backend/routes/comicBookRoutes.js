const express = require('express');
const router = express.Router();
const ComicBook = require('../models/ComicBook');

// Create a new comic book
router.post('/', async (req, res) => {
  try {
    const comicBook = new ComicBook(req.body);
    await comicBook.save();
    res.status(201).json(comicBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all comic books with pagination, filtering, and sorting
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort, ...filters } = req.query;
    const query = {};

    // Apply filters
    Object.keys(filters).forEach(key => {
      if (key === 'yearOfPublication' || key === 'price') {
        query[key] = Number(filters[key]);
      } else {
        query[key] = new RegExp(filters[key], 'i');
      }
    });

    const sortOptions = sort ? { [sort]: 1 } : {};

    const comics = await ComicBook.find(query)
      .sort(sortOptions)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await ComicBook.countDocuments(query);

    res.json({
      comics,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific comic book by ID
router.get('/:id', async (req, res) => {
  try {
    const comicBook = await ComicBook.findById(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ message: 'Comic book not found' });
    }
    res.json(comicBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a comic book
router.put('/:id', async (req, res) => {
  try {
    const comicBook = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comicBook) {
      return res.status(404).json({ message: 'Comic book not found' });
    }
    res.json(comicBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a comic book
router.delete('/:id', async (req, res) => {
  try {
    const comicBook = await ComicBook.findByIdAndDelete(req.params.id);
    if (!comicBook) {
      return res.status(404).json({ message: 'Comic book not found' });
    }
    res.json({ message: 'Comic book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;