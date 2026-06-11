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
          <a href="#" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.413c0-3.1 1.894-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.311h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z"/>
            </svg>
          </a>
          <a href="#" aria-label="X">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.607 1.794-1.566 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .386.044.762.128 1.124-4.087-.205-7.713-2.165-10.141-5.144-.424.727-.666 1.571-.666 2.475 0 1.708.869 3.215 2.188 4.099-.807-.026-1.566-.248-2.229-.616v.062c0 2.386 1.698 4.374 3.946 4.823-.413.111-.849.171-1.296.171-.317 0-.626-.031-.927-.089.627 1.956 2.445 3.376 4.6 3.415-1.68 1.319-3.809 2.107-6.115 2.107-.398 0-.79-.023-1.176-.069 2.179 1.397 4.768 2.212 7.557 2.212 9.054 0 14.001-7.496 14.001-13.986 0-.213-.005-.425-.014-.637.962-.693 1.8-1.562 2.46-2.549z"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.23 0H1.77C.792 0 0 .775 0 1.732v20.535C0 23.225.792 24 1.77 24h20.46c.978 0 1.77-.775 1.77-1.733V1.732C24 .775 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633c-1.14 0-2.065-.936-2.065-2.09 0-1.152.925-2.089 2.065-2.089 1.14 0 2.066.937 2.066 2.09 0 1.154-.926 2.09-2.066 2.09zm15.113 12.819h-3.557v-5.568c0-1.327-.025-3.037-1.852-3.037-1.853 0-2.137 1.447-2.137 2.939v5.666h-3.557V9h3.414v1.562h.05c.476-.9 1.637-1.85 3.368-1.85 3.603 0 4.268 2.371 4.268 5.454v6.286z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.352 3.608 1.327.975.975 1.265 2.242 1.327 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.352 2.633-1.327 3.608-.975.975-2.242 1.265-3.608 1.327-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.352-3.608-1.327-.975-.975-1.265-2.242-1.327-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.352-2.633 1.327-3.608.975-.975 2.242-1.265 3.608-1.327C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.736 0 8.332.014 7.052.072 5.77.131 4.723.418 3.885 1.257c-.839.839-1.126 1.886-1.185 3.168C2.014 5.668 2 6.072 2 9.336v5.328c0 3.264.014 3.668.072 4.948.059 1.282.346 2.329 1.185 3.168.839.839 1.886 1.126 3.168 1.185 1.28.058 1.684.072 4.948.072s3.668-.014 4.948-.072c1.282-.059 2.329-.346 3.168-1.185.839-.839 1.126-1.886 1.185-3.168.058-1.28.072-1.684.072-4.948V9.336c0-3.264-.014-3.668-.072-4.948-.059-1.282-.346-2.329-1.185-3.168-.839-.839-1.886-1.126-3.168-1.185C15.668.014 15.264 0 12 0z"/>
              <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z"/>
              <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
          </a>
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
