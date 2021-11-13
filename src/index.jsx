import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageIndex from './pages';
import PageDream from './pages/[id]';
import './assets/styles.css';

ReactDOM.render(
  (
    <Router basename="/dreams">
      <Routes>
        <Route exact path="/" element={<PageIndex />} />
        <Route exact path="/:id" element={<PageDream />} />
        <Route path="*" element={<span>404 Not Found</span>} />
      </Routes>
    </Router>
  ),
  document.getElementById('root'),
);
