const KEY = 'skyofish';
const localStorage = window.localStorage;
let storeStorage;

function store() {
  try {
    if (!storeStorage) {
      storeStorage = JSON.parse(localStorage.getItem(KEY) || '{}');
    } else {
      localStorage.setItem(KEY, JSON.stringify(storeStorage));
    }
  } catch (e) {
    console.log(e);
  }
}

store();

export function has(key) {
  return Object.hasOwnProperty.call(storeStorage, key);
}

export function getItem(key) {
  if (!has(key)) {
    return false;
  }

  const { value, duration, time } = storeStorage[key] || {};

  if (Date.now() - time <= duration) {
    return value;
  }

  removeItem(key);
  return false;
}

export function setItem(key, value) {
  storeStorage[key] = {value};
  store();
}

export function removeItem(key) {
  if (has(key)) {
    delete storeStorage[key];
    store();
  }
}

export function clear() {
  storeStorage = {};
  store();
}
