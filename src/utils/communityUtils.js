/**
 * Strips 'r/' prefix, removes spaces, and converts to lowercase.
 * @param {string} value 
 * @returns {string} Clean community name
 */
export const formatCommunityName = (value) => {
  return value.replace(/^r\//i, '').replace(/\s+/g, '').toLowerCase();
};