import React, { useState, useEffect, useRef, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCards from '../components/DashboardCards';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import SearchBar from '../components/SearchBar';
import LinkedList from '../dataStructures/LinkedList';
import Stack from '../dataStructures/Stack';
import { mergeSort } from '../algorithms/mergeSort';
import { binarySearch } from '../algorithms/binarySearch';
import { loadTasks, saveTasks, loadTrash, saveTrash } from '../utils/localStorage';
import { FaUndo, FaTimes, FaCode } from 'react-icons/fa';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [trashTasks, setTrashTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('priority');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingTask, setEditingTask] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stack ref for deleted tasks (persisting LIFO state across re-renders)
  const undoStackRef = useRef(new Stack());
  const [undoSize, setUndoSize] = useState(0);

  // Synchronize tasks and trash from LocalStorage on mount
  useEffect(() => {
    setTasks(loadTasks());
    setTrashTasks(loadTrash());
  }, []);

  // Sync theme changes with document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Compute tasks numbers for widgets
  const counts = useMemo(() => {
    return {
      all: tasks.length,
      pending: tasks.filter(t => !t.completed).length,
      completed: tasks.filter(t => t.completed).length,
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
      trash: trashTasks.length,
    };
  }, [tasks, trashTasks]);

  // Handle task addition and task editing updates
  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      // Modify editing task
      const updatedTasks = tasks.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...taskData }
          : t
      );
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setEditingTask(null);
    } else {
      // Add a brand-new task using LinkedList
      const newTask = {
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString()
      };

      const list = LinkedList.fromArray(tasks);
      list.addTask(newTask);
      
      const updatedTasks = list.getAllTasks();
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  // Toggle checkbox status
  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Edit action
  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Delete task using Linked List, pushes to LIFO Stack, saves to Trash array
  const handleDelete = (id) => {
    if (selectedFilter === 'trash') {
      // Permanent delete from trash
      const updatedTrash = trashTasks.filter(t => t.id !== id);
      setTrashTasks(updatedTrash);
      saveTrash(updatedTrash);
      return;
    }

    const list = LinkedList.fromArray(tasks);
    const deletedTask = list.deleteTask(id);

    if (deletedTask) {
      // Push onto LIFO Undo Stack
      undoStackRef.current.push(deletedTask);
      setUndoSize(undoStackRef.current.size());

      // Save updated active list
      const updatedTasks = list.getAllTasks();
      setTasks(updatedTasks);
      saveTasks(updatedTasks);

      // Save updated trash list
      const updatedTrash = [deletedTask, ...trashTasks];
      setTrashTasks(updatedTrash);
      saveTrash(updatedTrash);
    }
  };

  // Restore action in trash page
  const handleRestore = (id) => {
    const restored = trashTasks.find(t => t.id === id);
    if (restored) {
      // Remove from trash list
      const updatedTrash = trashTasks.filter(t => t.id !== id);
      setTrashTasks(updatedTrash);
      saveTrash(updatedTrash);

      // Append back to active tasks using LinkedList
      const list = LinkedList.fromArray(tasks);
      list.addTask(restored);
      
      const updatedTasks = list.getAllTasks();
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  // Undo delete (LIFO popping)
  const handleUndoDelete = () => {
    const restored = undoStackRef.current.pop();
    setUndoSize(undoStackRef.current.size());

    if (restored) {
      // Add back to active tasks
      const list = LinkedList.fromArray(tasks);
      list.addTask(restored);
      
      const updatedTasks = list.getAllTasks();
      setTasks(updatedTasks);
      saveTasks(updatedTasks);

      // Remove from trash list
      const updatedTrash = trashTasks.filter(t => t.id !== restored.id);
      setTrashTasks(updatedTrash);
      saveTrash(updatedTrash);
    }
  };

  // Clear all items in trash
  const handleClearTrash = () => {
    setTrashTasks([]);
    saveTrash([]);
  };

  // Clear LIFO undo history
  const handleClearUndoStack = () => {
    undoStackRef.current.clear();
    setUndoSize(0);
  };

  // Process data flows through filtering, searching, and sorting
  const processedTasks = useMemo(() => {
    // 1. Filter by category
    let list = [];
    if (selectedFilter === 'trash') {
      list = trashTasks;
    } else {
      list = tasks;
      if (selectedFilter === 'pending') {
        list = tasks.filter(t => !t.completed);
      } else if (selectedFilter === 'completed') {
        list = tasks.filter(t => t.completed);
      } else if (selectedFilter === 'high') {
        list = tasks.filter(t => t.priority === 'high');
      } else if (selectedFilter === 'medium') {
        list = tasks.filter(t => t.priority === 'medium');
      } else if (selectedFilter === 'low') {
        list = tasks.filter(t => t.priority === 'low');
      }
    }

    // 2. Binary Search (requires alphabetical pre-sorting)
    if (searchQuery.trim() !== '') {
      const alphabeticallySorted = mergeSort(list, 'alphabetical', 'asc');
      list = binarySearch(alphabeticallySorted, searchQuery);
    }

    // 3. Merge Sort
    if (selectedFilter !== 'trash') {
      list = mergeSort(list, sortOption, sortDirection);
    }

    return list;
  }, [tasks, trashTasks, selectedFilter, searchQuery, sortOption, sortDirection]);

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-800">
      {/* Desktop Sidebar (Left Panel) */}
      <Sidebar 
        selectedFilter={selectedFilter} 
        setSelectedFilter={setSelectedFilter} 
        counts={counts}
      />

      {/* Mobile Drawer (Responsive slideover) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-80 h-full bg-white border-r border-gray-100 p-6 animate-fade-in shadow-2xl">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-indigo-600 transition-colors"
              title="Close Menu"
            >
              <FaTimes className="text-base" />
            </button>
            
            <Sidebar 
              selectedFilter={selectedFilter} 
              setSelectedFilter={(filterId) => {
                setSelectedFilter(filterId);
                setMobileMenuOpen(false);
              }} 
              counts={counts}
              className="flex h-full w-full"
            />
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          selectedFilter={selectedFilter} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddTaskClick={() => {
            setEditingTask(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMenuToggle={() => setMobileMenuOpen(prev => !prev)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <main className="flex-1 p-5 md:p-7 max-w-6xl w-full mx-auto space-y-5">
          
          {/* LIFO Undo toast banner */}
          {undoSize > 0 && (
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-sm animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FaUndo className="text-xs" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-indigo-900">
                    Task deleted successfully.
                  </p>
                  <p className="text-[9px] text-indigo-500 font-bold uppercase tracking-widest mt-0.5">
                    Undo stack size: <span className="text-indigo-700 font-extrabold">{undoSize}</span> task{undoSize > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndoDelete}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-lg shadow-md transition-colors flex items-center gap-1.5"
                >
                  <FaUndo className="text-[9px]" />
                  <span>Undo</span>
                </button>
                <button
                  onClick={handleClearUndoStack}
                  className="p-1.5 text-indigo-400 hover:text-indigo-600 transition-colors"
                  title="Clear undo memory"
                >
                  <FaTimes className="text-[10px]" />
                </button>
              </div>
            </div>
          )}

          {/* Search bar helper for screens under SM */}
          <div className="sm:hidden w-full">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>

          {/* Counters Card Block */}
          <DashboardCards counts={counts} />

          {/* Inline Entry Task Form */}
          {selectedFilter !== 'trash' && (
            <TaskForm 
              onSubmit={handleFormSubmit}
              editingTask={editingTask}
              onCancelEdit={handleCancelEdit}
            />
          )}

          {/* List of elements */}
          <TaskList
            tasks={processedTasks}
            sortOption={sortOption}
            setSortOption={setSortOption}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRestore={handleRestore}
            isTrashView={selectedFilter === 'trash'}
            onClearTrash={handleClearTrash}
          />
        </main>
      </div>
    </div>
  );
}
