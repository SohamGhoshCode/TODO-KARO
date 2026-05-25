import React, { useState, useEffect } from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Handle editing mode task changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || '');
      setError('');
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setPriority('');
    setDueDate('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    if (!priority) {
      setError('Please select a priority');
      return;
    }

    onSubmit({
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
    });

    resetForm();
  };

  return (
    <div className="glass-card border border-borderPurple/30 rounded-2xl p-5 mb-6 shadow-md transition-all duration-300">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
          {/* Title Field */}
          <div className="flex-1">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-medium"
            />
          </div>

          {/* Priority Select */}
          <div className="w-full md:w-52">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-medium cursor-pointer"
            >
              <option value="" disabled className="bg-gray-900 text-gray-500">Select Priority</option>
              <option value="high" className="bg-gray-900 text-white">High Priority</option>
              <option value="medium" className="bg-gray-900 text-white">Medium Priority</option>
              <option value="low" className="bg-gray-900 text-white">Low Priority</option>
            </select>
          </div>

          {/* Due Date Picker */}
          <div className="w-full md:w-52">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm font-medium cursor-pointer"
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex gap-2.5 shrink-0">
            {editingTask && (
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onCancelEdit();
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm rounded-xl transition-colors border border-gray-700"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            )}
            
            <button
              type="submit"
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-500/25 transition-all duration-200 transform active:scale-95"
            >
              {editingTask ? (
                <>
                  <FaSave />
                  <span>Update Task</span>
                </>
              ) : (
                <>
                  <FaPlus />
                  <span>Add Task</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Validation Error Message */}
        {error && (
          <p className="text-xs text-red-500 font-semibold animate-shake">
            * {error}
          </p>
        )}
      </form>
    </div>
  );
}
