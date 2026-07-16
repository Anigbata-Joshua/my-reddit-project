/**
 * Generates Tailwind classes for sidebar links based on active state.
 * @param {boolean} isActive - Whether the link is currently active.
 * @returns {string} Tailwind CSS class string.
 */
export const getLinkClass = (isActive) => {
  return `flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium hover:bg-black/5 transition-colors w-full text-left ${
    isActive ? 'bg-black/5 font-bold text-black' : 'text-gray-700'
  }`;
};

export const SUBHEADER_CLASS = "flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase px-3 py-2 border-t border-gray-200 pt-4 mt-2 cursor-pointer select-none group hover:text-black transition-colors";