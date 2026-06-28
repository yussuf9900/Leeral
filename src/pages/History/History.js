import store from '../../store/store.js';
import { getBills } from '../../services/billService.js';
import { logoutUser } from '../../services/authService.js';
import { navigate } from '../../router.js';
import { showModal } from '../../utils/modal.js';

const History = () => {
    const { currentUser } = store.getState();
    if (!currentUser) {
        navigate('/login');
        return '';
    }

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
                        <button class="calc-nav-item nav-statistics">
                            <svg viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zM16.2 13H19v6h-2.8z"/></svg>
                            Statistiques
                        </button>
                        <button class="calc-nav-item nav-history active">
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
                    <div class="hist-header-row">
                        <h1 class="calc-title" style="margin-bottom: 0;">Historique de Consommation</h1>
                        <div class="hist-live-badge">
                            <span class="hist-live-dot"></span>
                            EN DIRECT
                        </div>
                    </div>

                    <!-- History Stack Card List -->
                    <div class="hist-list" id="history-container">
                        <!-- IndexedDB Saved Bills will load here dynamically -->

                        <!-- Static Mock Bills (Match Screenshot Layout) -->
                        <!-- Card 1: Active -->
                        <div class="hist-card active">
                            <div class="hist-card-row1">
                                <div class="hist-card-meta">
                                    <span class="hist-card-date">Octobre 2024</span>
                                    <h2 class="hist-card-title">Cycle de Facturation Actuel</h2>
                                </div>
                                <div class="hist-card-cost-area">
                                    <span class="hist-card-cost-label">Coût Total</span>
                                    <span class="hist-card-cost-value">48,500 FCFA</span>
                                </div>
                            </div>
                            <div class="hist-card-row2">
                                <div class="hist-card-details">
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Tension Crête</span>
                                        <span class="hist-detail-value">242.1 V</span>
                                        <span class="hist-detail-icon">
                                            <svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                                        </span>
                                    </div>
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Énergie Utilisée</span>
                                        <span class="hist-detail-value">1,240 kWh</span>
                                        <span class="hist-detail-icon">
                                            <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
                                        </span>
                                    </div>
                                </div>
                                <button type="button" class="hist-action-btn active btn-detail" data-month="Octobre" data-cost="48,500" data-kwh="1,240">Voir le détail</button>
                            </div>
                        </div>

                        <!-- Card 2: Archived -->
                        <div class="hist-card">
                            <div class="hist-card-row1">
                                <div class="hist-card-meta">
                                    <span class="hist-card-date">Septembre 2024</span>
                                    <h2 class="hist-card-title">Facturation Terminée</h2>
                                </div>
                                <div class="hist-card-cost-area">
                                    <span class="hist-card-cost-label">Coût Total</span>
                                    <span class="hist-card-cost-value">51,150 FCFA</span>
                                </div>
                            </div>
                            <div class="hist-card-row2">
                                <div class="hist-card-details">
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Tension Crête</span>
                                        <span class="hist-detail-value">239.8 V</span>
                                        <span class="hist-detail-icon">
                                            <svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                                        </span>
                                    </div>
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Énergie Utilisée</span>
                                        <span class="hist-detail-value">1,315 kWh</span>
                                        <span class="hist-detail-icon">
                                            <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
                                        </span>
                                    </div>
                                </div>
                                <button type="button" class="hist-action-btn archived btn-archived" data-month="Septembre">Rapport Archivé</button>
                            </div>
                        </div>

                        <!-- Card 3: Archived -->
                        <div class="hist-card">
                            <div class="hist-card-row1">
                                <div class="hist-card-meta">
                                    <span class="hist-card-date">Août 2024</span>
                                    <h2 class="hist-card-title">Facturation Terminée</h2>
                                </div>
                                <div class="hist-card-cost-area">
                                    <span class="hist-card-cost-label">Coût Total</span>
                                    <span class="hist-card-cost-value">43,500 FCFA</span>
                                </div>
                            </div>
                            <div class="hist-card-row2">
                                <div class="hist-card-details">
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Tension Crête</span>
                                        <span class="hist-detail-value">241.2 V</span>
                                        <span class="hist-detail-icon">
                                            <svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                                        </span>
                                    </div>
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Énergie Utilisée</span>
                                        <span class="hist-detail-value">1,098 kWh</span>
                                        <span class="hist-detail-icon">
                                            <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
                                        </span>
                                    </div>
                                </div>
                                <button type="button" class="hist-action-btn archived btn-archived" data-month="Août">Rapport Archivé</button>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Chart Card -->
                    <div class="calc-card">
                        <div class="hist-chart-header-row">
                            <div class="hist-chart-title-area">
                                <h2 class="hist-chart-title">Analyse de la Vélocité Énergétique</h2>
                                <p class="hist-chart-subtitle">Performance trimestrielle du réseau vs consommation node</p>
                            </div>
                            <div class="hist-chart-legend">
                                <div class="hist-legend-item">
                                    <span class="hist-legend-dot consumption"></span>
                                    Consommation
                                </div>
                                <div class="hist-legend-item">
                                    <span class="hist-legend-dot sector"></span>
                                    Moyenne Secteur
                                </div>
                            </div>
                        </div>

                        <!-- Velocity Double Bar Chart -->
                        <div class="hist-chart-container">
                            <!-- AOÛT -->
                            <div class="hist-chart-col">
                                <div class="hist-bars-group">
                                    <div class="hist-bar-user" style="height: 52%;" title="Foyer : 1,098 kWh"></div>
                                    <div class="hist-bar-sector" style="style-height; height: 68%;" title="Secteur : 1,220 kWh"></div>
                                </div>
                                <span class="hist-chart-label">AOÛT</span>
                            </div>

                            <!-- SEPT -->
                            <div class="hist-chart-col">
                                <div class="hist-bars-group">
                                    <div class="hist-bar-user" style="height: 80%;" title="Foyer : 1,315 kWh"></div>
                                    <div class="hist-bar-sector" style="height: 72%;" title="Secteur : 1,280 kWh"></div>
                                </div>
                                <span class="hist-chart-label">SEPT</span>
                            </div>

                            <!-- OCT -->
                            <div class="hist-chart-col active">
                                <div class="hist-bars-group">
                                    <span class="hist-bar-value" style="--bar-height: 88%">1240</span>
                                    <div class="hist-bar-user highlighted" style="height: 88%;" title="Foyer : 1,240 kWh"></div>
                                    <div class="hist-bar-sector" style="height: 60%;" title="Secteur : 1,180 kWh"></div>
                                </div>
                                <span class="hist-chart-label">OCT</span>
                            </div>

                            <!-- NOV (EST.) -->
                            <div class="hist-chart-col">
                                <div class="hist-bars-group">
                                    <div class="hist-bar-user" style="height: 38%;" title="Foyer : 850 kWh (est)"></div>
                                    <div class="hist-bar-sector" style="height: 54%;" title="Secteur : 1,100 kWh"></div>
                                </div>
                                <span class="hist-chart-label">NOV (EST.)</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
};

