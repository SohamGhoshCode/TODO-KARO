import React from 'react';
import { FaCalendarAlt, FaCheck, FaEdit, FaTrashAlt, FaUndo } from 'react-icons/fa';

export default function TaskCard({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete,
  onRestore, 
  isTrashView
}) {
  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className={`glass-card border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
      task.completed ? 'opacity-60' : ''
    } hover:border-indigo-500/20 animate-fade-in`}>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        {/* Custom status Checkbox */}
        {!isTrashView ? (
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="custom-checkbox shrink-0"
            title={task.completed ? "Mark incomplete" : "Mark complete"}
          />
        ) : (
          <div className="w-5 h-5 rounded-md border border-gray-800 bg-gray-900/50 flex items-center justify-center shrink-0">
            <FaTrashAlt className="text-gray-600 text-xs" />
          </div>
        )}

        {/* Task Details */}
        <div className="min-w-0 flex-1">
          <h4 className={`text-sm font-semibold text-white tracking-wide truncate ${
            task.completed ? 'line-through text-gray-500 font-medium' : ''
          }`}>
            {task.title}
          </h4>
          
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getPriorityBadge(task.priority)}`}>
              {task.priority}
            </span>
            {task.description && (
              <span className="text-[11px] text-gray-500 truncate max-w-xs sm:max-w-md font-medium">
                • {task.description}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Due Date & Action Toolbar */}
      <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 border-t border-gray-800/40 sm:border-0 pt-3 sm:pt-0">
        {/* Due Date Display */}
        <div className="flex items-center gap-2 text-gray-400 text-xs font-semibold">
          <FaCalendarAlt className="text-gray-500 text-xs" />
          <span>{formatDate(task.dueDate)}</span>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-1.5">
          {!isTrashView ? (
            <>
              {/* Checkmark Complete Button */}
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`p-2 rounded-xl transition-all border ${
                  task.completed 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-gray-900/40 border-gray-800 text-gray-500 hover:text-green-400 hover:border-green-500/25 hover:bg-green-500/5'
                }`}
                title={task.completed ? "Mark incomplete" : "Mark complete"}
              >
                <FaCheck className="text-[10px]" />
              </button>

              {/* Edit Pencil Button */}
              <button
                onClick={() => onEdit(task)}
                className="p-2 rounded-xl bg-gray-900/40 border border-gray-800 text-gray-500 hover:text-yellow-400 hover:border-yellow-500/25 hover:bg-yellow-500/5 transition-all"
                title="Edit task"
              >
                <FaEdit className="text-[10px]" />
              </button>
            </>
          ) : (
            // Restore LIFO Button
            <button
              onClick={() => onRestore(task.id)}
              className="p-2 rounded-xl bg-gray-900/40 border border-gray-800 text-gray-500 hover:text-indigo-400 hover:border-indigo-500/25 hover:bg-indigo-500/5 transition-all"
              title="Restore task"
            >
              <FaUndo className="text-[10px]" />
            </button>
          )}

          {/* Delete Trash Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 rounded-xl bg-gray-900/40 border border-gray-800 text-gray-500 hover:text-red-400 hover:border-red-500/25 hover:bg-red-500/5 transition-all"
            title={isTrashView ? "Delete permanently" : "Delete task"}
          >
            <FaTrashAlt className="text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
