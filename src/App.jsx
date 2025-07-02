import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Movies from './Components/Movies/Movies';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleTheme = () => setDarkMode(!darkMode);
  const handleSearch = (term) => setSearchTerm(term);

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Navbar 
          toggleTheme={toggleTheme} 
          darkMode={darkMode} 
          onSearch={handleSearch}
        />
        <Routes>
          <Route path="/" element={<Movies searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
