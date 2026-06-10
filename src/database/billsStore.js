import { openDB } from './db.js';

const addBill = async (bill) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('bills', 'readwrite');
        const store = tx.objectStore('bills');
        const request = store.add(bill);

        request.onsuccess = () => {
            const billId = request.result;
            resolve({ ...bill, id: billId });
        };

        request.onerror = () => {
            reject(new Error(`Failed to add bill: ${request.error}`));
        };

        tx.onerror = () => {
            reject(new Error(`Transaction error: ${tx.error}`));
        };
    });
};

const getBillsByUserId = async (userId) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('bills', 'readonly');
        const store = tx.objectStore('bills');
        const index = store.index('userId');
        const request = index.getAll(userId);

        request.onsuccess = () => {
            resolve(request.result || []);
        };

        request.onerror = () => {
            reject(new Error(`Failed to get bills: ${request.error}`));
        };
    });
};

const deleteBill = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('bills', 'readwrite');
        const store = tx.objectStore('bills');
        const request = store.delete(id);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(new Error(`Failed to delete bill: ${request.error}`));
        };

        tx.onerror = () => {
            reject(new Error(`Transaction error: ${tx.error}`));
        };
    });
};

export { addBill, getBillsByUserId, deleteBill };
