<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAT Owl - Analytics Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* Estilos específicos para el Dashboard */
        .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: var(--bg-primary);
            min-height: 100vh;
        }

        .dashboard-header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 2rem;
            background: linear-gradient(135deg, var(--primary), #6366f1);
            border-radius: var(--border-radius);
            color: white;
        }

        .dashboard-header h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        .dashboard-header p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 2rem;
        }

        .kpi-card {
            background: var(--bg-card);
            padding: 24px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            border-left: 5px solid;
            transition: var(--transition);
        }

        .kpi-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .kpi-value { 
            font-size: 2.5rem; 
            font-weight: bold; 
            color: var(--text-primary);
            margin: 10px 0;
        }
        
        .kpi-label { 
            color: var(--text-secondary); 
            text-transform: uppercase; 
            font-size: 0.8rem; 
            letter-spacing: 1px;
            font-weight: 600;
        }

        .kpi-trend {
            font-size: 0.875rem;
            margin-top: 8px;
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .trend-up { color: var(--success); }
        .trend-down { color: var(--error); }
        .trend-neutral { color: var(--text-muted); }

        .chart-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 2rem;
        }

        .chart-container {
            background: var(--bg-card);
            padding: 24px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
        }

        .chart-container h3 {
            color: var(--text-primary);
            margin-bottom: 1rem;
            font-size: 1.25rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .insights-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .insight-card {
            background: var(--bg-card);
            padding: 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            border-left: 4px solid;
        }

        .insight-card h4 {
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .insight-content {
            color: var(--text-secondary);
            line-height: 1.5;
        }

        .dashboard-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
            flex-wrap: wrap;
        }

        .action-btn {
            padding: 12px 24px;
            border: none;
            border-radius: var(--border-radius);
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .action-btn.primary {
            background: linear-gradient(135deg, var(--primary), #6366f1);
            color: white;
        }

        .action-btn.secondary {
            background: var(--bg-elevated);
            color: var(--text-primary);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
            
            .chart-section {
                grid-template-columns: 1fr;
            }
            
            .chart-container {
                min-width: unset;
            }
            
            .kpi-value {
                font-size: 2rem;
            }
            
            .dashboard-header h1 {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .dashboard-container {
                padding: 10px;
            }
            
            .chart-container {
                padding: 16px;
            }
            
            .kpi-card {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1>📊 SAT OWL Analytics</h1>
            <p>Detailed performance tracking and insights</p>
        </div>

        <!-- Key Performance Indicators -->
        <div class="dashboard-grid">
            <div class="kpi-card" style="border-color: #4a90e2;">
                <div class="kpi-label">Precisión Global</div>
                <div class="kpi-value" id="accuracy-display">--%</div>
                <div class="kpi-trend" id="accuracy-trend">--</div>
            </div>
            <div class="kpi-card" style="border-color: #2ecc71;">
                <div class="kpi-label">Preguntas Totales</div>
                <div class="kpi-value" id="total-q-display">--</div>
                <div class="kpi-trend" id="questions-trend">--</div>
            </div>
            <div class="kpi-card" style="border-color: #f1c40f;">
                <div class="kpi-label">Mejor Racha</div>
                <div class="kpi-value" id="streak-display">--</div>
                <div class="kpi-trend" id="streak-trend">--</div>
            </div>
            <div class="kpi-card" style="border-color: #e74c3c;">
                <div class="kpi-label">Tiempo Total</div>
                <div class="kpi-value" id="time-display">--</div>
                <div class="kpi-trend" id="time-trend">--</div>
            </div>
            <div class="kpi-card" style="border-color: #9b59b6;">
                <div class="kpi-label">Nivel Actual</div>
                <div class="kpi-value" id="level-display">--</div>
                <div class="kpi-trend" id="level-trend">--</div>
            </div>
            <div class="kpi-card" style="border-color: #1abc9c;">
                <div class="kpi-label">Racha Actual</div>
                <div class="kpi-value" id="current-streak-display">--</div>
                <div class="kpi-trend" id="current-streak-trend">--</div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="chart-section">
            <div class="chart-container">
                <h3>📈 Tendencia de Rendimiento (Últimos 7 días)</h3>
                <canvas id="trendChart" height="250"></canvas>
            </div>

            <div class="chart-container">
                <h3>🎯 Rendimiento por Sección</h3>
                <canvas id="radarChart" height="250"></canvas>
            </div>
        </div>

        <div class="chart-section">
            <div class="chart-container">
                <h3>📊 Distribución de Preguntas</h3>
                <canvas id="doughnutChart" height="250"></canvas>
            </div>

            <div class="chart-container">
                <h3>⏱️ Tiempo por Categoría</h3>
                <canvas id="barChart" height="250"></canvas>
            </div>
        </div>

        <!-- Insights Section -->
        <div class="chart-container">
            <h3>💡 Insights y Recomendaciones</h3>
            <div class="insights-grid" id="insights-container">
                <!-- Los insights se cargarán dinámicamente -->
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="dashboard-actions">
            <a href="index.html" class="action-btn secondary">
                ← Volver a la App
            </a>
            <button class="action-btn primary" id="export-btn">
                📥 Exportar Reporte
            </button>
            <button class="action-btn secondary" id="refresh-btn">
                🔄 Actualizar Datos
            </button>
        </div>
    </div>

    <script type="module">
        import { AnalyticsManager } from './analytics-manager.js';
        import { DataService } from './data-service.js';
        import { CONFIG, getLevelInfo } from './config.js';

        class AnalyticsDashboard {
            constructor() {
                this.analytics = new AnalyticsManager();
                this.dataService = new DataService();
                this.charts = {};
                this.initializeDashboard();
            }

            async initializeDashboard() {
                try {
                    // Cargar datos
                    await this.loadData();
                    
                    // Renderizar KPIs
                    this.renderKPIs();
                    
                    // Renderizar gráficos
                    this.renderCharts();
                    
                    // Renderizar insights
                    this.renderInsights();
                    
                    // Configurar event listeners
                    this.setupEventListeners();
                    
                    console.log('Analytics Dashboard initialized');
                    
                } catch (error) {
                    console.error('Error initializing dashboard:', error);
                    this.showError('Failed to load analytics data');
                }
            }

            async loadData() {
                // Simular carga asíncrona si es necesario
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.stats = this.analytics.stats;
                        this.performance = this.analytics.getOverallPerformance();
                        this.sections = this.analytics.getSectionPerformance();
                        this.insights = this.analytics.generateRealTimeInsights();
                        resolve();
                    }, 100);
                });
            }

            renderKPIs() {
                const user = this.dataService.user;
                const levelInfo = getLevelInfo(user.xp);

                // Precisión Global
                document.getElementById('accuracy-display').textContent = 
                    `${this.performance.accuracy}%`;
                this.renderTrend('accuracy-trend', this.insights.performanceTrend.direction);

                // Preguntas Totales
                document.getElementById('total-q-display').textContent = 
                    this.stats.totalQuestions.toLocaleString();
                this.renderTrend('questions-trend', this.calculateQuestionTrend());

                // Mejor Racha
                document.getElementById('streak-display').textContent = 
                    this.stats.bestStreak;
                this.renderTrend('streak-trend', this.calculateStreakTrend());

                // Tiempo Total
                document.getElementById('time-display').textContent = 
                    this.formatTime(this.stats.totalTimeSpent);
                this.renderTrend('time-trend', this.calculateTimeTrend());

                // Nivel Actual
                document.getElementById('level-display').textContent = 
                    `Lvl ${user.level}`;
                this.renderTrend('level-trend', 'up'); // Siempre positivo cuando hay progreso

                // Racha Actual
                document.getElementById('current-streak-display').textContent = 
                    this.stats.currentStreak;
                this.renderTrend('current-streak-trend', this.stats.currentStreak > 0 ? 'up' : 'neutral');
            }

            renderTrend(elementId, direction) {
                const element = document.getElementById(elementId);
                const trends = {
                    'improving': { text: '↑ Mejorando', class: 'trend-up' },
                    'declining': { text: '↓ Decreciendo', class: 'trend-down' },
                    'stable': { text: '→ Estable', class: 'trend-neutral' },
                    'up': { text: '↑ Positivo', class: 'trend-up' },
                    'down': { text: '↓ Negativo', class: 'trend-down' },
                    'neutral': { text: '→ Neutral', class: 'trend-neutral' }
                };

                const trend = trends[direction] || trends.stable;
                element.textContent = trend.text;
                element.className = `kpi-trend ${trend.class}`;
            }

            calculateQuestionTrend() {
                const last7Days = this.analytics.getLastNDays(7);
                const recentQuestions = last7Days.slice(-3).reduce((sum, day) => sum + day.questions, 0);
                const olderQuestions = last7Days.slice(0, 3).reduce((sum, day) => sum + day.questions, 0);
                
                if (recentQuestions > olderQuestions * 1.2) return 'up';
                if (recentQuestions < olderQuestions * 0.8) return 'down';
                return 'stable';
            }

            calculateStreakTrend() {
                return this.stats.currentStreak > 0 ? 'up' : 'neutral';
            }

            calculateTimeTrend() {
                const last7Days = this.analytics.getLastNDays(7);
                const recentTime = last7Days.slice(-3).reduce((sum, day) => sum + day.timeSpent, 0);
                const olderTime = last7Days.slice(0, 3).reduce((sum, day) => sum + day.timeSpent, 0);
                
                if (recentTime > olderTime * 1.2) return 'up';
                if (recentTime < olderTime * 0.8) return 'down';
                return 'stable';
            }

            renderCharts() {
                this.renderTrendChart();
                this.renderRadarChart();
                this.renderDoughnutChart();
                this.renderBarChart();
            }

            renderTrendChart() {
                const trendData = this.insights.performanceTrend.trend;
                const labels = this.generateDayLabels(7);

                const ctx = document.getElementById('trendChart').getContext('2d');
                this.charts.trend = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Precisión (%)',
                            data: trendData.length ? trendData : Array(7).fill(this.performance.accuracy),
                            borderColor: '#4a90e2',
                            backgroundColor: 'rgba(74, 144, 226, 0.1)',
                            borderWidth: 3,
                            tension: 0.4,
                            fill: true,
                            pointBackgroundColor: '#4a90e2',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: 'var(--text-secondary)'
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: 'var(--text-secondary)'
                                }
                            }
                        }
                    }
                });
            }

            renderRadarChart() {
                const sections = this.sections;
                const ctx = document.getElementById('radarChart').getContext('2d');
                
                this.charts.radar = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Matemáticas', 'Lectura', 'Escritura'],
                        datasets: [{
                            label: 'Nivel de Dominio (%)',
                            data: [
                                sections.math?.accuracy || 0,
                                sections.reading?.accuracy || 0,
                                sections.writing?.accuracy || 0
                            ],
                            backgroundColor: 'rgba(46, 204, 113, 0.2)',
                            borderColor: '#2ecc71',
                            pointBackgroundColor: '#2ecc71',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 100,
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                angleLines: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                pointLabels: {
                                    color: 'var(--text-primary)',
                                    font: {
                                        size: 12,
                                        weight: '600'
                                    }
                                },
                                ticks: {
                                    display: false,
                                    stepSize: 25
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }

            renderDoughnutChart() {
                const sections = this.stats.bySection;
                const ctx = document.getElementById('doughnutChart').getContext('2d');
                
                this.charts.doughnut = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Matemáticas', 'Lectura', 'Escritura'],
                        datasets: [{
                            data: [
                                sections.math?.total || 0,
                                sections.reading?.total || 0,
                                sections.writing?.total || 0
                            ],
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(16, 185, 129, 0.8)',
                                'rgba(245, 158, 11, 0.8)'
                            ],
                            borderColor: [
                                '#3b82f6',
                                '#10b981',
                                '#f59e0b'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: 'var(--text-primary)',
                                    padding: 20,
                                    usePointStyle: true
                                }
                            }
                        },
                        cutout: '60%'
                    }
                });
            }

            renderBarChart() {
                const sections = this.stats.bySection;
                const ctx = document.getElementById('barChart').getContext('2d');
                
                this.charts.bar = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Matemáticas', 'Lectura', 'Escritura'],
                        datasets: [{
                            label: 'Tiempo Promedio (seg)',
                            data: [
                                sections.math?.timeSpent / (sections.math?.total || 1) || 0,
                                sections.reading?.timeSpent / (sections.reading?.total || 1) || 0,
                                sections.writing?.timeSpent / (sections.writing?.total || 1) || 0
                            ],
                            backgroundColor: [
                                'rgba(59, 130, 246, 0.8)',
                                'rgba(16, 185, 129, 0.8)',
                                'rgba(245, 158, 11, 0.8)'
                            ],
                            borderColor: [
                                '#3b82f6',
                                '#10b981',
                                '#f59e0b'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: 'var(--text-secondary)'
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: 'var(--text-secondary)'
                                }
                            }
                        }
                    }
                });
            }

            renderInsights() {
                const container = document.getElementById('insights-container');
                const weakAreas = this.insights.weakAreas;
                const recommendations = this.insights.studyRecommendations;

                let insightsHTML = '';

                // Insight 1: Resumen de rendimiento
                insightsHTML += `
                    <div class="insight-card" style="border-color: #4a90e2;">
                        <h4>📈 Resumen de Rendimiento</h4>
                        <div class="insight-content">
                            <p>Tu precisión general es <strong>${this.performance.accuracy}%</strong>.</p>
                            <p>Has completado <strong>${this.stats.totalQuestions}</strong> preguntas en total.</p>
                            <p>Tiempo promedio por pregunta: <strong>${Math.round(this.performance.averageTime)}s</strong></p>
                        </div>
                    </div>
                `;

                // Insight 2: Áreas de enfoque
                if (weakAreas.length > 0) {
                    const topArea = weakAreas[0];
                    insightsHTML += `
                        <div class="insight-card" style="border-color: #e74c3c;">
                            <h4>🎯 Área Principal a Mejorar</h4