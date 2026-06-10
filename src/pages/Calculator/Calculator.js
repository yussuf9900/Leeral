import store from '../../store/store.js';
import { calculateBill, saveBill } from '../../services/billService.js';
import { navigate } from '../../router.js';

const Calculator = () => {
    const { tariffs } = store.getState();
    if (!tariffs || tariffs.length === 0) {
        return `<p>Chargement des tarifs...</p>`;
    }

    const tariffOptions = tariffs.map(tariff => 
        `<option value="${tariff.type}">${tariff.type}</option>`
    ).join('');

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
                        <li><a href="#/calculator" class="active">Calculateur</a></li>
                        <li><a href="#/statistics">Statistiques</a></li>
                        <li><a href="#/history">Historique</a></li>
                    </ul>
                </nav>
                <div class="sidebar-footer">
                    <button id="logoutBtn" class="btn-secondary">Déconnexion</button>
                </div>
            </aside>
            <main class="main-content">
                <header class="dashboard-header">
                    <h1>Calculateur de Facture</h1>
                </header>
                <section class="calculator-section card">
                    <form id="billCalculatorForm">
                        <div class="form-group">
                            <label for="consumption">Consommation (kWh)</label>
                            <input type="number" id="consumption" placeholder="Ex: 450" required>
                        </div>
                        <div class="form-group">
                            <label for="tariffType">Type de Puissance Souscrite</label>
                            <select id="tariffType" required>
                                ${tariffOptions}
                            </select>
                        </div>
                        <button type="submit" class="btn-primary">CALCULER MAINTENANT</button>
                    </form>
                    <div id="calculationResult" class="mt-md" style="display:none;">
                        <h3>Détail de la Facture</h3>
                        <p>Consommation: <span id="resultConsumption"></span> kWh</p>
                        <p>Coût hors taxes: <span id="resultTotalExclTaxes"></span> FCFA</p>
                        <p>TVA (<span id="resultTvaRate"></span>%): <span id="resultTva"></span> FCFA</p>
                        <p>Redevance Élec.: <span id="resultRedevance"></span> FCFA</p>
                        <h4>Total Estimé: <span id="resultFinalAmount"></span> FCFA</h4>
                        <button id="saveBillBtn" class="btn-secondary mt-md">Enregistrer la facture</button>
                    </div>
                </section>
            </main>
        </div>
    `;
};

const attachCalculatorEventListeners = () => {
    const billCalculatorForm = document.getElementById("billCalculatorForm");
    const calculationResultDiv = document.getElementById("calculationResult");
    const saveBillBtn = document.getElementById("saveBillBtn");

    let latestBillData = null;

    if (billCalculatorForm) {
        billCalculatorForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const consumption = parseFloat(document.getElementById("consumption").value);
            const tariffType = document.getElementById("tariffType").value;

            try {
                const result = calculateBill(consumption, tariffType);
                latestBillData = result;

                document.getElementById("resultConsumption").textContent = result.consumption;
                document.getElementById("resultTotalExclTaxes").textContent = result.totalAmountExclTaxes.toLocaleString();
                document.getElementById("resultTvaRate").textContent = (result.tva / result.totalAmountExclTaxes * 100).toFixed(0);
                document.getElementById("resultTva").textContent = result.tva.toLocaleString();
                document.getElementById("resultRedevance").textContent = result.redevance.toLocaleString();
                document.getElementById("resultFinalAmount").textContent = result.finalAmount.toLocaleString();
                
                calculationResultDiv.style.display = "block";
            } catch (error) {
                alert(error.message);
                calculationResultDiv.style.display = "none";
            }
        });
    }

    if (saveBillBtn) {
        saveBillBtn.addEventListener("click", async () => {
            if (latestBillData) {
                try {
                    await saveBill(latestBillData);
                    alert("Facture enregistrée avec succès!");
                    navigate("/history");
                } catch (error) {
                    alert(error.message);
                }
            } else {
                alert("Veuillez calculer une facture avant de l'enregistrer.");
            }
        });
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

Calculator.afterRender = attachCalculatorEventListeners;

export default Calculator;
