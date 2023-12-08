function setLocalStorage(token, value) {
  localStorage.setItem(token, JSON.stringify(value));
}

function getLocalStorage(token) {
  try {
    const value = localStorage.getItem(token);
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function deleteKeyLocalStorage(token) {
  localStorage.removeItem(token);
}

export { setLocalStorage, getLocalStorage, deleteKeyLocalStorage };
