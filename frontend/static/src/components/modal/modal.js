'use strict'
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.overlay = document.getElementById('overlay');
        this.btnCloseModal = document.getElementById(`${modalId}-close`);
        this.btnOpenModal = document.getElementById(`${modalId}-btn`);

        this.btnOpenModal.addEventListener('click', this.showModal.bind(this));
        this.btnCloseModal.addEventListener('click', this.hideModal.bind(this));
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    showModal() {
        this.modal.classList.remove('hidden');
        this.overlay.classList.remove('hidden');
    }

    hideModal() {
        this.modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
    }
    handleKeyPress(event) {
        if (event.key === 'Escape' && !this.modal.classList.contains('hidden')) {
            this.hideModal();
        }
    }
}

export default Modal;