const attachHistoryEventListeners = async () => {
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

    // Dynamic Loading of saved calculations from IndexedDB
    const historyContainer = document.getElementById('history-container');
    if (historyContainer) {
        try {
            const savedBills = await getBills();
            if (savedBills && savedBills.length > 0) {
                // Reverse list to show the newest saved calculations first
                const billsHtml = savedBills.reverse().map(bill => {
                    const formattedDate = new Date(bill.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    return `
                        <!-- Saved dynamic bill card -->
                        <div class="hist-card active" style="border-left-color: #38bdf8;">
                            <div class="hist-card-row1">
                                <div class="hist-card-meta">
                                    <span class="hist-card-date" style="color: #38bdf8;">Estimation du ${formattedDate}</span>
                                    <h2 class="hist-card-title">Calculateur (${bill.tariffType})</h2>
                                </div>
                                <div class="hist-card-cost-area">
                                    <span class="hist-card-cost-label">Total Facturé</span>
                                    <span class="hist-card-cost-value" style="color: #38bdf8;">${bill.finalAmount.toLocaleString()} FCFA</span>
                                </div>
                            </div>
                            <div class="hist-card-row2">
                                <div class="hist-card-details">
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Tension Estimée</span>
                                        <span class="hist-detail-value">240.0 V</span>
                                        <span class="hist-detail-icon" style="color: #38bdf8;">
                                            <svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
                                        </span>
                                    </div>
                                    <div class="hist-detail-box">
                                        <span class="hist-detail-label">Consommation</span>
                                        <span class="hist-detail-value">${bill.consumption.toLocaleString()} kWh</span>
                                        <span class="hist-detail-icon" style="color: #38bdf8;">
                                            <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
                                        </span>
                                    </div>
                                </div>
                                <button type="button" class="hist-action-btn active btn-detail-saved" data-cost="${bill.finalAmount.toLocaleString()}" data-kwh="${bill.consumption}" data-tva="${bill.tva}" data-redevance="${bill.redevance}" style="background-color: #38bdf8;">Voir le détail</button>
                            </div>
                        </div>
                    `;
                }).join('');

                // Prepend saved bills before static mock history cards
                historyContainer.insertAdjacentHTML('afterbegin', billsHtml);
            }
        } catch (error) {
            console.error("Error loading IndexedDB bills in history page:", error);
        }
    }

    // Attach click alerts to action buttons
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', (e) => {
            const month = e.target.dataset.month;
            const cost = e.target.dataset.cost;
            const kwh = e.target.dataset.kwh;
            showModal(`Détails du cycle - ${month}`, `
                <p><strong>Période :</strong> ${month} 2024</p>
                <p><strong>Consommation :</strong> ${kwh} kWh</p>
                <p><strong>Montant Énergétique :</strong> ${cost}</p>
                <p><strong>Statut de Facturation :</strong> <span style="color: #ffd000; font-weight: 700;">En cours</span></p>
                <p style="color: #9ca3af; font-size: 0.85rem; margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px;">Ce rapport affiche les données collectées en temps réel.</p>
            `);
        });
    });

    document.querySelectorAll('.btn-detail-saved').forEach(button => {
        button.addEventListener('click', (e) => {
            const cost = e.target.dataset.cost;
            const kwh = e.target.dataset.kwh;
            const tva = e.target.dataset.tva;
            const redevance = e.target.dataset.redevance;
            showModal(`Détails de l'Estimation`, `
                <p><strong>Type de Facturation :</strong> Domestique Petite Puissance (DPP)</p>
                <p><strong>Consommation Totale :</strong> ${kwh} kWh</p>
                <p><strong>TVA (18%) :</strong> ${parseFloat(tva).toLocaleString()} FCFA</p>
                <p><strong>Redevance Électricité :</strong> ${parseFloat(redevance).toLocaleString()} FCFA</p>
                <p><strong>Montant Final (TTC) :</strong> <strong style="color: #ffd000; font-size: 1.1rem;">${cost} FCFA</strong></p>
            `);
        });
    });

    document.querySelectorAll('.btn-archived').forEach(button => {
        button.addEventListener('click', (e) => {
            const month = e.target.dataset.month;
            showModal(`Rapport Archivé - ${month}`, `
                <p>Chargement du fichier PDF archivé pour le cycle de <strong>${month} 2024</strong>...</p>
                <div style="display: flex; align-items: center; justify-content: center; padding: 20px; margin-top: 15px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.08);">
                    <span style="color: #ffd000; font-size: 1.5rem; margin-right: 12px;">📁</span>
                    <span>leeral_rapport_${month.toLowerCase()}_2024.pdf</span>
                </div>
            `);
        });
    });
};

History.afterRender = attachHistoryEventListeners;

export default History;
