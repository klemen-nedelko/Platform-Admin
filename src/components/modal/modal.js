'use strict'

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn-create-new');

const showModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const hideModal = () => {
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

btnOpenModal.addEventListener('click', showModal);
btnCloseModal.addEventListener('click', hideModal);

document.addEventListener('keydown', function (e) {
    if (e === 'Escape' && !modal.classList.contains('hidden')) {
        hideModal();
    }
})
