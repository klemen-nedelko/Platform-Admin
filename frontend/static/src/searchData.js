'use strict'

class SearchData {
    constructor(tableRender, config, containerId) {
        this.searchInput = document.getElementById('search-input');
        this.tableRender = tableRender;
        this.config = config;
        this.containerId = containerId;
        this.debounceTimer = null;

        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                try {
                    this.handleSearch();
                } catch (error) {
                    console.error(error);
                }
            }, 300);
        });
    }

    async fetchData(query, currentFilter) {
        const queryParams = new URLSearchParams();
        if (query) {
            queryParams.append('query', query);
        }
        if (currentFilter !== 'all' && currentFilter !== undefined) {
            queryParams.append('subscription', currentFilter);
        }

        const url = 'http://localhost:8888/search?' + queryParams.toString();

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network or server error');
        }

        const searchData = await response.json();
        return searchData;
    }

    async handleSearch() {
        const query = this.searchInput.value.trim().toLowerCase();
        const currentFilter = window.currentFilter;

        try {
            const searchData = await this.fetchData(query, currentFilter);

            let data;

            if (searchData.every(itemData => itemData && itemData.item && itemData.item.id)) {
                data = searchData.map(itemData => itemData.item);
            } else {
                data = searchData;
            }

            this.tableRender.renderTable(data, this.config, this.containerId);
        } catch (error) {
            console.error(error);
            this.tableRender.renderTable([], this.config, this.containerId);
        }
    }
}

export default SearchData;