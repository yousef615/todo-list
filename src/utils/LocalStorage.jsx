export function setItem({ key, value = null }) {
    try {
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      console.error("Failed to set item in localStorage:", error);
    }
  }
  
  export function getItem(key) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("Failed to get item from localStorage:", error);
      return undefined;
    }
  }
  