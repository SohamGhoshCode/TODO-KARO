import React from 'react';
import { 
  FaTasks, 
  FaClock, 
  FaCheckCircle, 
  FaFlag, 
  FaTrashAlt, 
  FaCode 
} from 'react-icons/fa';

export default function Sidebar({ 
  selectedFilter, 
  setSelectedFilter, 
  counts,
  className = "hidden md:flex"
}) {
  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: FaTasks, count: counts.all, color: 'text-indigo-400' },
    { id: 'pending', label: 'Pending', icon: FaClock, count: counts.pending, color: 'text-yellow-400' },
    { id: 'completed', label: 'Completed', icon: FaCheckCircle, count: counts.completed, color: 'text-green-400' },
    { id: 'high', label: 'High Priority', icon: FaFlag, count: counts.high, color: 'text-red-500' },
    { id: 'medium', label: 'Medium Priority', icon: FaFlag, count: counts.medium, color: 'text-yellow-500' },
    { id: 'low', label: 'Low Priority', icon: FaFlag, count: counts.low, color: 'text-green-500' },
    { id: 'trash', label: 'Trash', icon: FaTrashAlt, count: counts.trash, color: 'text-gray-400' },
  ];

  return (
    <aside className={`w-80 glass-panel border-r border-borderPurple flex flex-col h-screen sticky top-0 p-6 select-none shrink-0 ${className}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <FaTasks className="text-white text-lg" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white leading-none">Smart Todo</h1>
          <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Manager</span>
        </div>
      </div>

      {/* Menu List */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedFilter(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 border border-indigo-500/30 text-white shadow-inner' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Icon className={`text-lg transition-transform group-hover:scale-110 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-400'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                isActive 
                  ? 'bg-indigo-600/30 border-indigo-500/40 text-white' 
                  : 'bg-gray-800/60 border-gray-700/50 text-gray-400'
              }`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* DSA Badge info box */}
      <div className="mt-auto glass-card border border-borderPurple/80 rounded-2xl p-4.5 bg-gradient-to-b from-indigo-950/20 to-purple-950/20 shadow-xl">
        <div className="flex items-center gap-2.5 mb-2.5 text-indigo-400 font-bold text-xs uppercase tracking-widest">
          <FaCode className="text-sm animate-pulse" />
          <span>DSA Powered</span>
        </div>
        <p className="text-[11px] leading-relaxed text-gray-400 font-medium">
          Academic demonstration utilizing Node-based <strong className="text-indigo-300">Linked List</strong> for storage, <strong className="text-indigo-300">Stack</strong> for Undo/LIFO history, <strong className="text-indigo-300">Merge Sort</strong>, and <strong className="text-indigo-300">Binary Search</strong>.
        </p>
      </div>
    </aside>
  );
}
