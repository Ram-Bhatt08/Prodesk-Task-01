import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ toggleTheme, darkMode, onSearch }) {
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();

  function debounce(func, wait) {
    let timeout;
    const debounced = (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
    debounced.cancel = () => clearTimeout(timeout);
    return debounced;
  }

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (onSearch) onSearch(query);
      setIsSearching(false);
    }, 400),
    [onSearch]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.trim()) {
      setIsSearching(false);
      onSearch('');
    } else {
      setIsSearching(true);
      debouncedSearch(value.trim());
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setIsSearching(false);
    if (onSearch) onSearch('');
    searchInputRef.current?.focus();
  };

  useEffect(() => {
    setSearchInput('');
    setIsSearching(false);
    onSearch('');
  }, [location.pathname]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <h1>🎬 React Movie App</h1>
          </Link>

          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <form onSubmit={(e) => e.preventDefault()} className="search-form">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search movies..."
                  value={searchInput}
                  onChange={handleInputChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`search-input ${darkMode ? 'dark-input' : ''}`}
                />
                {searchInput && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={clearSearch}
                  >
                    <FaTimes />
                  </button>
                )}
                {isSearching && <div className="search-spinner" />}
              </div>
            </form>
          </div>
        </div>

        <div className="nav-right">
          <button
            onClick={toggleTheme}
            className={`theme-toggle-btn ${darkMode ? 'dark-btn' : 'light-btn'}`}
          >
            {darkMode ? (
              <>
                <FaSun className="theme-icon" /> Light Mode
              </>
            ) : (
              <>
                <FaMoon className="theme-icon" /> Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

