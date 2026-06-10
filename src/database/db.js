const DB_NAME = 'LeeralDB';
const DB_VERSION = 1;

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Create 'users' object store
            if (!db.objectStoreNames.contains('users')) {
                const usersStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
                usersStore.createIndex('email', 'email', { unique: true });
            }

            // Create 'bills' object store
            if (!db.objectStoreNames.contains('bills')) {
                const billsStore = db.createObjectStore('bills', { keyPath: 'id', autoIncrement: true });
                billsStore.createIndex('userId', 'userId', { unique: false });
                billsStore.createIndex('date', 'date', { unique: false });
            }

            // Create 'settings' object store
            if (!db.objectStoreNames.contains('settings')) {
                const settingsStore = db.createObjectStore('settings', { keyPath: 'userId', unique: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject('IndexedDB error: ' + event.target.errorCode);
        };
    });
};

export { openDB };

