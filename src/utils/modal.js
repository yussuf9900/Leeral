export const showModal = (title, contentHTML) => {
    let overlay = document.getElementById('leeral-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'leeral-modal-overlay';
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-card">
                <button type="button" class="modal-close-btn" id="leeral-modal-close" aria-label="Fermer">&times;</button>
                <h2 class="modal-title" id="leeral-modal-title"></h2>
                <div class="modal-body-content" id="leeral-modal-body"></div>
                <div class="modal-actions">
                    <button type="button" class="modal-btn-close" id="leeral-modal-action-btn">Fermer</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const closeBtn = document.getElementById('leeral-modal-close');
        const actionBtn = document.getElementById('leeral-modal-action-btn');
        
        const closeModal = () => {
            overlay.classList.remove('open');
        };

        closeBtn.addEventListener('click', closeModal);
        actionBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }

    document.getElementById('leeral-modal-title').textContent = title;
    document.getElementById('leeral-modal-body').innerHTML = contentHTML;
    
    // Small delay to ensure CSS transition triggers properly
    setTimeout(() => {
        overlay.classList.add('open');
    }, 10);
};
