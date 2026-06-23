import store from '../../store/store.js';
import { calculateBill, saveBill } from '../../services/billService.js';
import { navigate } from '../../router.js';
import { logoutUser } from '../../services/authService.js';

let billChart = null;

const Calculator = () => {
    const { tariffs } = store.getState();
    if (!tariffs || tariffs.length === 0) {
        return `<p>Chargement des tarifs...</p>`;
    }

    const tariffOptions = tariffs.map(tariff =>
        `<option value="${tariff.type}">${tariff.type}</option>`
    ).join('');

    return `
        <div id="calculator-page">
            <header class="home-topbar">
                <div id="home-logo">
                    <img src="../../../assets/logos/logo.png" alt="logo">
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
            <div id="main-calculator">
                <div class="siderBarre">
                    <nav class="sidebar">
                        <button class="nav-home">Accueil</button>
                        <button class="nav-calculator">Calculateur</button>
                        <button class="nav-statistics">Statistiques</button>
                        <button class="nav-history">Historique</button>
                        <button class="nav-logout">Déconnexion</button>
                    </nav>
                </div>
                <div class="mainCalcul">
                    <div class="calc-form">
                        <h3>Calculateur de Facture</h3>
                        <label for="consumption-input">Consommation (kWh) :</label>
                        <input type="number" id="consumption-input" min="0" step="1" placeholder="ex : 300"/>
                        <label for="tariff-select">Type de tarif :</label>
                        <select id="tariff-select">${tariffOptions}</select>
                        <button id="calculate-btn">Calculer</button>
                        <button id="save-btn" style="display:none;">Enregistrer la facture</button>
                    </div>
                    <canvas id="billChart" width="400" height="300"></canvas>
                    <div id="bill-result" class="bill-result hidden"></div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </div>
    `;
};

const attachCalculatorEventListeners = () => {
    // Navigation hamburger
    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.siderBarre');
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    const consumptionInput = document.getElementById('consumption-input');
    const tariffSelect = document.getElementById('tariff-select');
    const calculateBtn = document.getElementById('calculate-btn');
    const saveBtn = document.getElementById('save-btn');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const consumption = parseFloat(consumptionInput.value);
            const tariffType = tariffSelect.value;

            if (isNaN(consumption) || consumption <= 0) {
                alert('Veuillez entrer une consommation valide.');
                return;
            }

            try {
                const billData = calculateBill(consumption, tariffType);
                renderChart(billData);
                saveBtn.style.display = 'inline-block';
                saveBtn.onclick = () => saveCurrentBill(billData);
            } catch (error) {
                console.error(error);
                alert("Erreur lors du calcul.");
            }
        });
    }

    const saveCurrentBill = async (billData) => {
        try {
            await saveBill(billData);
            alert('Facture enregistrée avec succès !');
            saveBtn.style.display = 'none';
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'enregistrement.");
        }
    };
};

const renderChart = (billData) => {
    const ctx = document.getElementById('billChart');
    if (!ctx) return;

    // Destroy existing chart
    if (billChart) {
        billChart.destroy();
    }

    // Préparer les données pour le graphique
    const labels = billData.consumptionBreakdown.map(b => `Tranche ${b.tranche}`);
    const data = billData.consumptionBreakdown.map(b => b.cost);
    const backgroundColors = ['#36A2EB', '#FF6384', '#FFCE56'];

    billChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Coût par tranche (FCFA)',
                data: data,
                backgroundColor: backgroundColors.slice(0, data.length)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.parsed.y} FCFA`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Coût (FCFA)' }
                }
            }
        }
    });

    // Afficher les résultats
    const resultDiv = document.getElementById('bill-result');
    if (resultDiv) {
        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = `
            <h4>Résultat du calcul</h4>
            <p><strong>Consommation:</strong> ${billData.consumption} kWh</p>
            <p><strong>Type:</strong> ${billData.tariffType}</p>
            <p><strong>Total HT:</strong> ${billData.totalAmountExclTaxes.toLocaleString()} FCFA</p>
            <p><strong>TVA (18%):</strong> ${billData.tva.toLocaleString()} FCFA</p>
            <p><strong>Redevance:</strong> ${billData.redevance.toLocaleString()} FCFA</p>
            <p class="final-amount"><strong>Total à payer:</strong> ${billData.finalAmount.toLocaleString()} FCFA</p>
        `;
    }
};

Calculator.afterRender = attachCalculatorEventListeners;

export default Calculator;