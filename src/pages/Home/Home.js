import store from '../../store/store.js';
import { logoutUser } from '../../services/authService.js';
import { navigate } from '../../router.js';

const Home = () => {
    const { currentUser } = store.getState();
    if (!currentUser) {
        navigate('/login');
        return '';
    }
    const displayName = currentUser.name || 'Client';

    return `
        <div class="home-page">
            <header class="home-topbar">
                <div id="home-logo">
                    <img src="../../../assets/logos/logo.png" alt="logo">
                </div>
                <div id="navbar-home">
                    <div><button>Accueil</button></div>
                    <div><button>Calculateur</button></div>
                    <div><button>Statistiques</button></div>
                    <div><button>Historique</button></div>
                    <div><button class="logout-mobile">Déconnexion</button></div>
                </div>
                <div id="icon-header">
                    <div><img src="../../../assets/icons/Icon-energie.svg" alt=""></div>
                    <div><img src="../../../assets/icons/Icon-notification.svg" alt=""></div>
                    <div><img src="../../../assets/icons/Icon-parametre.svg" alt=""></div>
                    <div><img src="../../../assets/icons/Icon-profile.png" alt=""></div>
                </div>
                <!-- Bouton hamburger pour mobile -->
                <button class="menu-toggle" aria-label="Menu">☰</button>
            </header>

            <main class="home-main">
                <section class="home-hero" aria-labelledby="home-title">
                    <h1>LEERAL - <span style="color:#FFD000">L'énergie</span> du </br>futur, aujourd'hui</h1>
                    <p>Optimisez votre consommation, anticipez vos coûts et gérez votre empreinte </br>énergétique.</p>
                    <div>
                        <img src="../../../assets/images/hero-home-page.png" alt="hero">
                    </div>
                </section>

                <section class="home-grid" aria-label="Vue énergétique">
                    <!-- Dynamic Energy Usage Card -->
                    <div id="EnergyUsageCard" class="home-card">
                        <div class="home-card-header">
                            <span class="home-card-title">Usage Énergétique Mensuel</span>
                            <span class="home-card-icon">⚡</span>
                        </div>
                        <div class="home-card-body">
                            <div class="home-card-main-val">124.5 <span class="home-card-unit">kWh</span></div>
                            <p class="home-card-desc">-8% par rapport au mois précédent</p>
                            <!-- Mini line/bar chart -->
                            <div class="home-mini-chart">
                                <div class="home-mini-bar" style="height: 35%;"></div>
                                <div class="home-mini-bar" style="height: 45%;"></div>
                                <div class="home-mini-bar" style="height: 30%;"></div>
                                <div class="home-mini-bar" style="height: 60%;"></div>
                                <div class="home-mini-bar" style="height: 75%;"></div>
                                <div class="home-mini-bar" style="height: 50%;"></div>
                                <div class="home-mini-bar" style="height: 90%;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Dynamic Grid Status Card -->
                    <div class="home-card">
                        <div class="home-card-header">
                            <span class="home-card-title">Statut Réseau</span>
                            <span class="home-card-badge-dot"></span>
                        </div>
                        <div class="home-card-body" style="display: flex; flex-direction: column; justify-content: flex-end; height: calc(100% - 20px);">
                            <div class="home-card-main-val" style="font-size: 1.5rem; color: #ffd000; margin-top: 10px;">220V STABLE</div>
                            <p class="home-card-desc" style="margin-top: 8px;">Fréquence : 50.1 Hz</p>
                            <p class="home-card-desc">Senelec : Opérationnel</p>
                        </div>
                    </div>

                    <!-- Dynamic Efficiency Metric Card -->
                    <div class="home-card">
                        <div class="home-card-header">
                            <span class="home-card-title">Efficacité Foyer</span>
                            <span class="home-card-icon">📈</span>
                        </div>
                        <div class="home-card-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: calc(100% - 20px);">
                            <div style="position: relative; width: 68px; height: 68px; display: flex; align-items: center; justify-content: center; margin-top: 5px;">
                                <svg width="68" height="68" style="transform: rotate(-90deg);">
                                    <circle cx="34" cy="34" r="28" stroke="rgba(255,255,255,0.03)" stroke-width="6" fill="transparent"/>
                                    <circle cx="34" cy="34" r="28" stroke="#38bdf8" stroke-width="6" fill="transparent" stroke-linecap="round" stroke-dasharray="175.9" stroke-dashoffset="14.0" style="filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.4));"/>
                                </svg>
                                <span style="position: absolute; font-size: 0.95rem; font-weight: 800; color: white;">92%</span>
                            </div>
                            <span style="font-size: 0.65rem; font-weight: 700; color: #38bdf8; letter-spacing: 0.5px; text-transform: uppercase; margin-top: 10px;">Optimisation Active</span>
                        </div>
                    </div>

                    <!-- Control Panel (Launch Calculator) -->
                    <div id="ControlPanel">
                        <p style="color: rgba(192, 198, 218, 1); margin: 0;">Prêt à optimiser ?</p>
                        <p style="color: rgba(192, 198, 218, 0.6); margin: 0;">Recevez des alertes en temps réel sur les pics de <br>consommation et gérez votre budget.</p>
                        <button>Lancer le Calculateur</button>
                    </div>
                </section>
            </main>
        </div>
    `;
};

const attachHomeEventListeners = () => {
    // Gestion du menu hamburger
    const toggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('#navbar-home');
    if (toggle && navbar) {
        toggle.addEventListener('click', () => {
            navbar.classList.toggle('open');
        });
    }

    // Gestion du bouton de déconnexion mobile
    const logoutMobile = document.querySelector('.logout-mobile');
    if (logoutMobile) {
        logoutMobile.addEventListener('click', () => {
            logoutUser();
            navigate('/login');
        });
    }

    // Navigation - Boutons de la navbar
    const navButtons = document.querySelectorAll('#navbar-home button');
    if (navButtons.length >= 4) {
        navButtons[0].addEventListener('click', () => navigate('/home'));  // Accueil
        navButtons[1].addEventListener('click', () => navigate('/calculator')); // Calculateur
        navButtons[2].addEventListener('click', () => navigate('/statistics')); // Statistiques
        navButtons[3].addEventListener('click', () => navigate('/history')); // Historique
        // navButtons[4] est le bouton Déconnexion déjà géré ci-dessus
    }

    // Navigation - Bouton Lancer le Calculateur
    const launchCalculatorBtn = document.querySelector('#ControlPanel button');
    if (launchCalculatorBtn) {
        launchCalculatorBtn.addEventListener('click', () => navigate('/calculator'));
    }
};

Home.afterRender = attachHomeEventListeners;

export default Home;