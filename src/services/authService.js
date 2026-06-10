import { addUser, getUserByEmail } from '../database/usersStore.js';
import store from '../store/store.js';

const registerUser = async (name, email, password, profileType = 'Domestique') => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    const newUser = { name, email, password, profileType }; // In a real app, hash the password!
    const addedUser = await addUser(newUser);
    
    store.setState({ currentUser: addedUser, isAuthenticated: true });
    localStorage.setItem('leeral_currentUser', JSON.stringify(addedUser));
    return addedUser;
};

const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user || user.password !== password) { // In a real app, compare hashed passwords!
        throw new Error('Email ou mot de passe incorrect.');
    }

    store.setState({ currentUser: user, isAuthenticated: true });
    localStorage.setItem('leeral_currentUser', JSON.stringify(user));
    return user;
};

const logoutUser = () => {
    store.setState({ currentUser: null, isAuthenticated: false });
    localStorage.removeItem('leeral_currentUser');
};

const checkAuth = () => {
    const storedUser = localStorage.getItem('leeral_currentUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        store.setState({ currentUser: user, isAuthenticated: true });
        return true;
    }
    return false;
};

export { registerUser, loginUser, logoutUser, checkAuth };
