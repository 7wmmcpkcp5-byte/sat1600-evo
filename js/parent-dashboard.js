// parent-dashboard.js - Dashboard para padres con análisis detallado del progreso
import { AnalyticsManager } from './analytics-manager.js';
import { DataService } from './data-service.js';
import { CONFIG } from './config.js';

export class ParentDashboard {
    constructor() {
        this.analytics = new AnalyticsManager();
        this.dataService = new DataService();
        this.insights = {};
    }

    // === OBTENER REPORTE COMPLETO ===
    getProgressReport() {
        const stats = this.analytics.stats;
        const user = this.dataService.user;
        const performance = this.analytics.getOverallPerformance();
        const weakAreas = this.analytics.identifyWeakAreas();
        const sectionStats = this.analytics.getSectionPerformance();
        
        // Calcular métricas clave
        const overallAccuracy = stats.totalQuestions ? 
            Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0;
        
        const streak = this.calculateStudyStreak();
        const studyTime = this.formatStudyTime(stats.totalTimeSpent);
        const progressTrend = this.calculateProgressTrend();

        return {
            // Métricas principales
            stats: {
                ...stats,
                correctQuestions: stats.totalCorrect,
                totalQuestions: stats.totalQuestions,
                bySection: stats.bySection
            },
            overallAccuracy,
            streak,
            studyTime,
            xp: user.xp,
            level: user.level,
            levelName: this.getLevelName(user.level),
            
            // Análisis detallado
            weakAreas,
            sectionStats,
            progressTrend,
            studyRecommendations: this.generateParentRecommendations(weakAreas, performance),
            
            // Metadatos
            lastActive: user.lastActive,
            accountCreated: user.createdAt,
            premiumStatus: this.dataService.analytics ? true : false
        };
    }

