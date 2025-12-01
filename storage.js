l// storage.js - Sistema de almacenamiento profesional con backup
class StorageSystem {
    constructor() {
        this.config = {
            userKey: 'sat_owl_user_v2',
            backupKey: 'sat_owl_backup',
            autoBackup: true,
            backupInterval: 60000 // 1 minuto
        };
        
        this.init();
    }

    init() {
        // Auto-backup periódico
        if (this.config.autoBackup) {
            setInterval(() => {
                this.createBackup();
            }, this.config.backupInterval);
        }
    }

    // === USER DATA MANAGEMENT ===
    saveUserProgress(userData) {
        try {
            const dataToSave = {
                ...userData,
                lastUpdated: new Date().toISOString(),
                version: '2.0'
            };

            localStorage.setItem(this.config.userKey, JSON.stringify(dataToSave));
            
            // Auto-backup en cada guardado importante
            if (this.config.autoBackup) {
                this.createBackup();
            }

            return true;
        } catch (error) {
            console.error('Error saving user progress:', error);
            return false;
        }
    }

    getCurrentUser() {
        try {
            const userData = localStorage.getItem(this.config.userKey);
            if (!userData) return null;

            const parsed = JSON.parse(userData);
            
            // Migración de datos si es necesario
            return this.migrateUserData(parsed);
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    }

    migrateUserData(userData) {
        // Migrar de versión 1.0 a 2.0 si es necesario
        if (!userData.version || userData.version === '1.0') {
            return {
                ...userData,
                version: '2.0',
                stats: userData.stats || {
                    math: { correct: 0, total: 0 },
                    reading: { correct: 0, total: 0 },
                    writing: { correct: 0, total: 0 }
                },
                preferences: userData.preferences || {
                    sound: true,
                    darkMode: false,
                    notifications: true
                }
            };
        }

        return userData;
    }

    // === BACKUP SYSTEM ===
    createBackup() {
        try {
            const userData = this.getCurrentUser();
            if (!userData) return false;

            const backup = {
                data: userData,
                timestamp: new Date().toISOString(),
                version: '2.0'
            };

            localStorage.setItem(this.config.backupKey, JSON.stringify(backup));
            return true;
        } catch (error) {
            console.error('Error creating backup:', error);
            return false;
        }
    }

    restoreBackup() {
        try {
            const backupData = localStorage.getItem(this.config.backupKey);
            if (!backupData) return false;

            const backup = JSON.parse(backupData);
            
            // Verificar que el backup no esté corrupto
            if (this.validateUserData(backup.data)) {
                localStorage.setItem(this.config.userKey, JSON.stringify(backup.data));
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error restoring backup:', error);
            return false;
        }
    }

    // === DATA VALIDATION ===
    validateUserData(userData) {
        const requiredFields = ['id', 'xp', 'level', 'stats'];
        return requiredFields.every(field => userData.hasOwnProperty(field));
    }

    // === DATA ANALYSIS ===
    getUserStats() {
        const user = this.getCurrentUser();
        if (!user) return null;

        const stats = user.stats;
        const totalQuestions = Object.values(stats).reduce((sum, subject) => sum + subject.total, 0);
        const correctAnswers = Object.values(stats).reduce((sum, subject) => sum + subject.correct, 0);
        const overallAccuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

        return {
            overallAccuracy: Math.round(overallAccuracy),
            totalQuestions,
            correctAnswers,
            bySubject: Object.entries(stats).reduce((acc, [subject, data]) => {
                acc[subject] = {
                    accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
                    total: data.total,
                    correct: data.correct
                };
                return acc;
            }, {})
        };
    }

    // === EXPORT/IMPORT ===
    exportUserData() {
        const userData = this.getCurrentUser();
        if (!userData) return null;

        const exportData = {
            ...userData,
            exportDate: new Date().toISOString(),
            exportVersion: '2.0'
        };

        return JSON.stringify(exportData, null, 2);
    }

    importUserData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            
            if (this.validateUserData(importedData)) {
                this.saveUserProgress(importedData);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error importing user data:', error);
            return false;
        }
    }

    // === CLEANUP ===
    clearAllData() {
        try {
            localStorage.removeItem(this.config.userKey);
            localStorage.removeItem(this.config.backupKey);
            return true;
        } catch (error) {
            console.error('Error clearing data:', error);
            return false;
        }
    }

    // === STORAGE INFO ===
    getStorageInfo() {
        const userData = localStorage.getItem(this.config.userKey);
        const backupData = localStorage.getItem(this.config.backupKey);
        
        return {
            userDataSize: userData ? userData.length : 0,
            backupDataSize: backupData ? backupData.length : 0,
            totalSize: (userData?.length || 0) + (backupData?.length || 0),
            lastBackup: backupData ? JSON.parse(backupData).timestamp : null
        };
    }
}

// Singleton pattern para asegurar una única instancia
const Storage = new StorageSystem();
export { Storage };