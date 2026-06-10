import { initRouter } from './router.js';
import { openDB } from './database/db.js';
import store from './store/store.js';
import { checkAuth } from './services/authService.js';

const initializeApp = async () => {
    console.log('Initializing Leeral App...');
    try {
        await openDB();
        console.log('IndexedDB initialized successfully.');

        // Load tariffs (assuming tariffs.json is directly accessible or loaded via a service)
        // For now, we'll simulate loading it.
        const response = await fetch('./data/tariffs.json');
        const data = await response.json();
        store.setState({ tariffs: data.tariffs });
        console.log('Tariffs loaded:', store.getState().tariffs);

        checkAuth(); // Check if user is already logged in
        initRouter(); // Initialize the router

    } catch (error) {
        console.error('Failed to initialize app:', error);
    }
};

document.addEventListener('DOMContentLoaded', initializeApp);
