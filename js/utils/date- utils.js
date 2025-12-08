// ============================================
// DATE UTILITIES MODULE
// Utilidades para manejo de fechas y tiempos
// ============================================

const DateUtils = {
    // ==================== FORMATTING ====================
    
    /**
     * Formatea una fecha para mostrar en UI
     * @param {Date|string} date - Fecha a formatear
     * @param {string} format - Formato deseado
     * @returns {string} Fecha formateada
     */
    formatDate(date, format = 'medium') {
        const d = new Date(date);
        if (isNaN(d.getTime())) return 'Fecha inválida';
        
        const formats = {
            'short': `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear().toString().slice(-2)}`,
            'medium': `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
            'long': d.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            'iso': d.toISOString().split('T')[0],
            'time': d.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            'datetime': `${this.formatDate(d, 'medium')} ${this.formatDate(d, 'time')}`
        };
        
        return formats[format] || formats.medium;
    },
    
    /**
     * Formatea una duración en segundos a formato legible
     * @param {number} seconds - Duración en segundos
     * @returns {string} Duración formateada
     */
    formatDuration(seconds) {
        if (seconds < 60) {
            return `${Math.round(seconds)}s`;
        }
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        if (minutes < 60) {
            return `${minutes}m ${remainingSeconds}s`;
        }
        
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        return `${hours}h ${remainingMinutes}m`;
    },
    
    /**
     * Formatea un tiempo restante para countdown
     * @param {number} seconds - Segundos restantes
     * @returns {string} Tiempo formateado
     */
    formatCountdown(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    },
    
    // ==================== CALCULATIONS ====================
    
    /**
     * Calcula la diferencia entre dos fechas
     * @param {Date} date1 - Fecha inicial
     * @param {Date} date2 - Fecha final (default: ahora)
     * @returns {Object} Diferencia en varias unidades
     */
    getDateDifference(date1, date2 = new Date()) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffMs = Math.abs(d2 - d1);
        
        return {
            milliseconds: diffMs,
            seconds: Math.floor(diffMs / 1000),
            minutes: Math.floor(diffMs / (1000 * 60)),
            hours: Math.floor(diffMs / (1000 * 60 * 60)),
            days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
            weeks: Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7)),
            months: Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44)),
            years: Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25))
        };
    },
    
    /**
     * Verifica si dos fechas son el mismo día
     * @param {Date} date1 - Primera fecha
     * @param {Date} date2 - Segunda fecha
     * @returns {boolean} True si son el mismo día
     */
    isSameDay(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        
        return d1.getFullYear() === d2.getFullYear() &&
               d1.getMonth() === d2.getMonth() &&
               d1.getDate() === d2.getDate();
    },
    
    /**
     * Verifica si una fecha es hoy
     * @param {Date} date - Fecha a verificar
     * @returns {boolean} True si es hoy
     */
    isToday(date) {
        return this.isSameDay(date, new Date());
    },
    
    /**
     * Verifica si una fecha es ayer
     * @param {Date} date - Fecha a verificar
     * @returns {boolean} True si es ayer
     */
    isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return this.isSameDay(date, yesterday);
    },
    
    /**
     * Calcula la fecha de hace X días
     * @param {number} days - Número de días hacia atrás
     * @returns {Date} Fecha calculada
     */
    getDateDaysAgo(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    },
    
    // ==================== STREAK UTILITIES ====================
    
    /**
     * Verifica si hay un streak activo (días consecutivos)
     * @param {Array} dates - Array de fechas de actividad
     * @param {number} minDays - Mínimo de días para considerar streak
     * @returns {Object} Información del streak
     */
    calculateStreak(dates, minDays = 1) {
        if (!dates || dates.length === 0) {
            return {
                current: 0,
                longest: 0,
                isActive: false
            };
        }
        
        // Ordenar fechas y eliminar duplicados del mismo día
        const uniqueDates = [...new Set(dates.map(d => {
            const date = new Date(d);
            return date.toISOString().split('T')[0];
        }))].sort();
        
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;
        const today = new Date().toISOString().split('T')[0];
        const yesterday = this.getDateDaysAgo(1).toISOString().split('T')[0];
        
        // Calcular streaks
        for (let i = 0; i < uniqueDates.length; i++) {
            if (i === 0) {
                tempStreak = 1;
            } else {
                const prevDate = new Date(uniqueDates[i - 1]);
                const currDate = new Date(uniqueDates[i]);
                const diffDays = Math.floor((currDate - prevDate) / (1000 * 60 * 60 * 24));
                
                if (diffDays === 1) {
                    tempStreak++;
                } else if (diffDays > 1) {
                    tempStreak = 1;
                }
            }
            
            // Actualizar longest streak
            if (tempStreak > longestStreak) {
                longestStreak = tempStreak;
            }
            
            // Calcular current streak (solo si incluye hoy o ayer)
            if (uniqueDates[i] === today || uniqueDates[i] === yesterday) {
                if (i === uniqueDates.length - 1 || 
                    new Date(uniqueDates[i + 1]) - new Date(uniqueDates[i]) > 86400000) {
                    currentStreak = tempStreak;
                }
            }
        }
        
        return {
            current: currentStreak,
            longest: longestStreak,
            isActive: currentStreak >= minDays,
            lastActivity: uniqueDates[uniqueDates.length - 1] || null
        };
    },
    
    /**
     * Verifica si se mantuvo el streak (actividad hoy)
     * @param {string} lastActivityDate - Última fecha de actividad
     * @returns {boolean} True si el streak sigue activo
     */
    isStreakActive(lastActivityDate) {
        if (!lastActivityDate) return false;
        
        const lastActivity = new Date(lastActivityDate);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        return this.isSameDay(lastActivity, today) || 
               this.isSameDay(lastActivity, yesterday);
    },
    
    // ==================== TIME UTILITIES ====================
    
    /**
     * Convierte hora en formato 12h a 24h
     * @param {string} time12h - Hora en formato 12h (e.g., "02:30 PM")
     * @returns {string} Hora en formato 24h (e.g., "14:30")
     */
    convert12to24(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
            hours = '00';
        }
        
        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }
        
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    },
    
    /**
     * Obtiene el inicio del día (00:00:00)
     * @param {Date} date - Fecha base
     * @returns {Date} Inicio del día
     */
    getStartOfDay(date = new Date()) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    },
    
    /**
     * Obtiene el fin del día (23:59:59)
     * @param {Date} date - Fecha base
     * @returns {Date} Fin del día
     */
    getEndOfDay(date = new Date()) {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return d;
    },
    
    /**
     * Obtiene el inicio de la semana (lunes)
     * @param {Date} date - Fecha base
     * @returns {Date} Inicio de la semana
     */
    getStartOfWeek(date = new Date()) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Ajustar para que semana empiece en lunes
        d.setDate(diff);
        return this.getStartOfDay(d);
    },
    
    /**
     * Obtiene el inicio del mes
     * @param {Date} date - Fecha base
     * @returns {Date} Inicio del mes
     */
    getStartOfMonth(date = new Date()) {
        const d = new Date(date);
        d.setDate(1);
        return this.getStartOfDay(d);
    },
    
    // ==================== VALIDATION ====================
    
    /**
     * Verifica si una fecha es válida
     * @param {any} date - Valor a verificar
     * @returns {boolean} True si es una fecha válida
     */
    isValidDate(date) {
        if (!date) return false;
        
        const d = new Date(date);
        return !isNaN(d.getTime());
    },
    
    /**
     * Verifica si una fecha está en el futuro
     * @param {Date} date - Fecha a verificar
     * @returns {boolean} True si es futura
     */
    isFutureDate(date) {
        const d = new Date(date);
        return d > new Date();
    },
    
    /**
     * Verifica si una fecha está en el pasado
     * @param {Date} date - Fecha a verificar
     * @returns {boolean} True si es pasada
     */
    isPastDate(date) {
        const d = new Date(date);
        return d < new Date();
    },
    
    // ==================== DATE MANIPULATION ====================
    
    /**
     * Agrega días a una fecha
     * @param {Date} date - Fecha base
     * @param {number} days - Días a agregar
     * @returns {Date} Nueva fecha
     */
    addDays(date, days) {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    },
    
    /**
     * Agrega horas a una fecha
     * @param {Date} date - Fecha base
     * @param {number} hours - Horas a agregar
     * @returns {Date} Nueva fecha
     */
    addHours(date, hours) {
        const d = new Date(date);
        d.setHours(d.getHours() + hours);
        return d;
    },
    
    /**
     * Agrega minutos a una fecha
     * @param {Date} date - Fecha base
     * @param {number} minutes - Minutos a agregar
     * @returns {Date} Nueva fecha
     */
    addMinutes(date, minutes) {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() + minutes);
        return d;
    },
    
    // ==================== COMPARISON ====================
    
    /**
     * Compara dos fechas ignorando el tiempo
     * @param {Date} date1 - Primera fecha
     * @param {Date} date2 - Segunda fecha
     * @returns {number} -1 si date1 < date2, 0 si iguales, 1 si date1 > date2
     */
    compareDates(date1, date2) {
        const d1 = this.getStartOfDay(date1);
        const d2 = this.getStartOfDay(date2);
        
        if (d1 < d2) return -1;
        if (d1 > d2) return 1;
        return 0;
    },
    
    /**
     * Obtiene la fecha más reciente de un array
     * @param {Array} dates - Array de fechas
     * @returns {Date} Fecha más reciente
     */
    getMostRecentDate(dates) {
        if (!dates || dates.length === 0) return null;
        
        let mostRecent = new Date(dates[0]);
        
        dates.forEach(dateStr => {
            const date = new Date(dateStr);
            if (date > mostRecent) {
                mostRecent = date;
            }
        });
        
        return mostRecent;
    },
    
    /**
     * Obtiene la fecha más antigua de un array
     * @param {Array} dates - Array de fechas
     * @returns {Date} Fecha más antigua
     */
    getOldestDate(dates) {
        if (!dates || dates.length === 0) return null;
        
        let oldest = new Date(dates[0]);
        
        dates.forEach(dateStr => {
            const date = new Date(dateStr);
            if (date < oldest) {
                oldest = date;
            }
        });
        
        return oldest;
    }
};

// Exportar módulo
window.dateUtils = DateUtils;
console.log('✅ Date Utilities Module cargado');