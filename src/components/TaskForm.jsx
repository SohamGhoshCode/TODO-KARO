import React, { useState, useEffect } from 'react';
import { FaPlus, FaSave, FaTimes } from 'react-icons/fa';

export default function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

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
    if (!title.trim()) { setError('Task title is required'); return; }
    if (!priority)     { setError('Please select a priority'); return; }
    onSubmit({ title: title.trim(), priority, dueDate: dueDate || null });
    resetForm();
  };

  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 mb-5 transition-all duration-200 ${
      editingTask ? 'border-amber-200 shadow-amber-50' : 'border-gray-100'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-1.5 h-5 rounded-full ${editingTask ? 'bg-amber-400' : 'bg-indigo-500'}`}></div>
        <h3 className="text-sm font-bold text-gray-700">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-end">
          {/* Title */}
          <div className="flex-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Task Title</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => { setTitle(e.target.value); if (error) setError(''); }}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          {/* Priority */}
          <div className="w-full md:w-44">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Priority</label>
            <select
              value={priority}
              onChange={(e) => { setPriority(e.target.value); if (error) setError(''); }}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm cursor-pointer"
            >
              <option value="" disabled>Select priority</option>
              <option value="high">🔴 High Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="low">🟢 Low Priority</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="w-full md:w-44">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm cursor-pointer"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 shrink-0">
            {editingTask && (
              <button
                type="button"
                onClick={() => { resetForm(); onCancelEdit(); }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-sm transition-all border border-gray-200"
              >
                <FaTimes className="text-xs" />
                <span>Cancel</span>
              </button>
            )}
            <button
              type="submit"
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white shadow-md transition-all active:scale-95 ${
                editingTask
                  ? 'bg-amber-500 hover:bg-amber-400 shadow-amber-100'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-100'
              }`}
            >
              {editingTask ? <><FaSave /><span>Update</span></> : <><FaPlus /><span>Add Task</span></>}
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-500 font-semibold">⚠ {error}</p>
        )}
      </form>
    </div>
  );
}
