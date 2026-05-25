/**
 * Custom Merge Sort implementation for sorting task lists.
 * This satisfies the academic DSA requirement of avoiding Array.prototype.sort().
 */

/**
 * Compares two tasks based on a specific property and direction
 * @param {Object} a Task A
 * @param {Object} b Task B
 * @param {string} sortBy 'priority' | 'dueDate' | 'alphabetical'
 * @param {string} direction 'asc' | 'desc'
 * @returns {number} Negative if a < b, positive if a > b, 0 if equal
 */
function compareTasks(a, b, sortBy, direction = 'asc') {
  const isAsc = direction === 'asc';

  if (sortBy === 'priority') {
    const priorityWeights = { high: 3, medium: 2, low: 1 };
    const weightA = priorityWeights[a.priority?.toLowerCase()] || 0;
    const weightB = priorityWeights[b.priority?.toLowerCase()] || 0;
    
    // For Priority:
    // By default (asc), we want High first, i.e., High (3) -> Medium (2) -> Low (1).
    // This is mathematically descending. So if direction is 'asc' (normal behavior for priorities),
    // we return weightB - weightA.
    // If direction is 'desc' (reverse), we return weightA - weightB (Low -> Medium -> High).
    if (isAsc) {
      return weightB - weightA;
    } else {
      return weightA - weightB;
    }
  }

  if (sortBy === 'dueDate') {
    // Tasks without due date are pushed to the bottom of the list
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1; // a goes after b
    if (!b.dueDate) return -1; // b goes after a

    const timeA = new Date(a.dueDate).getTime();
    const timeB = new Date(b.dueDate).getTime();

    if (timeA === timeB) return 0;

    if (isAsc) {
      return timeA - timeB; // Soonest to furthest
    } else {
      return timeB - timeA; // Furthest to soonest
    }
  }

  if (sortBy === 'alphabetical') {
    const titleA = (a.title || '').toLowerCase();
    const titleB = (b.title || '').toLowerCase();

    if (titleA === titleB) return 0;

    if (isAsc) {
      return titleA.localeCompare(titleB); // A -> Z
    } else {
      return titleB.localeCompare(titleA); // Z -> A
    }
  }

  // Default: fallback to createdAt (newest first)
  const dateA = new Date(a.createdAt || 0).getTime();
  const dateB = new Date(b.createdAt || 0).getTime();
  return dateB - dateA;
}

/**
 * Merges two sorted arrays together
 * @param {Array} left 
 * @param {Array} right 
 * @param {string} sortBy 
 * @param {string} direction 
 * @returns {Array} Merged and sorted array
 */
function merge(left, right, sortBy, direction) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const comparison = compareTasks(left[leftIndex], right[rightIndex], sortBy, direction);
    if (comparison <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

/**
 * Main Merge Sort function
 * @param {Array} array The unsorted tasks array
 * @param {string} sortBy The property to sort by ('priority' | 'dueDate' | 'alphabetical')
 * @param {string} direction The sorting direction ('asc' | 'desc')
 * @returns {Array} A new, sorted tasks array
 */
export function mergeSort(array, sortBy, direction = 'asc') {
  if (!array || !Array.isArray(array)) return [];
  if (array.length <= 1) return [...array];

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(
    mergeSort(left, sortBy, direction),
    mergeSort(right, sortBy, direction),
    sortBy,
    direction
  );
}
