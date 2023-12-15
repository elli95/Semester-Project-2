/**
 * Adds value to localStorage
 * @param {string} token The value to be deleted
 * @param {string} value The value that is combined with the token, and stored
 */
function setLocalStorage(token, value) {
  localStorage.setItem(token, JSON.stringify(value));
}

/**
 * Returns the localStorage value that was queried.
 * @param {string} token The value to be deleted
 * @returns The value to be returned
 */
function getLocalStorage(token) {
  try {
    const value = localStorage.getItem(token);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

/**
 * Deletes the localStorage data
 * @param {string} token The value to be deleted
 */
function deleteThisLocalStorage(token) {
  localStorage.removeItem(token);
}

export { setLocalStorage, getLocalStorage, deleteThisLocalStorage };
