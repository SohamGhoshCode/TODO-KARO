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
      default: return 'TODO KARO';
    }
  };

  return (
    <header className="w-full flex items-center justify-between gap-4 px-6 py-3.5 bg-white border-b border-indigo-50 shadow-sm z-10">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-500 md:hidden transition-all"
          title="Open Menu"
        >
          <FaBars className="text-base" />
        </button>
        <div>
          <h2 className="text-base font-bold text-gray-800 tracking-tight leading-none">
            {getTitle()}
          </h2>
          <p className="text-[10px] text-indigo-500 font-semibold tracking-widest uppercase mt-0.5">
            TODO KARO
          </p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-sm mx-auto hidden sm:block">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onToggleTheme}
          className="p-2.5 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-400 hover:text-indigo-500 transition-all border border-gray-100 hover:border-indigo-100"
          title={theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        >
          {theme === 'light'
            ? <FaSun className="text-sm text-amber-500" />
            : <FaMoon className="text-sm text-indigo-400" />}
        </button>

        <button
          onClick={onAddTaskClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-95"
        >
          <FaPlus className="text-[10px]" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
