const AuthService = {
    login: async (email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const token = 'mock-jwt-token';
                localStorage.setItem('token', token);
                resolve({ token });
            }, 500);
        });
    },

    register: async (name, email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 500);
        });
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: () => {
        return localStorage.getItem('token');
    }
};

export default AuthService;
