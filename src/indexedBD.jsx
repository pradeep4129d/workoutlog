const DB_NAME = 'myDatabase';
const STORE_NAME = 'myStore';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const addData = async (data) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.add(data);

    request.onsuccess = () => {
      resolve(true); // Data added successfully
    };

    request.onerror = (event) => {
      console.error("Add operation failed: ", event.target.error);
      reject(event.target.error); // Handle error
    };

    transaction.oncomplete = () => {
      console.log("Transaction completed.");
    };

    transaction.onerror = (event) => {
      console.error("Transaction failed: ", event.target.error);
      reject(event.target.error);
    };
  });
};

export const getData = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result || null); // Resolve with the data or null if not found
    };

    request.onerror = (event) => {
      console.error("Get operation failed: ", event.target.error);
      reject(event.target.error);
    };
  });
};

export const deleteData = async (id) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      resolve(true); // Data deleted successfully
    };

    request.onerror = (event) => {
      console.error("Delete operation failed: ", event.target.error);
      reject(event.target.error);
    };

    transaction.oncomplete = () => {
      console.log("Transaction completed.");
    };

    transaction.onerror = (event) => {
      console.error("Transaction failed: ", event.target.error);
      reject(event.target.error);
    };
  });
};
