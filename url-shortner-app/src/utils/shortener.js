// src/utils/shortener.js

// src/utils/shortener.js

// Load used shortcodes from localStorage or start fresh
let usedShortcodes = new Set();
try {
  const stored = localStorage.getItem("usedShortcodes");
  if (stored) {
    usedShortcodes = new Set(JSON.parse(stored));
  }
} catch (error) {
  console.error("Error loading shortcodes from localStorage:", error);
  usedShortcodes = new Set();
}

// Generate a unique 6-character shortcode
export const generateShortcode = () => {
  let code;
  do {
    code = Math.random().toString(36).substring(2, 8); // "abc123"
  } while (usedShortcodes.has(code));

  usedShortcodes.add(code);
  localStorage.setItem("usedShortcodes", JSON.stringify([...usedShortcodes]));
  return code;
};

// Validate a well-formed URL
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate custom shortcode input
export const isValidShortcode = (code) => {
  return /^[a-zA-Z0-9]{3,12}$/.test(code);
};
