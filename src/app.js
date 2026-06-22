import { initRouter } from './router.js';
import { openDB } from './database/db.js';
import store from './store/store.js';
import { checkAuth } from './services/authService.js';

const initializeApp = async () => {
    console.log('Initializing Leeral App...');
    try {
        await openDB();
        console.log('IndexedDB initialized successfully.');

        const response = await fetch('./data/tariffs.json');
        const data = await response.json();
        store.setState({ tariffs: data.tariffs });
        console.log('Tariffs loaded:', store.getState().tariffs);

        checkAuth(); 
        initRouter(); 

    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
};

document.addEventListener('DOMContentLoaded', initializeApp);
