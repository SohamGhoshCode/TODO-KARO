/**
 * Custom Stack implementation for Undo operations
 */
export default class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * Pushes a new item onto the stack
   * @param {any} item 
   */
  push(item) {
    this.items.push(item);
  }

  /**
   * Pops and returns the top item from the stack
   * @returns {any|null} The popped item, or null if the stack is empty
   */
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  /**
   * Returns the top item from the stack without removing it
   * @returns {any|null} The top item, or null if the stack is empty
   */
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  /**
   * Checks if the stack is empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Returns the size of the stack
   * @returns {number}
   */
  size() {
    return this.items.length;
  }

  /**
   * Clears all items from the stack
   */
  clear() {
    this.items = [];
  }

  /**
   * Converts the stack contents to an array (bottom to top)
   * Useful for UI serialization or debug
   * @returns {Array}
   */
  toArray() {
    return [...this.items];
  }

  /**
   * Recreates a Stack from an array
   * @param {Array} arr 
   * @returns {Stack}
   */
  static fromArray(arr) {
    const stack = new Stack();
    if (arr && Array.isArray(arr)) {
      stack.items = [...arr];
    }
    return stack;
  }
}
