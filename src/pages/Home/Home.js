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
                <a href="#/home" class="home-brand" aria-label="Leeral Energie">
                    <img src="assets/logos/logo.png" alt="" class="home-logo">
                    <span>LEERAL</span>
                </a>

                <nav class="home-nav" aria-label="Navigation principale">
                    <a href="#/home" class="active">Accueil</a>
                    <a href="#/calculator">Calculateur</a>
                    <a href="#/statistics">Statistiques</a>
                    <a href="#/history">Historique</a>
                </nav>

                <div class="home-actions">
                    <button type="button" class="icon-button" aria-label="Notifications">⌁</button>
                    <button type="button" class="icon-button" aria-label="Paramètres">⚙</button>
                    <button type="button" class="avatar-button" aria-label="Profil utilisateur">
                        ${displayName.charAt(0).toUpperCase()}
                    </button>
                    <button id="logoutBtn" type="button" class="logout-button">Déconnexion</button>
                </div>
            </header>

            <main class="home-main">
                <section class="home-hero" aria-labelledby="home-title">
                    <div class="home-hero-copy">
                        <p class="home-kicker">Chief Energy Engineer Profile</p>
                        <h1 id="home-title">LEERAL - L'énergie du futur, aujourd'hui</h1>
                        <p>
                            Optimisez votre consommation, anticipez vos coûts et gérez votre empreinte énergétique.
                        </p>
                    </div>

                    <div class="meter-stage" aria-hidden="true">
                        <div class="meter-orbit orbit-one"></div>
                        <div class="meter-orbit orbit-two"></div>
                        <div class="smart-meter">
                            <div class="meter-glow"></div>
                            <div class="meter-screen">
                                <span>Consommation</span>
                                <strong>12.5 kWh</strong>
                            </div>
                            <div class="meter-dial">
                                <span></span>
                            </div>
                        </div>

                        <div class="energy-float energy-float-left">
                            <span>⚡</span>
                            <div>
                                <strong>2.4 kW</strong>
                                <small>Puissance active</small>
                            </div>
                        </div>

                        <div class="energy-float energy-float-right">
                            <span>◌</span>
                            <div>
                                <strong>89%</strong>
                                <small>Rendement foyer</small>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="home-grid" aria-label="Vue énergétique">
                    <article class="bento-card usage-card">
                        <div class="bento-card-header">
                            <div>
                                <h3>Energy Usage</h3>
                                <p>Suivi intelligent de vos pics journaliers</p>
                            </div>
                            <span class="trend-pill">+12%</span>
                        </div>
                        <div class="usage-value">
                            <strong>342 kWh</strong>
                            <span>ce mois-ci</span>
                        </div>
                        <div class="bar-chart" aria-hidden="true">
                            <span style="--height: 42%"></span>
                            <span style="--height: 66%"></span>
                            <span style="--height: 48%"></span>
                            <span style="--height: 82%"></span>
                            <span style="--height: 55%"></span>
                            <span style="--height: 74%"></span>
                            <span style="--height: 62%"></span>
                        </div>
                        <div class="card-actions">
                            <button id="home-calc-btn" type="button" class="btn-primary">Calculer</button>
                            <a href="#/statistics" class="ghost-link">Voir les stats</a>
                        </div>
                    </article>

                    <article class="bento-card grid-status-card">
                        <div class="status-icon">⌁</div>
                        <h3>État du Réseau</h3>
                        <p>Secteur 7G - Dakar Plateau</p>
                        <div class="network-meter">
                            <span></span>
                        </div>
                        <div class="network-stats">
                            <div>
                                <strong>Stable</strong>
                                <span>Réseau</span>
                            </div>
                            <div>
                                <strong>230V</strong>
                                <span>Tension</span>
                            </div>
                        </div>
                    </article>

                    <article class="bento-card efficiency-card">
                        <h4>Efficacité</h4>
                        <strong>89%</strong>
                        <p>Efficacité de votre foyer par rapport à la moyenne</p>
                    </article>

                    <article class="bento-card control-card">
                        <div class="control-icon">✦</div>
                        <h3>Prêt à optimiser ?</h3>
                        <p>Simulez votre prochaine facture et trouvez les meilleurs leviers d'économie.</p>
                        <a href="#/calculator" class="btn-primary control-link">Lancer le calculateur</a>
                    </article>
                </section>
            </main>
        </div>
    `;
};

const attachHomeEventListeners = () => {
    const logoutBtn = document.getElementById('logoutBtn');
    const calcBtn = document.getElementById('home-calc-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutUser();
            navigate('/login');
        });
    }

    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            navigate('/calculator');
        });
    }
};

Home.afterRender = attachHomeEventListeners;

export default Home;
