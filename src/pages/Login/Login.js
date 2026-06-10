import { loginUser } from '../../services/authService.js';
import { navigate } from '../../router.js';

const Login = () => `
    <div class="auth-page auth-login-page">
        <header class="auth-brand-header">
            <a href="#/" class="auth-brand" aria-label="Leeral Energie">
                <img src="assets/logos/logo.png" alt="" class="auth-logo">
                <span>LEERAL</span>
            </a>
        </header>

        <main class="auth-shell">
            <section class="auth-card" aria-labelledby="login-title">
                <div class="card-header">
                    <p class="auth-eyebrow">Espace client Senelec</p>
                    <h2 id="login-title">Bienvenue</h2>
                    <p>Connectez-vous pour gérer votre consommation</p>
                </div>

                <form id="loginForm" class="auth-form">
                    <div class="form-group">
                        <label for="email">Identifiant Email</label>
                        <div class="input-shell">
                            <span class="input-icon" aria-hidden="true">✉</span>
                            <input type="email" id="email" placeholder="nom@exemple.sn" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="label-row">
                            <label for="password">Mot de passe</label>
                            <a href="#/forgot-password" class="forgot-password-link">Mot de passe oublié ?</a>
                        </div>
                        <div class="input-shell">
                            <span class="input-icon" aria-hidden="true">⌕</span>
                            <input type="password" id="password" placeholder="••••••••" required>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary auth-submit">Se connecter</button>
                </form>

                <div class="auth-divider">
                    <span></span>
                    <p>ou</p>
                    <span></span>
                </div>

                <div class="card-footer">
                    <p>Nouveau sur Leeral Energie?</p>
                    <button type="button" class="btn-secondary" id="registerBtn">Créer un compte</button>
                </div>
            </section>
        </main>

        <footer class="auth-footer">
            <div class="auth-status">
                <span aria-hidden="true">⚡</span>
                <span>Système sécurisé</span>
            </div>
            <nav aria-label="Liens légaux">
                <a href="#">Confidentialité</a>
                <a href="#">Conditions</a>
            </nav>
        </footer>
    </div>
`;

const attachLoginEventListeners = () => {
    const loginForm = document.getElementById("loginForm");
    const registerBtn = document.getElementById("registerBtn");
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => navigate('/register'));
    }
    
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                await loginUser(email, password);
                navigate("/home");
            } catch (error) {
                alert(error.message); // Basic error handling
            }
        });
    }
};

// This function will be called after the page is rendered
Login.afterRender = attachLoginEventListeners;

export default Login;
