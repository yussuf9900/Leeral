import { openDB } from './db.js';

const addUser = async (user) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('users', 'readwrite');
        const store = tx.objectStore('users');
        const request = store.add(user);

        request.onsuccess = () => {
            const userId = request.result;
            resolve({ ...user, id: userId });
        };

        request.onerror = () => {
            reject(new Error(`Failed to add user: ${request.error}`));
        };

        tx.onerror = () => {
            reject(new Error(`Transaction error: ${tx.error}`));
        };
    });
};

const getUserByEmail = async (email) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const index = store.index('email');
        const request = index.get(email);

        request.onsuccess = () => {
            resolve(request.result || null);
        };

        request.onerror = () => {
            reject(new Error(`Failed to get user by email: ${request.error}`));
        };
    });
};

const getUserById = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('users', 'readonly');
        const store = tx.objectStore('users');
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result || null);
        };

        request.onerror = () => {
            reject(new Error(`Failed to get user by ID: ${request.error}`));
        };
    });
};

export { addUser, getUserByEmail, getUserById };
