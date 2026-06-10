import store from './store/store.js';

// Map routes to PascalCase page component names
const routes = {
    '/': 'Intro',
    '/login': 'Login',
    '/register': 'Register',
    '/home': 'Home',
    '/calculator': 'Calculator',
    '/statistics': 'Statistics',
    '/history': 'History'
};

const protectedRoutes = ['/home', '/calculator', '/statistics', '/history'];

const render = async (path) => {
    const app = document.getElementById('app');
    if (!app) return;

    const pageName = routes[path];
    let pageModule;

    try {
        if (!pageName) {
            // Route not found - load 404 page
            pageModule = await import('./pages/NotFound/NotFound.js');
        } else {
            pageModule = await import(`./pages/${pageName}/${pageName}.js`);
        }

        const pageComponent = pageModule.default;
        app.innerHTML = pageComponent();

        // Call afterRender hook if it exists
        if (pageComponent.afterRender) {
            pageComponent.afterRender();
        }
    } catch (error) {
        console.error(`Failed to load page module for ${pageName}:`, error);
        try {
            pageModule = await import('./pages/NotFound/NotFound.js');
            app.innerHTML = pageModule.default();
            if (pageModule.default.afterRender) {
                pageModule.default.afterRender();
            }
        } catch (notFoundError) {
            console.error('Failed to load NotFound page:', notFoundError);
            app.innerHTML = '<h1>Error Loading Application</h1>';
        }
    }
};

const navigate = (path) => {
    window.location.hash = path;
};

const handleHashChange = async () => {
    const path = window.location.hash.replace('#', '') || '/';

    // Route guard for protected pages
    if (protectedRoutes.includes(path) && !store.getState().isAuthenticated) {
        navigate('/login');
        return;
    }

    await render(path);
};

const initRouter = () => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial render
};

export { initRouter, navigate };
