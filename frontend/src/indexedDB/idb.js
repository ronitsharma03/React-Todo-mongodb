import { openDB } from "idb";

const DB_NAME = "TaskWhiz_DB";
const STORE_NAME = "taskStore";
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("title", "title", { unique: false });
        store.createIndex("completed", "completed", { unique: false });
      }
    },
  });
  return db;
};

export const getAllTasks = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const addTask = async (task) => {
  const db = await initDB();
  return db.add(STORE_NAME, task);
};

export const updateTask = async (task) => {
  const db = await initDB();
  return db.put(STORE_NAME, task);
}

export const deleteTask = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}
