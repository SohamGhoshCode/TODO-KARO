/**
 * Custom Binary Search algorithm.
 * Assumes the input array is already sorted alphabetically by title.
 * Finds all tasks whose titles start with the search query (case-insensitive).
 * 
 * @param {Array} sortedTasks Array of tasks sorted alphabetically by title
 * @param {string} query The search string
 * @returns {Array} List of matching tasks
 */
export function binarySearch(sortedTasks, query) {
  if (!query || query.trim() === '') return sortedTasks;
  if (!sortedTasks || sortedTasks.length === 0) return [];

  const cleanQuery = query.toLowerCase().trim();
  let low = 0;
  let high = sortedTasks.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midTitle = (sortedTasks[mid].title || '').toLowerCase();

    // Check if the mid task title starts with the query
    if (midTitle.startsWith(cleanQuery)) {
      // We found a match. Since multiple tasks can start with the same prefix,
      // we scan left and right from the mid index to collect all adjacent matches
      // and return them in correct sorted order.
      
      let left = mid - 1;
      while (left >= 0) {
        const leftTitle = (sortedTasks[left].title || '').toLowerCase();
        if (leftTitle.startsWith(cleanQuery)) {
          left--;
        } else {
          break;
        }
      }

      let right = mid + 1;
      while (right < sortedTasks.length) {
        const rightTitle = (sortedTasks[right].title || '').toLowerCase();
        if (rightTitle.startsWith(cleanQuery)) {
          right++;
        } else {
          break;
        }
      }

      // Collect all matching items from index (left + 1) to (right - 1)
      const results = [];
      for (let i = left + 1; i < right; i++) {
        results.push(sortedTasks[i]);
      }
      return results;
    }

    // Binary search decisions
    if (midTitle < cleanQuery) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // No match found
  return [];
}
