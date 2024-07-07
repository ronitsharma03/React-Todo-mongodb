import { openDB } from 'idb';

const DB_NAME = 'tasksDB';
const STORE_NAME = 'tasks';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('title', 'title', { unique: false });
        store.createIndex('description', 'description', { unique: false });
        store.createIndex('date', 'date', { unique: false });
        store.createIndex('marked', 'marked', { unique: false });
      }
    }
  });
  return db;
};

export const getAllTasks = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addTask = async (task) => {
  const db = await initDB();
  task.needsSync = !navigator.onLine;
  return db.add(STORE_NAME, task);
};

export const updateTask = async (task) => {
  const db = await initDB();
  task.needsSync = !navigator.onLine;
  return db.put(STORE_NAME, task);
};

export const deleteTask = async (id) => {
  const db = await initDB();
  const task = await db.get(STORE_NAME, id);
  task.needsSync = !navigator.onLine;
  task.deleted = true;
  return db.put(STORE_NAME, task);
};
