/**
 * Node class representing an element in the Linked List
 */
class Node {
  constructor(task) {
    this.task = task;
    this.next = null;
  }
}

/**
 * Custom LinkedList implementation for Task storage
 */
export default class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * Adds a new task to the end of the linked list
   * @param {Object} task 
   */
  addTask(task) {
    const newNode = new Node(task);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  /**
   * Deletes a task by ID
   * @param {string|number} id 
   * @returns {Object|null} The deleted task if found, else null
   */
  deleteTask(id) {
    if (!this.head) return null;

    if (this.head.task.id === id) {
      const deletedTask = this.head.task;
      this.head = this.head.next;
      return deletedTask;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.task.id === id) {
        const deletedTask = current.next.task;
        current.next = current.next.next;
        return deletedTask;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * Performs a linear search for a task by title
   * @param {string} title 
   * @returns {Object|null} The matching task if found, else null
   */
  searchTask(title) {
    if (!title) return null;
    let current = this.head;
    const query = title.toLowerCase();
    while (current) {
      if (current.task.title.toLowerCase().includes(query)) {
        return current.task;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * Traverses the linked list and returns all tasks as an array
   * @returns {Array} List of all tasks
   */
  getAllTasks() {
    const tasks = [];
    let current = this.head;
    while (current) {
      tasks.push(current.task);
      current = current.next;
    }
    return tasks;
  }

  /**
   * Static helper to construct a LinkedList from a standard JavaScript array
   * @param {Array} arr 
   * @returns {LinkedList}
   */
  static fromArray(arr) {
    const list = new LinkedList();
    if (arr && Array.isArray(arr)) {
      for (const task of arr) {
        list.addTask(task);
      }
    }
    return list;
  }
}
