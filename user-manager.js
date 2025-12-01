// user-manager.js
export class UserManager {
    constructor() {
        this.currentUser = null;
        this.users = this.loadUsers();
    }

    loadUsers() {
        return JSON.parse(localStorage.getItem('sat_users')) || {};
    }

    saveUsers() {
        localStorage.setItem('sat_users', JSON.stringify(this.users));
    }

    createUser(username, initialData = {}) {
        const user = {
            id: this.generateId(),
            username: username,
            createdAt: new Date().toISOString(),
            currentScore: 400,
            xp: 0,
            level: 1,
            currentSubject: 'MATH',
            progress: {},
            ...initialData
        };

        this.users[user.id] = user;
        this.saveUsers();
        return user;
    }

    getUser(userId) {
        return this.users[userId];
    }

    getAllUsers() {
        return Object.values(this.users);
    }

    updateUser(userId, updates) {
        if (this.users[userId]) {
            this.users[userId] = { ...this.users[userId], ...updates };
            this.saveUsers();
            return this.users[userId];
        }
        return null;
    }

    setCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('current_user_id', user.id);
    }

    getCurrentUser() {
        if (!this.currentUser) {
            const currentUserId = localStorage.getItem('current_user_id');
            if (currentUserId && this.users[currentUserId]) {
                this.currentUser = this.users[currentUserId];
            }
        }
        return this.currentUser;
    }

    generateId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}