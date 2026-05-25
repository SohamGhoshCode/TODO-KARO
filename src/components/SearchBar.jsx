import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
        <FaSearch className="text-sm" />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-sm font-medium"
      />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-indigo-400 transition-colors"
          title="Clear search"
        >
          <FaTimes className="text-xs" />
        </button>
      )}
    </div>
  );
}
