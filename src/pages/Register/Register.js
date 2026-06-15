import { registerUser } from '../../services/authService.js';
import { navigate } from '../../router.js';

const Register = () => `
    <div class="auth-page auth-register-page">
        <header class="auth-brand-header">
            <a href="#/" class="auth-brand" aria-label="Leeral Energie">
                <img src="assets/logos/logo.png" alt="" class="auth-logo">
                <p id="brand-text-register">Maîtrisez votre consommation avec précision.</p>
            </a>
        </header>

        <main class="auth-shell">
            <section class="auth-card register-card" aria-labelledby="register-title">
                <div class="card-header">
                    <h2 id="register-title">Créer un compte</h2>
                </div>

                <form id="registerForm" class="auth-form">
                    <div class="form-group">
                        <label for="name">Nom complet</label>
                        <div class="input-shell">
                            <input type="text" id="name" placeholder="Entrez votre nom" required>
                            <span class="input-icon" aria-hidden="true"></span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Adresse e-mail</label>
                        <div class="input-shell">
                            <input type="email" id="email" placeholder="nom@exemple.com" required>
                            <span class="input-icon" aria-hidden="true"></span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <div class="input-shell">
                            <input type="password" id="password" placeholder="••••••••" required>
                            <span class="input-icon" aria-hidden="true"></span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Type de profil</label>
                        <div class="profile-type-selector" role="group" aria-label="Type de profil">
                            <button type="button" class="profile-option active" data-profile-type="Domestique" style="color: #DFE1F6;">
                                <span aria-hidden="true"><svg fill="#D1C6AB" width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>house</title> <path d="M0 16h4l12-13.696 12 13.696h4l-13.984-16h-4zM4 32h8v-9.984q0-0.832 0.576-1.408t1.44-0.608h4q0.8 0 1.408 0.608t0.576 1.408v9.984h8v-13.408l-12-13.248-12 13.248v13.408zM26.016 6.112l4 4.576v-8.672h-4v4.096z"></path> </g></svg></span>
                                Domestique
                            </button>
                            <button type="button" class="profile-option" data-profile-type="Professionnel" style="color: #DFE1F6;">
                                <span aria-hidden="true"><svg width="40px" height="40px" viewBox="0 0 24 24" fill="#D1C6AB" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 10C4 8.89543 4.89543 8 6 8H18C19.1046 8 20 8.89543 20 10V10C20 11.6569 18.6569 13 17 13H7C5.34315 13 4 11.6569 4 10V10Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 6C9 4.89543 9.89543 4 11 4H13C14.1046 4 15 4.89543 15 6V8H9V6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <rect x="4" y="8" width="16" height="12" rx="2" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> <path d="M9 12V14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 12V14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></span>
                                Professionnel
                            </button>
                            <button type="button" class="profile-option" data-profile-type="Industriel" style="color: #DFE1F6;">
                                <span aria-hidden="true"><svg fill="#D1C6AB" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="25px" height="25px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <rect x="100.174" y="372.87" width="33.391" height="33.391"></rect> </g> </g> <g> <g> <rect x="166.957" y="372.87" width="33.391" height="33.391"></rect> </g> </g> <g> <g> <rect x="367.304" y="372.87" width="33.391" height="33.391"></rect> </g> </g> <g> <g> <rect x="300.522" y="372.87" width="33.391" height="33.391"></rect> </g> </g> <g> <g> <path d="M495.304,88.304V55.652c0-27.619-22.468-50.087-50.087-50.087H294.957c-21.772,0-40.337,13.956-47.229,33.391h-52.945 c-27.619,0-50.087,22.468-50.087,50.087c0,27.971,22.707,50.087,50.087,50.087h100.174c21.772,0,40.337-13.956,47.229-33.391 h51.493l-13.913,166.957h-45.852v-83.478c0-13.289-14.829-21.27-25.956-13.891l-124.305,82.869v-68.979 c0-13.252-14.783-21.286-25.956-13.891L7.435,275.501C2.794,278.598,0,283.804,0,289.391v200.348 c0,9.217,7.479,16.696,16.696,16.696h478.609c9.217,0,16.696-7.479,16.696-16.696V289.391 C512,288.285,495.397,89.406,495.304,88.304z M466.032,139.13h-41.63l2.783-33.391h36.065L466.032,139.13z M318.598,72.348 l-7.88,22.229c-1.978,5.554-7.609,11.163-15.761,11.163H194.783c-8.741,0-16.696-6.926-16.696-16.696 c0-9.206,7.49-16.696,16.696-16.696h76.533l7.88-22.229c1.978-5.554,7.609-11.163,15.761-11.163h150.261 c9.206,0,16.696,7.49,16.696,16.696v16.696H318.598z M233.739,422.957c0,9.217-7.479,16.696-16.696,16.696H83.478 c-9.217,0-16.696-7.479-16.696-16.696v-66.783c0-9.217,7.479-16.696,16.696-16.696h133.565c9.217,0,16.696,7.479,16.696,16.696 V422.957z M434.087,422.957c0,9.217-7.479,16.696-16.696,16.696H283.826c-9.217,0-16.696-7.479-16.696-16.696v-66.783 c0-9.217,7.479-16.696,16.696-16.696h133.565c9.217,0,16.696,7.479,16.696,16.696V422.957z M413.272,272.696l2.783-33.391h58.326 l2.783,33.391H413.272z"></path> </g> </g> </g></svg></span>
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
