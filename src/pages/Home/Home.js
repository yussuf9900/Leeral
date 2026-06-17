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
                    <div id="EnergyUsageCard"><img src="../../../assets/images/EnergyUsageCard.png" alt="Consommation"></div>
                    <div><img src="../../../assets/images/GridStatusCard.png" alt="status Consommation"></div>
                    <div><img src="../../../assets/images/EfficiencyMetric.png" alt=""></div>
                    <div id="ControlPanel">
                        <p style="color: rgba(192, 198, 218, 1);">Prêt à optimiser ?</p>
                        <p style="color: rgba(192, 198, 218, 0.6);">Recevez des alertes en temps réel sur les pics de <br>consommation et gérez votre budget.</p>
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
};

Home.afterRender = attachHomeEventListeners;

export default Home;