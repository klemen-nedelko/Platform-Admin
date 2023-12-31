'use strict'

class FilterOption {

    constructor() {
        this.filterOption = document.querySelectorAll('.filter-option');
        this.currentFilter = 'all';
        this.initializeFilterOptions();
    }

    initializeFilterOptions() {
        this.filterOption.forEach((option) => {
            option.addEventListener('click', this.handleFilterOptionClick.bind(this));
        });
    }

    handleFilterOptionClick(event) {
        event.preventDefault();
        this.filterOption.forEach((option) => {
            option.classList.remove('font-active');
            option.classList.remove('active');
        });

        event.target.classList.add('font-active');
        event.target.classList.add('active');
        this.currentFilter = event.target.textContent.trim().toLowerCase();
        window.currentFilter = this.currentFilter ?? 'all';

        const filterChangeEvent = new Event('filterChange', { bubbles: true });
        document.dispatchEvent(filterChangeEvent);

    }

}

export default FilterOption