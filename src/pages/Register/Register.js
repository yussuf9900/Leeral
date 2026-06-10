import { registerUser } from '../../services/authService.js';
import { navigate } from '../../router.js';

const Register = () => `
    <div class="auth-page auth-register-page">
        <header class="auth-brand-header">
            <a href="#/" class="auth-brand" aria-label="Leeral Energie">
                <img src="assets/logos/logo.png" alt="" class="auth-logo">
                <span>LEERAL</span>
            </a>
        </header>

        <main class="auth-shell">
            <section class="auth-card register-card" aria-labelledby="register-title">
                <div class="card-header">
                    <h2 id="register-title">Créer un compte</h2>
                    <p>Maîtrisez votre consommation avec précision.</p>
                </div>

                <form id="registerForm" class="auth-form">
                    <div class="form-group">
                        <label for="name">Nom complet</label>
                        <div class="input-shell">
                            <input type="text" id="name" placeholder="Entrez votre nom" required>
                            <span class="input-icon" aria-hidden="true">👤</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Adresse e-mail</label>
                        <div class="input-shell">
                            <input type="email" id="email" placeholder="nom@exemple.com" required>
                            <span class="input-icon" aria-hidden="true">✉</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <div class="input-shell">
                            <input type="password" id="password" placeholder="••••••••" required>
                            <span class="input-icon" aria-hidden="true">⌕</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Type de profil</label>
                        <div class="profile-type-selector" role="group" aria-label="Type de profil">
                            <button type="button" class="profile-option active" data-profile-type="Domestique">
                                <span aria-hidden="true">⌂</span>
                                Domestique
                            </button>
                            <button type="button" class="profile-option" data-profile-type="Professionnel">
                                <span aria-hidden="true">▣</span>
                                Professionnel
                            </button>
                            <button type="button" class="profile-option" data-profile-type="Industriel">
                                <span aria-hidden="true">⚙</span>
                                Industriel
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary auth-submit">Créer mon compte</button>
                </form>

                <div class="card-footer footer-link">
                    <p>Déjà un compte ? <a href="#/login">Se connecter</a></p>
                </div>
            </section>
        </main>
    </div>
`;

const attachRegisterEventListeners = () => {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        let selectedProfileType = "Domestique"; // Default

        const profileTypeButtons = registerForm.querySelectorAll(".profile-type-selector button");
        profileTypeButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                profileTypeButtons.forEach(btn => btn.classList.remove("active"));
                const selectedButton = event.currentTarget;
                selectedButton.classList.add("active");
                selectedProfileType = selectedButton.dataset.profileType;
            });
        });

        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                await registerUser(name, email, password, selectedProfileType);
                navigate("/home");
            } catch (error) {
                alert(error.message); // Basic error handling
            }
        });
    }
};

Register.afterRender = attachRegisterEventListeners;

export default Register;
