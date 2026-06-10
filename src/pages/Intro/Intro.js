import { navigate } from '../../router.js';
import store from '../../store/store.js';

function IntroPage() {
  return `
    <div class="intro-container">
      <header class="intro-header">
        <a href="#/" class="intro-brand" aria-label="Leeral Energie">
          <img src="assets/logos/logo.png" alt="" class="intro-logo">
        </a>
        <button id="intro-login-btn" class="btn-outline" type="button">Connexion</button>
      </header>

      <main class="intro-main">
        <section class="intro-content" aria-labelledby="intro-title">
          <div class="intro-kicker">LEERAL</div> 
          <div class="intro-kicker" style="color: #FFD000;">ENERGIE</div>
          <h1 id="intro-title" class="main-title">
            <div>Calculez votre facture Senelec</div><div style="color: #FFD000;">en quelques secondes</div>
          </h1>
          <button id="intro-calc-btn" class="btn-primary btn-large" type="button">
            Calculer ma facture
          </button>
        </section>

        <div class="intro-visual" aria-hidden="true">
          <img src="assets/images/hero.svg" alt="">
        </div>
      </main>

      <footer class="intro-footer">
        <div class="intro-socials" aria-label="Réseaux sociaux">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="X">𝕏</a>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Instagram">◎</a>
        </div>
        <p>Copyright © 2026. All rights reserved.</p>
      </footer>
    </div>
  `;
}

// Hook appelé par le routeur après injection du HTML
IntroPage.afterRender = () => {
  const loginBtn = document.getElementById('intro-login-btn');
  const calcBtn = document.getElementById('intro-calc-btn');

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      navigate('/login');
    });
  }

  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      // Vérifie l'état d'authentification via le store global
      if (store.getState().isAuthenticated) {
        navigate('/calculator');
      } else {
        navigate('/login');
      }
    });
  }
};


export default IntroPage;
