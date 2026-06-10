const store = {
    _state: {
        currentUser: null,
        isAuthenticated: false,
        currentBill: null,
        tariffs: []
    },

    _listeners: [],

    getState() {
        return { ...this._state };
    },

    setState(newState) {
        this._state = { ...this._state, ...newState };
        this._notifyListeners();
    },

    subscribe(listener) {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(l => l !== listener);
        };
    },

    _notifyListeners() {
        this._listeners.forEach(listener => listener(this.getState()));
    }
};

export default store;
