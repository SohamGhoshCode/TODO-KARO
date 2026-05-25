import React from 'react';
import TaskCard from './TaskCard';
import { FaSortAmountDown, FaSortAmountUp, FaInfoCircle } from 'react-icons/fa';

export default function TaskList({
  tasks,
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection,
  onToggleComplete,
  onEdit,
  onDelete,
  onRestore,
  isTrashView,
  onClearTrash
}) {
  const toggleDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="glass-card border border-borderPurple/20 rounded-2xl p-6 shadow-lg flex flex-col flex-1 min-h-[350px]">
      {/* Header controls */}
      <div className="flex items-center justify-between border-b border-gray-800/60 pb-4 mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {isTrashView ? 'Trash' : 'Task List'}
          </h3>
          {isTrashView && tasks.length > 0 && (
            <button
              onClick={onClearTrash}
              className="text-[10px] px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-colors font-bold uppercase tracking-wider"
            >
              Clear Trash
            </button>
          )}
        </div>

        {/* Sorting Dropdown & Toggle (not visible in trash view) */}
        {!isTrashView && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sort By:</span>
            <div className="flex items-center gap-1.5">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-3 py-1.5 rounded-xl glass-input text-xs font-semibold cursor-pointer bg-gray-900/40"
              >
                <option value="priority" className="bg-gray-950 text-white">Priority</option>
                <option value="dueDate" className="bg-gray-950 text-white">Due Date</option>
                <option value="alphabetical" className="bg-gray-950 text-white">Alphabetical</option>
              </select>

              <button
                onClick={toggleDirection}
                className="p-2 rounded-xl bg-gray-900/40 border border-gray-800 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all"
                title={sortDirection === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
              >
                {sortDirection === 'asc' ? (
                  <FaSortAmountUp className="text-[11px]" />
                ) : (
                  <FaSortAmountDown className="text-[11px]" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Task List Grid/Scroll Area */}
      <div className="flex-1 space-y-3">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
              onRestore={onRestore}
              isTrashView={isTrashView}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-850 rounded-2xl bg-gray-950/15">
            <FaInfoCircle className="text-gray-700 text-2xl mb-2.5" />
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">No tasks found</h4>
            <p className="text-[11px] text-gray-500 mt-1 max-w-[220px]">
              {isTrashView 
                ? 'The trash bin is currently empty.' 
                : 'Add a new task or try updating your active filters.'}
            </p>
          </div>
        )}
      </div>

      {/* DSA Legend Info Footer */}
      <div className="border-t border-gray-850 pt-4 mt-6 text-center">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 flex-wrap select-none">
          <span>Tasks are stored using <span className="text-indigo-400 normal-case font-extrabold">Linked List</span></span>
          <span>•</span>
          <span>Undo Delete powered by <span className="text-indigo-400 normal-case font-extrabold">Stack</span></span>
          <span>•</span>
          <span>Sorted using <span className="text-indigo-400 normal-case font-extrabold">Merge Sort</span></span>
          <span>•</span>
          <span>Search using <span className="text-indigo-400 normal-case font-extrabold">Binary Search</span></span>
        </p>
      </div>
    </div>
  );
}
