import store from '../../store/store.js';
import { getBills } from '../../services/billService.js';
import { logoutUser } from '../../services/authService.js';
import { navigate } from '../../router.js';

const History = () => {
    const { currentUser } = store.getState();
    if (!currentUser) {
        navigate('/login');
        return '';
    }

    return `
        <div class="dashboard-layout">
            <aside class="sidebar">
                <div class="sidebar-header">
                    <a href="#/home" class="logo">
                        <img src="/assets/logo.png" alt="Leeral Logo">
                        LEERAL
                    </a>
                </div>
                <nav class="sidebar-nav">
                    <ul>
                        <li><a href="#/home">Accueil</a></li>
                        <li><a href="#/calculator">Calculateur</a></li>
                        <li><a href="#/statistics">Statistiques</a></li>
                        <li><a href="#/history" class="active">Historique</a></li>
                    </ul>
                </nav>
                <div class="sidebar-footer">
                    <button id="logoutBtn" class="btn-secondary">Déconnexion</button>
                </div>
            </aside>
            <main class="main-content">
                <header class="dashboard-header">
                    <h1>Historique de Consommation</h1>
                </header>
                <section id="billsList" class="history-section">
                    <!-- Bills will be loaded here -->
                    <p>Chargement de l'historique des factures...</p>
                </section>
            </main>
        </div>
    `;
};

const attachHistoryEventListeners = async () => {
    const billsListDiv = document.getElementById('billsList');
    if (billsListDiv) {
        try {
            const bills = await getBills();
            if (bills.length === 0) {
                billsListDiv.innerHTML = '<p>Aucune facture enregistrée pour le moment.</p>';
            } else {
                billsListDiv.innerHTML = bills.map(bill => `
                    <div class="card bill-card mb-md">
                        <h3>${new Date(bill.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</h3>
                        <p>Coût Total: <strong>${bill.finalAmount.toLocaleString()} FCFA</strong></p>
                        <p>Consommation: ${bill.consumption} kWh</p>
                        <button class="btn-secondary btn-sm" data-bill-id="${bill.id}">Voir le détail</button>
                    </div>
                `).join('');

                // Attach event listeners for detail buttons
                billsListDiv.querySelectorAll('.btn-sm').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const billId = event.target.dataset.billId;
                        alert(`Détail de la facture ${billId} (fonctionnalité à implémenter)`);
                        // navigate(`/history/${billId}`); // Example for detailed view
                    });
                });
            }
        } catch (error) {
            billsListDiv.innerHTML = `<p class="error-message">Erreur lors du chargement des factures: ${error.message}</p>`;
            console.error("Error loading bills:", error);
        }
    }

    // Logout button from sidebar
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logoutUser();
            navigate("/login");
        });
    }
};

History.afterRender = attachHistoryEventListeners;

export default History;