    // === MÉTRICAS AVANZADAS ===
    calculateStudyStreak() {
        const dailyProgress = this.analytics.stats.dailyProgress;
        const dates = Object.keys(dailyProgress).sort().reverse();
        
        let streak = 0;
        let currentDate = new Date();
        
        for (let i = 0; i < dates.length; i++) {
            const date = new Date(dates[i]);
            const diffTime = Math.abs(currentDate - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === i + 1 && dailyProgress[dates[i]].questions > 0) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    calculateProgressTrend() {
        const last7Days = this.analytics.getLastNDays(7);
        const accuracyTrend = last7Days.map(day => 
            day.questions > 0 ? Math.round((day.correct / day.questions) * 100) : 0
        );

        const questionsTrend = last7Days.map(day => day.questions);
        const timeTrend = last7Days.map(day => Math.round(day.timeSpent / 60)); // en minutos

        return {
            accuracy: accuracyTrend,
            questions: questionsTrend,
            time: timeTrend,
            consistency: this.calculateConsistencyScore(questionsTrend),
            improvement: this.calculateImprovementRate(accuracyTrend)
        };
    }

    calculateConsistencyScore(questionsTrend) {
        const activeDays = questionsTrend.filter(q => q > 0).length;
        return Math.round((activeDays / questionsTrend.length) * 100);
    }

    calculateImprovementRate(accuracyTrend) {
        if (accuracyTrend.length < 2) return 0;
        const first = accuracyTrend[0];
        const last = accuracyTrend[accuracyTrend.length - 1];
        return last - first;
    }

    // === RECOMENDACIONES PARA PADRES ===
    generateParentRecommendations(weakAreas, performance) {
        const recommendations = [];
        
        // Recomendaciones basadas en precisión
        if (performance.accuracy < 60) {
            recommendations.push({
                priority: 'high',
                type: 'foundation',
                message: 'Focus on building fundamental concepts before timed practice',
                action: 'review_basics'
            });
        }

        // Recomendaciones basidas en áreas débiles
        if (weakAreas.length > 0) {
            const topWeakArea = weakAreas[0];
            recommendations.push({
                priority: 'medium',
                type: 'targeted_practice',
                message: `Schedule focused practice sessions for ${topWeakArea.name}`,
                action: `practice_${topWeakArea.name}`
            });
        }

        // Recomendaciones basadas en consistencia
        const consistency = this.calculateStudyStreak();
        if (consistency < 3) {
            recommendations.push({
                priority: 'medium',
                type: 'routine',
                message: 'Establish a consistent daily study routine (15-20 minutes)',
                action: 'set_daily_reminder'
            });
        }

        // Recomendaciones basadas en tiempo
        const avgTimePerQuestion = performance.averageTime;
        if (avgTimePerQuestion > 90) {
            recommendations.push({
                priority: 'low',
                type: 'time_management',
                message: 'Practice time management - aim for 60 seconds per question',
                action: 'timed_practice'
            });
        }

        // Ordenar por prioridad y devolver top 3
        return recommendations
            .sort((a, b) => {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            })
            .slice(0, 3);
    }

    // === FORMATO Y UTILIDADES ===
    formatStudyTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }

    getLevelName(level) {
        return CONFIG.levels[level] || "Unknown Owl";
    }

    // === PREDICCIONES Y PROYECCIONES ===
    getProjectedProgress(days = 30) {
        const currentStats = this.getProgressReport();
        const trend = currentStats.progressTrend;
        
        const projectedAccuracy = this.projectValue(trend.accuracy, days);
        const projectedQuestions = this.projectValue(trend.questions, days);
        
        return {
            timeline: `${days} days`,
            projectedAccuracy: Math.max(0, Math.min(100, projectedAccuracy)),
            projectedQuestions: Math.round(projectedQuestions),
            confidence: this.calculateProjectionConfidence(trend),
            milestone: this.predictNextMilestone(currentStats)
        };
    }

    projectValue(trend, days) {
        if (trend.length < 2) return trend[0] || 0;
        
        const recentValues = trend.slice(-5); // Últimos 5 puntos
        const weights = [0.1, 0.15, 0.2, 0.25, 0.3]; // Más peso a valores recientes
        const weightedAvg = recentValues.reduce((sum, val, idx) => 
            sum + (val * (weights[idx] || 0.25)), 0
        );
        
        return weightedAvg * (1 + (days * 0.02)); // Pequeño crecimiento proyectado
    }

    predictNextMilestone(currentStats) {
        const nextLevelXP = CONFIG.xpThresholds[currentStats.level] || 8000;
        const xpNeeded = nextLevelXP - currentStats.xp;
        const dailyXP = this.calculateDailyXPRate();
        
        if (dailyXP <= 0) return "No recent activity";
        
        const daysToLevelUp = Math.ceil(xpNeeded / dailyXP);
        
        return {
            type: 'level_up',
            target: `Level ${currentStats.level + 1}`,
            estimatedDays: daysToLevelUp,
            xpNeeded: xpNeeded
        };
    }

    calculateDailyXPRate() {
        const last7Days = this.analytics.getLastNDays(7);
        const totalXP = last7Days.reduce((sum, day) => {
            // Estimación: 50 XP por pregunta correcta (simplificado)
            return sum + (day.correct * 50);
        }, 0);
        
        const activeDays = last7Days.filter(day => day.questions > 0).length;
        return activeDays > 0 ? totalXP / 7 : 0; // Promedio diario
    }

    // === EXPORTACIÓN DE DATOS ===
    exportProgressReport() {
        const report = this.getProgressReport();
        const projections = this.getProjectedProgress();
        
        return {
            summary: {
                generatedAt: new Date().toISOString(),
                studentLevel: report.levelName,
                overallAccuracy: report.overallAccuracy,
                studyStreak: report.streak,
                totalStudyTime: report.studyTime
            },
            detailedAnalysis: {
                weakAreas: report.weakAreas,
                sectionPerformance: report.sectionStats,
                progressTrend: report.progressTrend
            },
            recommendations: report.studyRecommendations,
            projections: projections,
            rawData: {
                analytics: this.analytics.exportData(),
                userProgress: this.dataService.exportUserData()
            }
        };
    }

    // === RESET Y MANTENIMIENTO ===
    resetStudentProgress() {
        if (confirm('Are you sure you want to reset all student progress? This cannot be undone.')) {
            this.dataService.resetProgress();
            this.analytics.resetData();
            return true;
        }
        return false;
    }
}

// === FUNCIÓN DE RENDERIZADO ===
export function renderParentDashboard(container) {
    // 1. Usar la clase para obtener datos preparados
    const dashboardLogic = new ParentDashboard();
    const data = dashboardLogic.getProgressReport();
    
    // 2. Desestructurar para acceso más fácil
    const { stats, overallAccuracy, level, levelName, xp, streak, weakAreas, sectionStats, studyRecommendations, studyTime } = data;

    container.innerHTML = "";

    // TÍTULO Y ENCABEZADO
    const header = document.createElement('div');
    header.className = 'dashboard-header';
    header.innerHTML = `
        <div class="header-content">
            <h1>👨‍👦 Parent Dashboard</h1>
            <p class="dashboard-subtitle">Comprehensive progress tracking and insights</p>
            <div class="header-stats">
                <div class="header-stat">
                    <span class="stat-value">${overallAccuracy}%</span>
                    <span class="stat-label">Overall Accuracy</span>
                </div>
                <div class="header-stat">
                    <span class="stat-value">${level}</span>
                    <span class="stat-label">Level</span>
                </div>
                <div class="header-stat">
                    <span class="stat-value">${streak}</span>
                    <span class="stat-label">Day Streak</span>
                </div>
                <div class="header-stat">
                    <span class="stat-value">${studyTime}</span>
                    <span class="stat-label">Total Study Time</span>
                </div>
            </div>
        </div>
    `;
    container.appendChild(header);

    // TARJETA 1: RESUMEN
    const summary = document.createElement("div");
    summary.className = "parent-card";
    summary.innerHTML = `
        <div class="parent-card-header">
            <h3>📊 Student Progress Summary</h3>
            <span class="premium-badge">PARENT VIEW</span>
        </div>
        <div class="parent-card-content">
            <div class="progress-grid">
                <div class="progress-item">
                    <span class="label">Overall Performance:</span>
                    <span class="value">${stats.correctQuestions}/${stats.totalQuestions} correct (${overallAccuracy}%)</span>
                </div>
                <div class="progress-item">
                    <span class="label">Current Level:</span>
                    <span class="value"><strong>${levelName}</strong> (Level ${level})</span>
                </div>
                <div class="progress-item">
                    <span class="label">Total XP:</span>
                    <span class="value">${xp} points</span>
                </div>
                <div class="progress-item">
                    <span class="label">Study Streak:</span>
                    <span class="value">${streak} days</span>
                </div>
                <div class="progress-item">
                    <span class="label">Account Created:</span>
                    <span class="value">${new Date(data.accountCreated).toLocaleDateString()}</span>
                </div>
                <div class="progress-item">
                    <span class="label">Last Active:</span>
                    <span class="value">${new Date(data.lastActive).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    `;
    container.appendChild(summary);

    // TARJETA 2: RENDIMIENTO POR SECCIÓN
    const sectionCard = document.createElement("div");
    sectionCard.className = "parent-card";
    
    // Helper para calcular porcentaje de sección de forma segura
    const getSectionAccuracy = (sec) => {
        const section = stats.bySection[sec];
        return section && section.total ? Math.round((section.correct / section.total) * 100) : 0;
    };
    
    sectionCard.innerHTML = `
        <div class="parent-card-header">
            <h3>📈 Section Performance</h3>
        </div>
        <div class="parent-card-content">
            <div class="section-performance">
                ${['math', 'reading', 'writing'].map(sec => {
                    const acc = getSectionAccuracy(sec);
                    const sectionData = stats.bySection[sec] || { total: 0, correct: 0 };
                    return `
                    <div class="section-item ${sec}">
                        <div class="section-info">
                            <span class="section-name">${sec.charAt(0).toUpperCase() + sec.slice(1)}</span>
                            <span class="section-details">${sectionData.correct}/${sectionData.total} correct</span>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${acc}%"></div>
                            </div>
                            <span class="section-accuracy">${acc}%</span>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `;
    container.appendChild(sectionCard);

    // TARJETA 3: ÁREAS DE ENFOQUE
    const weakAreasCard = document.createElement("div");
    weakAreasCard.className = "parent-card";
    
    let weakAreasHTML = weakAreas.length > 0 
        ? weakAreas.map(area => `
            <div class="weak-area">
                <div class="area-header">
                    <span class="area-name">${area.name.toUpperCase()}</span>
                    <span class="area-priority priority-${area.priority > 70 ? 'high' : area.priority > 40 ? 'medium' : 'low'}">${area.priority}% priority</span>
                </div>
                <div class="area-details">
                    <span class="area-accuracy">${area.accuracy}% accuracy</span>
                    <span class="area-recommendation">${area.recommendation}</span>
                </div>
            </div>`).join('')
        : '<div class="no-weak-areas">🎉 No major weak areas detected! Keep up the great work!</div>';

    weakAreasCard.innerHTML = `
        <div class="parent-card-header">
            <h3>🎯 Focus Areas</h3>
        </div>
        <div class="parent-card-content">
            ${weakAreasHTML}
        </div>
    `;
    container.appendChild(weakAreasCard);

    // TARJETA 4: RECOMENDACIONES DE ESTUDIO
    const recommendationsCard = document.createElement("div");
    recommendationsCard.className = "parent-card";
    
    recommendationsCard.innerHTML = `
        <div class="parent-card-header">
            <h3>💡 Study Recommendations</h3>
        </div>
        <div class="parent-card-content">
            ${studyRecommendations.map(rec => `
                <div class="recommendation-item priority-${rec.priority}">
                    <div class="recommendation-icon">${this.getRecommendationIcon(rec.type)}</div>
                    <div class="recommendation-content">
                        <div class="recommendation-message">${rec.message}</div>
                        <div class="recommendation-action">Action: ${rec.action}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    container.appendChild(recommendationsCard);

    // BOTONES DE ACCIÓN
    const actionsCard = document.createElement("div");
    actionsCard.className = "parent-card";
    actionsCard.innerHTML = `
        <div class="parent-card-header">
            <h3>⚙️ Dashboard Actions</h3>
        </div>
        <div class="parent-card-content">
            <div class="action-buttons">
                <button id="export-report" class="action-btn primary">📊 Export Progress Report</button>
                <button id="view-analytics" class="action-btn secondary">📈 View Detailed Analytics</button>
                <button id="reset-progress" class="action-btn warning">🔄 Reset Student Progress</button>
                <button id="back-to-app" class="action-btn">← Back to App</button>
            </div>
        </div>
    `;
    container.appendChild(actionsCard);

    // EVENT LISTENERS
    this.setupDashboardEventListeners(dashboardLogic, container);
}

// === FUNCIONES DE UTILIDAD ===
function getRecommendationIcon(type) {
    const icons = {
        'foundation': '🏗️',
        'targeted_practice': '🎯',
        'routine': '📅',
        'time_management': '⏱️'
    };
    return icons[type] || '💡';
}

function setupDashboardEventListeners(dashboard, container) {
    // Exportar reporte
    container.querySelector('#export-report')?.addEventListener('click', () => {
        const report = dashboard.exportProgressReport();
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sat-owl-progress-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    });

    // Verificar analytics
    container.querySelector('#view-analytics')?.addEventListener('click', () => {
        alert('Advanced analytics dashboard coming soon!');
    });

    // Resetear progreso
    container.querySelector('#reset-progress')?.addEventListener('click', () => {
        if (dashboard.resetStudentProgress()) {
            alert('Progress reset successfully. Refreshing dashboard...');
            renderParentDashboard(container);
        }
    });

    // Volver a la app
    container.querySelector('#back-to-app')?.addEventListener('click', () => {
        window.location.href = '/'; // Ajustar según tu routing
    });
}