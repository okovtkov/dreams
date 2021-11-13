import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageIndex from './pages';
import PageDream from './pages/dream/[id]';
import './assets/styles.css';

ReactDOM.render(
  (
    <Router basename="/dreams">
      <Routes>
        <Route path="/" element={<PageIndex />} />
        <Route path="/dream/:id" element={<PageDream />} />
      </Routes>
    </Router>
  ),
  document.getElementById('root'),
);
