export const LOCAL_STORAGE_KEYS = {
  TASKS: 'smart_todo_tasks',
  TRASH: 'smart_todo_trash',
};

/**
 * Loads tasks list from LocalStorage.
 * Returns demo tasks if no tasks exist yet.
 * @returns {Array} List of tasks
 */
export function loadTasks() {
  try {
    const serialized = localStorage.getItem(LOCAL_STORAGE_KEYS.TASKS);
    if (serialized === null) {
      return getDemoTasks();
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error("Failed to load tasks from localStorage:", err);
    return getDemoTasks();
  }
}

/**
 * Saves tasks list to LocalStorage.
 * @param {Array} tasks 
 */
export function saveTasks(tasks) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (err) {
    console.error("Failed to save tasks to localStorage:", err);
  }
}

/**
 * Loads trash list from LocalStorage.
 * @returns {Array} List of deleted tasks
 */
export function loadTrash() {
  try {
    const serialized = localStorage.getItem(LOCAL_STORAGE_KEYS.TRASH);
    if (serialized === null) {
      return [];
    }
    return JSON.parse(serialized);
  } catch (err) {
    console.error("Failed to load trash from localStorage:", err);
    return [];
  }
}

/**
 * Saves trash list to LocalStorage.
 * @param {Array} trashTasks 
 */
export function saveTrash(trashTasks) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TRASH, JSON.stringify(trashTasks));
  } catch (err) {
    console.error("Failed to save trash to localStorage:", err);
  }
}

/**
 * Initial mock data matching user's design reference
 * @returns {Array} Demo tasks
 */
function getDemoTasks() {
  return [
    {
      id: 'task-1',
      title: 'Complete DSA Assignment',
      priority: 'high',
      dueDate: '2026-05-25',
      completed: false,
      createdAt: new Date('2026-05-24T10:00:00Z').toISOString(),
    },
    {
      id: 'task-2',
      title: 'React Project Setup',
      priority: 'medium',
      dueDate: '2026-05-26',
      completed: false,
      createdAt: new Date('2026-05-25T09:00:00Z').toISOString(),
    },
    {
      id: 'task-3',
      title: 'Study Merge Sort',
      priority: 'low',
      dueDate: '2026-05-28',
      completed: false,
      createdAt: new Date('2026-05-25T11:00:00Z').toISOString(),
    },
    {
      id: 'task-4',
      title: 'Learn Binary Search',
      priority: 'low',
      dueDate: '2026-05-20',
      completed: true,
      createdAt: new Date('2026-05-18T08:00:00Z').toISOString(),
    }
  ];
}
