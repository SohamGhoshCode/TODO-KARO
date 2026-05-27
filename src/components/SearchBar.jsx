import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full">
      <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200 ${isFocused ? 'text-indigo-500' : 'text-gray-400'}`}>
        <FaSearch className="text-xs" />
      </div>
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-9 pr-9 py-2.5 rounded-xl glass-input text-sm font-medium bg-gray-50"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-indigo-500 transition-colors"
          title="Clear search"
        >
          <FaTimes className="text-xs" />
        </button>
      )}
    </div>
  );
}
