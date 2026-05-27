import React from 'react';
import { 
  FaTasks, 
  FaClock, 
  FaCheckCircle, 
  FaFlag, 
  FaTrashAlt, 
  FaCode,
  FaCheckDouble
} from 'react-icons/fa';

export default function Sidebar({ 
  selectedFilter, 
  setSelectedFilter, 
  counts,
  className = "hidden md:flex"
}) {
  const menuItems = [
    { id: 'all',       label: 'All Tasks',       icon: FaTasks,       count: counts.all,       activeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',       dot: 'bg-indigo-500' },
    { id: 'pending',   label: 'Pending',          icon: FaClock,       count: counts.pending,   activeColor: 'text-amber-600 bg-amber-50 border-amber-200',           dot: 'bg-amber-500' },
    { id: 'completed', label: 'Completed',        icon: FaCheckCircle, count: counts.completed, activeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',     dot: 'bg-emerald-500' },
    { id: 'high',      label: 'High Priority',    icon: FaFlag,        count: counts.high,      activeColor: 'text-red-600 bg-red-50 border-red-200',                 dot: 'bg-red-500' },
    { id: 'medium',    label: 'Medium Priority',  icon: FaFlag,        count: counts.medium,    activeColor: 'text-orange-600 bg-orange-50 border-orange-200',        dot: 'bg-orange-400' },
    { id: 'low',       label: 'Low Priority',     icon: FaFlag,        count: counts.low,       activeColor: 'text-green-600 bg-green-50 border-green-200',           dot: 'bg-green-500' },
    { id: 'trash',     label: 'Trash',            icon: FaTrashAlt,    count: counts.trash,     activeColor: 'text-gray-600 bg-gray-100 border-gray-300',             dot: 'bg-gray-400' },
  ];

  return (
    <aside className={`w-72 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 p-5 select-none shrink-0 shadow-sm ${className}`}>
      
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-100 transition-transform duration-300 hover:rotate-12">
          <FaCheckDouble className="text-white text-base" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 leading-none">TODO KARO</h1>
          <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest">Premium Workspace</span>
        </div>
      </div>

      {/* Section label */}
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Views</p>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedFilter === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedFilter(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group border ${
                isActive
                  ? item.activeColor + ' font-semibold shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-transparent hover:border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`text-sm transition-all ${isActive ? '' : 'group-hover:scale-105'}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className={`text-[10px] min-w-[22px] text-center py-0.5 px-1.5 rounded-full font-bold ${
                isActive ? 'bg-white/70 text-current' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
              }`}>
                {item.count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* DSA Info Box */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-md bg-indigo-100 flex items-center justify-center">
            <FaCode className="text-[9px] text-indigo-500" />
          </div>
          <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-widest">DSA Powered</span>
        </div>
        <p className="text-[10.5px] leading-relaxed text-indigo-500 font-medium">
          Built with <strong className="text-indigo-700">Linked List</strong>, <strong className="text-indigo-700">Stack</strong> undo, <strong className="text-indigo-700">Merge Sort</strong>, and <strong className="text-indigo-700">Binary Search</strong>.
        </p>
      </div>
    </aside>
  );
}
