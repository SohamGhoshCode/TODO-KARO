import React from 'react';
import { FaMoon, FaSun, FaPlus, FaBars } from 'react-icons/fa';
import SearchBar from './SearchBar';

export default function Navbar({ 
  selectedFilter, 
  searchQuery, 
  setSearchQuery, 
  onAddTaskClick, 
  onMenuToggle,
  theme,
  onToggleTheme
}) {
  const getTitle = () => {
    switch (selectedFilter) {
      case 'all': return 'All Tasks';
      case 'pending': return 'Pending Tasks';
      case 'completed': return 'Completed Tasks';
      case 'high': return 'High Priority Tasks';
      case 'medium': return 'Medium Priority Tasks';
      case 'low': return 'Low Priority Tasks';
      case 'trash': return 'Trash Bin';
      default: return 'Smart Todo Manager';
    }
  };

  return (
    <header className="w-full flex items-center justify-between gap-4 px-6 py-4 glass-panel border-b border-borderPurple/45 z-10">
      {/* Title & Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-gray-800/60 text-gray-400 hover:text-gray-200 md:hidden transition-colors"
          title="Toggle Menu"
        >
          <FaBars className="text-lg" />
        </button>
        <h2 className="text-xl font-bold text-white tracking-wide">
          {getTitle()}
        </h2>
      </div>

      {/* Search Input Box */}
      <div className="flex-1 max-w-md mx-auto hidden sm:block">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Theme visual placeholder */}
        <button 
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-gray-900/40 hover:bg-gray-800/60 text-gray-400 hover:text-indigo-400 transition-all duration-200 border border-gray-800 flex items-center justify-center"
          title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === 'light' ? <FaSun className="text-base text-yellow-500" /> : <FaMoon className="text-base" />}
        </button>

        {/* Add Task Button */}
        <button 
          onClick={onAddTaskClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-500/25 transition-all duration-200 transform active:scale-95"
        >
          <FaPlus className="text-xs" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
