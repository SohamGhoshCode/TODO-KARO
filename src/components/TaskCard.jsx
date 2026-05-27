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
  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':   return { badge: 'bg-red-50 text-red-600 border-red-200',     bar: 'bg-red-400' };
      case 'medium': return { badge: 'bg-amber-50 text-amber-600 border-amber-200', bar: 'bg-amber-400' };
      case 'low':    return { badge: 'bg-emerald-50 text-emerald-600 border-emerald-200', bar: 'bg-emerald-400' };
      default:       return { badge: 'bg-gray-50 text-gray-500 border-gray-200',   bar: 'bg-gray-300' };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No due date';
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const style = getPriorityStyle(task.priority);

  return (
    <div className={`bg-white rounded-xl border shadow-sm flex items-stretch gap-0 overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 animate-fade-in ${
      task.completed ? 'opacity-60' : ''
    } border-gray-100`}>
      {/* Left priority bar */}
      <div className={`w-1 shrink-0 ${style.bar}`}></div>

      {/* Card body */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-1 p-4 pl-4">
        {/* Left: Checkbox + details */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {!isTrashView ? (
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="custom-checkbox shrink-0"
              title={task.completed ? 'Mark incomplete' : 'Mark complete'}
            />
          ) : (
            <div className="w-5 h-5 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
              <FaTrashAlt className="text-gray-400 text-[9px]" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h4 className={`text-sm font-semibold text-gray-800 truncate ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${style.badge}`}>
                {task.priority}
              </span>
              {task.description && (
                <span className="text-[11px] text-gray-400 truncate max-w-xs font-medium">
                  · {task.description}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Date + Action buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t border-gray-50 sm:border-0 pt-3 sm:pt-0">
          {/* Due date */}
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
            <FaCalendarAlt className="text-[10px] text-gray-300" />
            <span>{formatDate(task.dueDate)}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {!isTrashView ? (
              <>
                {/* Complete toggle */}
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`p-2 rounded-lg transition-all border text-xs ${
                    task.completed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-500'
                      : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-500'
                  }`}
                  title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  <FaCheck className="text-[10px]" />
                </button>

                {/* Edit */}
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-500 transition-all text-xs"
                  title="Edit task"
                >
                  <FaEdit className="text-[10px]" />
                </button>
              </>
            ) : (
              /* Restore */
              <button
                onClick={() => onRestore(task.id)}
                className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-500 transition-all text-xs"
                title="Restore task"
              >
                <FaUndo className="text-[10px]" />
              </button>
            )}

            {/* Delete */}
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all text-xs"
              title={isTrashView ? 'Delete permanently' : 'Delete task'}
            >
              <FaTrashAlt className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
