import store from '../../store/store.js';
import { getBills } from '../../services/billService.js';
import { logoutUser } from '../../services/authService.js';
import { navigate } from '../../router.js';

const Statistics = () => {
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
                        <li><a href="#/statistics" class="active">Statistiques</a></li>
                        <li><a href="#/history">Historique</a></li>
                    </ul>
                </nav>
                <div class="sidebar-footer">
                    <button id="logoutBtn" class="btn-secondary">Déconnexion</button>
                </div>
            </aside>
            <main class="main-content">
                <header class="dashboard-header">
                    <h1>Statistiques Énergétiques</h1>
                </header>
                <section class="statistics-section card">
                    <h2>Consommation par mois</h2>
                    <canvas id="consumptionChart" width="600" height="300"></canvas>
                    <div id="statisticsSummary" class="mt-md">
                        <!-- Summary will be loaded here -->
                    </div>
                </section>
            </main>
        </div>
    `;
};

const attachStatisticsEventListeners = async () => {
    const consumptionChartCanvas = document.getElementById('consumptionChart');
    const statisticsSummaryDiv = document.getElementById('statisticsSummary');

    if (consumptionChartCanvas && statisticsSummaryDiv) {
        try {
            const bills = await getBills();
            if (bills.length === 0) {
                statisticsSummaryDiv.innerHTML = '<p>Aucune donnée de consommation pour le moment.</p>';
                return;
            }

            // Aggregate consumption by month
            const monthlyConsumption = bills.reduce((acc, bill) => {
                const date = new Date(bill.date);
                const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
                acc[monthYear] = (acc[monthYear] || 0) + bill.consumption;
                return acc;
            }, {});

            const labels = Object.keys(monthlyConsumption).sort();
            const data = labels.map(monthYear => monthlyConsumption[monthYear]);

            // Render simple bar chart on canvas
            const ctx = consumptionChartCanvas.getContext('2d');
            ctx.clearRect(0, 0, consumptionChartCanvas.width, consumptionChartCanvas.height);

            const chartWidth = consumptionChartCanvas.width;
            const chartHeight = consumptionChartCanvas.height;
            const barWidth = (chartWidth / data.length) * 0.7;
            const barSpacing = (chartWidth / data.length) * 0.3;
            const maxDataValue = Math.max(...data);

            ctx.fillStyle = store.getState().tariffs[0]?.tranches[0]?.price_per_kwh ? '#FFD700' : '#888'; // Use primary color or grey

            data.forEach((value, index) => {
                const barHeight = (value / maxDataValue) * (chartHeight - 50); // -50 for padding
                const x = index * (barWidth + barSpacing) + barSpacing / 2;
                const y = chartHeight - barHeight - 20; // -20 for bottom padding
                ctx.fillRect(x, y, barWidth, barHeight);

                // Draw labels
                ctx.fillStyle = '#E0E6F0';
                ctx.fillText(labels[index].split('-')[1], x + barWidth / 2 - 10, chartHeight - 5);
                ctx.fillText(value.toFixed(0) + ' kWh', x + barWidth / 2 - 20, y - 5);
            });

            // Summary
            const totalConsumption = data.reduce((sum, val) => sum + val, 0);
            const averageConsumption = totalConsumption / data.length;
            statisticsSummaryDiv.innerHTML = `
                <p>Consommation totale sur la période: <strong>${totalConsumption.toFixed(2)} kWh</strong></p>
                <p>Consommation moyenne mensuelle: <strong>${averageConsumption.toFixed(2)} kWh</strong></p>
            `;

        } catch (error) {
            statisticsSummaryDiv.innerHTML = `<p class="error-message">Erreur lors du chargement des statistiques: ${error.message}</p>`;
            console.error("Error loading statistics:", error);
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

Statistics.afterRender = attachStatisticsEventListeners;

export default Statistics;
