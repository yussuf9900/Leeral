import store from '../../store/store.js';
import { getBills } from '../../services/billService.js';
import { logoutUser } from '../../services/authService.js';
import { navigate } from '../../router.js';

const Statistics = () => {
    const { currentUser } = store.getState();
    if (!currentUser) {
        navigate('/login');
        return '';
    }

    // Default hourly flow heights (hump shape)
    const hourlyFlowHeights = [
        25, 20, 18, 15, 22, 38, 62, 85, 78, 65, 58, 52,
        48, 46, 50, 68, 75, 82, 70, 60, 55, 50, 42, 35
    ];

    const hourlyBarsHtml = hourlyFlowHeights.map((height, i) => `
        <div class="stats-flux-bar-wrapper">
            <div class="stats-flux-bar" style="height: ${height}%;" data-base-height="${height}" title="Heure ${i}h: ${height}% charge"></div>
        </div>
    `).join('');

    return `
        <div id="calculator-page">
            <!-- Header Topbar (Shared Layout) -->
            <header class="calc-topbar">
                <div class="calc-logo">
                    <img src="assets/logos/logo.png" alt="Leeral Logo" onerror="this.src='../../../assets/logos/logo.png'">
                    <span>LEERAL ENERGY</span>
                </div>
                <div class="calc-header-icons">
                    <button class="calc-icon-btn" aria-label="Énergie">
                        <img src="assets/icons/Icon-energie.svg" alt="Énergie" onerror="this.src='../../../assets/icons/Icon-energie.svg'">
                    </button>
                    <button class="calc-icon-btn" aria-label="Notifications">
                        <img src="assets/icons/Icon-notification.svg" alt="Notifications" onerror="this.src='../../../assets/icons/Icon-notification.svg'">
                    </button>
                    <button class="calc-icon-btn" aria-label="Paramètres">
                        <img src="assets/icons/Icon-parametre.svg" alt="Paramètres" onerror="this.src='../../../assets/icons/Icon-parametre.svg'">
                    </button>
                    <img class="calc-profile-avatar" src="assets/icons/Icon-profile.png" alt="Profile" onerror="this.src='../../../assets/icons/Icon-profile.png'">
                </div>
                <!-- Burger menu for mobile -->
                <button class="calc-menu-toggle" aria-label="Menu">☰</button>
            </header>

            <div class="calc-layout">
                <!-- Sidebar Left (Shared Layout) -->
                <div class="calc-sidebar-wrapper">
                    <nav class="calc-nav">
                        <button class="calc-nav-item nav-home">
                            <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                            Accueil
                        </button>
                        <button class="calc-nav-item nav-calculator">
                            <svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                            Calculateur
                        </button>
                        <button class="calc-nav-item nav-statistics active">
                            <svg viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zM16.2 13H19v6h-2.8z"/></svg>
                            Statistiques
                        </button>
                        <button class="calc-nav-item nav-history">
                            <svg viewBox="0 0 24 24"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 1 1 7 7 6.88 6.88 0 0 1-4.7-1.85l-1.42 1.43A8.93 8.93 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/></svg>
                            Historique
                        </button>
                    </nav>
                    <div class="calc-logout-container">
                        <button class="calc-logout-btn nav-logout">Déconnexion</button>
                    </div>
                </div>

                <!-- Main Content Area -->
                <main class="calc-content-area">
                    <h1 class="calc-title">Statistiques Énergétiques</h1>
                    <p class="calc-subtitle">Analyse en temps réel des flux de puissance et optimisation prédictive du réseau.</p>

                    <!-- Upper Grid (3 Cards) -->
                    <div class="stats-top-grid">
                        <!-- Card 1: Consommation Actuelle -->
                        <div class="calc-card">
                            <div class="stats-card-label-row">
                                <span>Consommation Actuelle</span>
                                <span class="stats-card-icon yellow">
                                    <svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                                </span>
                            </div>
                            <div class="stats-card-value">
                                <span id="stats-curr-cons">42.8</span>
                                <span style="font-size: 1.15rem; font-weight: 700; color: var(--text-secondary);">kWh</span>
                            </div>
                            <div class="stats-card-subtext highlighted" id="stats-curr-diff">+4.2% par rapport à l'heure précédente</div>
                        </div>

                        <!-- Card 2: Prévision Mensuelle -->
                        <div class="calc-card">
                            <div class="stats-card-label-row">
                                <span>Prévision Mensuelle</span>
                                <span class="stats-card-icon blue">
                                    <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
                                </span>
                            </div>
                            <div class="stats-card-value">
                                <span id="stats-prev-cost">1,240</span>
                                <span style="font-size: 1.15rem; font-weight: 700; color: var(--text-secondary);">FCFA</span>
                            </div>
                            <div class="stats-card-subtext">
                                <span class="stats-card-badge">OPTIMISÉ</span>
                                <span>Réduction de 12% prévue</span>
                            </div>
                        </div>

                        <!-- Card 3: Alertes Actives -->
                        <div class="calc-card">
                            <div class="stats-card-label-row">
                                <span>Alertes Actives</span>
                                <span class="stats-card-icon red">
                                    <svg viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/></svg>
                                </span>
                            </div>
                            <div class="stats-card-value" style="color: var(--stats-alert);" id="stats-alert-val">03</div>
                            <ul class="stats-alert-list" id="stats-alert-list-el">
                                <li class="stats-alert-item">
                                    <span class="stats-alert-bullet"></span>
                                    Surcharge Node-B7
                                </li>
                                <li class="stats-alert-item">
                                    <span class="stats-alert-bullet"></span>
                                    Maintenance planifiée à 04:00
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- Middle Card: Flux Energétique -->
                    <div class="calc-card stats-flux-card">
                        <div class="stats-flux-header">
                            <div class="stats-flux-title-area">
                                <h2 class="stats-flux-title">Flux Énergétique (28 jours)</h2>
                                <p class="stats-flux-subtitle">Distribution holographique de la charge réseau par heure.</p>
                            </div>
                            <div class="stats-flux-toggles">
                                <button type="button" class="stats-flux-toggle-btn active" id="toggle-realtime">TEMPS RÉEL</button>
                                <button type="button" class="stats-flux-toggle-btn" id="toggle-history">HISTORIQUE</button>
                            </div>
                        </div>

                        <!-- 24 vertical bars -->
                        <div class="stats-flux-chart" id="stats-bars-container">
                            ${hourlyBarsHtml}
                        </div>
                        
                        <!-- Labels -->
                        <div class="stats-flux-labels">
                            <span class="stats-flux-label">00:00</span>
                            <span class="stats-flux-label">06:00</span>
                            <span class="stats-flux-label">12:00</span>
                            <span class="stats-flux-label">18:00</span>
                            <span class="stats-flux-label">23:59</span>
                        </div>
                    </div>

                    <!-- Bottom Grid (2 Columns) -->
                    <div class="stats-bottom-grid">
                        <!-- Gauges Card -->
                        <div class="calc-card">
                            <div class="stats-rings-container">
                                <!-- Ring 1: Score -->
                                <div class="stats-ring-wrapper">
                                    <div class="stats-ring">
                                        <svg class="ring-svg" width="140" height="140">
                                            <circle class="ring-bg-circle" cx="70" cy="70" r="54" stroke-width="10" fill="transparent"/>
                                            <!-- 84 Score: dasharray = 339.3. dashoffset = 339.3 * (1 - 0.84) = 54.3 -->
                                            <circle class="ring-fg-circle" id="stats-score-circle" cx="70" cy="70" r="54" stroke="var(--stats-yellow)" stroke-width="10" fill="transparent" stroke-linecap="round" stroke-dasharray="339.3" stroke-dashoffset="54.3" style="filter: drop-shadow(0 0 5px var(--stats-yellow-glow));"/>
                                        </svg>
                                        <div class="stats-ring-text">
                                            <span class="stats-ring-number" id="stats-score-num">84</span>
                                            <span class="stats-ring-label">SCORE ÉNERGIE</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Ring 2: Efficacité -->
                                <div class="stats-ring-wrapper">
                                    <div class="stats-ring">
                                        <svg class="ring-svg" width="140" height="140">
                                            <circle class="ring-bg-circle" cx="70" cy="70" r="54" stroke-width="10" fill="transparent"/>
                                            <!-- 92% Efficacité: dashoffset = 339.3 * (1 - 0.92) = 27.1 -->
                                            <circle class="ring-fg-circle" id="stats-eff-circle" cx="70" cy="70" r="54" stroke="var(--stats-blue)" stroke-width="10" fill="transparent" stroke-linecap="round" stroke-dasharray="339.3" stroke-dashoffset="27.1" style="filter: drop-shadow(0 0 5px var(--stats-blue-glow));"/>
                                        </svg>
                                        <div class="stats-ring-text">
                                            <span class="stats-ring-number" id="stats-eff-num">92%</span>
                                            <span class="stats-ring-label">EFFICACITÉ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Insights Card -->
                        <div class="calc-card">
                            <h2 class="stats-insights-title">Insights</h2>
                            <div class="stats-insights-list">
                                <!-- Insight 1 -->
                                <div class="stats-insight-item">
                                    <span class="stats-insight-icon indigo">
                                        <svg viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </span>
                                    <div class="stats-insight-content">
                                        <h3 class="stats-insight-title-text">Optimisation de la Charge</h3>
                                        <p class="stats-insight-desc">Déplacez les cycles de lavage à 01:00 pour économiser 4,20€/nuit.</p>
                                    </div>
                                </div>

                                <!-- Insight 2 -->
                                <div class="stats-insight-item">
                                    <span class="stats-insight-icon cyan">
                                        <svg viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2" />
                                        </svg>
                                    </span>
                                    <div class="stats-insight-content">
                                        <h3 class="stats-insight-title-text">Gestion thermique</h3>
                                        <p class="stats-insight-desc">L'isolation du Node-C semble faiblir. Pertes estimées : 3%.</p>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="stats-report-btn" id="generate-report-btn">Générer un rapport détaillé</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
};

const attachStatisticsEventListeners = async () => {
    // Navigation Hamburguer menu for Mobile
    const toggle = document.querySelector('.calc-menu-toggle');
    const sidebar = document.querySelector('.calc-sidebar-wrapper');
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Sidebar navigation clicks
    const homeBtn = document.querySelector('.nav-home');
    const calculatorBtn = document.querySelector('.nav-calculator');
    const statisticsBtn = document.querySelector('.nav-statistics');
    const historyBtn = document.querySelector('.nav-history');
    const logoutBtn = document.querySelector('.nav-logout');

    if (homeBtn) homeBtn.addEventListener('click', () => navigate('/home'));
    if (calculatorBtn) calculatorBtn.addEventListener('click', () => navigate('/calculator'));
    if (statisticsBtn) statisticsBtn.addEventListener('click', () => navigate('/statistics'));
    if (historyBtn) historyBtn.addEventListener('click', () => navigate('/history'));
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutUser();
            navigate('/login');
        });
    }

    // Dynamic data loading from IndexedDB
    const currConsEl = document.getElementById('stats-curr-cons');
    const currDiffEl = document.getElementById('stats-curr-diff');
    const prevCostEl = document.getElementById('stats-prev-cost');
    const scoreNumEl = document.getElementById('stats-score-num');
    const scoreCircleEl = document.getElementById('stats-score-circle');
    const alertValEl = document.getElementById('stats-alert-val');
    const alertListEl = document.getElementById('stats-alert-list-el');

    try {
        const bills = await getBills();
        if (bills && bills.length > 0) {
            // Newest bill represents our current cycle values
            const newestBill = bills[bills.length - 1];

            // 1. Current Consumption: hourly rate proportional to last recorded consumption
            const hourlyConsumption = (newestBill.consumption / 720).toFixed(1); // 720 hours in month
            currConsEl.textContent = hourlyConsumption;
            
            // Adjust difference label
            const diffPct = ((newestBill.consumption % 15) / 3).toFixed(1);
            currDiffEl.textContent = `+${diffPct}% par rapport à l'heure précédente`;

            // 2. Forecast based on newest dynamic bill cost
            const nextForecast = Math.round(newestBill.finalAmount);
            prevCostEl.textContent = nextForecast.toLocaleString();

            // 3. Score ring based on average monthly consumption
            const totalCons = bills.reduce((sum, b) => sum + b.consumption, 0);
            const avgCons = totalCons / bills.length;
            
            // A higher average consumption reduces the score
            const calculatedScore = Math.max(45, Math.min(99, Math.round(100 - (avgCons / 12))));
            scoreNumEl.textContent = calculatedScore;
            
            // Recalculate SVG offset
            const offset = 339.3 * (1 - calculatedScore / 100);
            scoreCircleEl.setAttribute('stroke-dashoffset', offset);

            // 4. Alerts: if consumption exceeds 250 kWh, add a warning peak alert!
            if (newestBill.consumption > 250) {
                alertValEl.textContent = '03';
                alertListEl.innerHTML = `
                    <li class="stats-alert-item">
                        <span class="stats-alert-bullet" style="background-color: #f87171;"></span>
                        Surcharge Node-B7
                    </li>
                    <li class="stats-alert-item">
                        <span class="stats-alert-bullet" style="background-color: #ffd000;"></span>
                        Pic détecté (${newestBill.consumption} kWh)
                    </li>
                `;
            } else {
                alertValEl.textContent = '01';
                alertListEl.innerHTML = `
                    <li class="stats-alert-item">
                        <span class="stats-alert-bullet" style="background-color: #10b981;"></span>
                        Aucune alerte critique
                    </li>
                `;
            }

            // 5. Scale hourly flow bars dynamically based on user consumption
            const scaleFactor = Math.min(1.3, Math.max(0.6, newestBill.consumption / 300));
            document.querySelectorAll('.stats-flux-bar').forEach(bar => {
                const baseHeight = parseFloat(bar.dataset.baseHeight);
                if (baseHeight) {
                    bar.style.height = `${Math.min(95, baseHeight * scaleFactor)}%`;
                }
            });
        }
    } catch (error) {
        console.error("Error populating dynamic statistics:", error);
    }

    // Toggles for Real-time vs History power flow
    const toggleRealtime = document.getElementById('toggle-realtime');
    const toggleHistory = document.getElementById('toggle-history');
    
    if (toggleRealtime && toggleHistory) {
        toggleRealtime.addEventListener('click', () => {
            toggleRealtime.classList.add('active');
            toggleHistory.classList.remove('active');
        });
        
        toggleHistory.addEventListener('click', () => {
            toggleHistory.classList.add('active');
            toggleRealtime.classList.remove('active');
        });
    }

    // Report generation
    const reportBtn = document.getElementById('generate-report-btn');
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            // Import showModal dynamically or check local context
            import('../../utils/modal.js').then(module => {
                module.showModal('Génération de Rapport', `
                    <p>Votre rapport énergétique complet est en cours d'assemblage...</p>
                    <div style="margin-top: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); padding: 16px;">
                        <p><strong>Foyer :</strong> ${currentUser.name || 'Client'}</p>
                        <p><strong>Période :</strong> 28 Derniers Jours</p>
                        <p style="color: #ffd000; font-weight: 700; margin-top: 10px;">➔ Téléchargement démarré dans un nouvel onglet.</p>
                    </div>
                `);
            });
        });
    }
};

Statistics.afterRender = attachStatisticsEventListeners;

export default Statistics;
