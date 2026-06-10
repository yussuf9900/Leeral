import store from '../store/store.js';
import { addBill, getBillsByUserId } from '../database/billsStore.js';

const calculateBill = (consumptionKWH, tariffType) => {
    const { tariffs } = store.getState();
    const selectedTariff = tariffs.find(t => t.type === tariffType);

    if (!selectedTariff) {
        throw new Error(`Type de tarif inconnu: ${tariffType}`);
    }

    let totalAmount = 0;
    let consumptionBreakdown = [];

    let remainingConsumption = consumptionKWH;

    for (const tranche of selectedTariff.tranches) {
        const trancheMin = tranche.min;
        const trancheMax = tranche.max === -1 ? Infinity : tranche.max;

        if (remainingConsumption > 0) {
            const consumptionInTranche = Math.min(remainingConsumption, trancheMax - trancheMin + 1);
            const trancheCost = consumptionInTranche * tranche.price_per_kwh;
            totalAmount += trancheCost;
            consumptionBreakdown.push({ tranche: `${trancheMin}-${trancheMax === Infinity ? 'max' : trancheMax}`, consumption: consumptionInTranche, cost: trancheCost });
            remainingConsumption -= consumptionInTranche;
        }
    }

    // Add fixed charge to the first tranche's cost (as per typical Senelec billing)
    if (selectedTariff.tranches.length > 0) {
        totalAmount += selectedTariff.tranches[0].fixed_charge;
    }

    const tva = totalAmount * selectedTariff.tva_rate;
    const redevance = selectedTariff.redevance_elec;
    const finalAmount = totalAmount + tva + redevance;

    return {
        consumption: consumptionKWH,
        tariffType,
        totalAmountExclTaxes: totalAmount,
        tva,
        redevance,
        finalAmount,
        consumptionBreakdown,
        date: new Date().toISOString()
    };
};

const saveBill = async (billData) => {
    const { currentUser } = store.getState();
    if (!currentUser) {
        throw new Error("Aucun utilisateur connecté pour enregistrer la facture.");
    }
    const billToSave = { ...billData, userId: currentUser.id };
    return await addBill(billToSave);
};

const getBills = async () => {
    const { currentUser } = store.getState();
    if (!currentUser) {
        throw new Error("Aucun utilisateur connecté.");
    }
    return await getBillsByUserId(currentUser.id);
};

export { calculateBill, saveBill, getBills };
