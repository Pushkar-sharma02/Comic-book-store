import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ComicList from './components/ComicList';
import ComicForm from './components/ComicForm';
import ComicDetail from './components/ComicDetail';
import './App.css'
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Comic Books</Link>
            </li>
            <li>
              <Link to="/add">Add Comic Book</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ComicList />} />
          <Route path="/add" element={<ComicForm />} />
          <Route path="/comic/:id" element={<ComicDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App