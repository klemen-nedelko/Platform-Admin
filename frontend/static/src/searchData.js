'use strict'

class SearchData {

    constructor(tableRender, config, containerId) {
        this.searchInput = document.getElementById('search-input');
        this.tableRender = tableRender;
        this.config = config;
        this.containerId = containerId;
        this.searchInput.addEventListener('input', this.handleSearch());
    }

    async handleSearch() {
        const query = this.searchInput.value.trim().toLowerCase();
        const currentFilter = window.currentFilter;

        try {
            const queryParams = new URLSearchParams();

            // Only add 'query' parameter if it's not empty
            if (query) {
                queryParams.append('query', query);
            }

            // Only add 'subscription' parameter if currentFilter is not 'all'
            // if (currentFilter !== 'all') {
            //     queryParams.append('subscription', currentFilter);
            // }

            const response = await fetch('http://localhost:8888/search?' + queryParams.toString());

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }

            const searchData = await response.json();
            let data;

            if (searchData.every(itemData => itemData && itemData.item && itemData.item.id)) {
                // If all items have item.id, map item objects
                data = searchData.map(itemData => itemData.item);
            } else {
                // If any item lacks item.id, use the entire searchData
                data = searchData;
            }

            this.tableRender.renderTable(data, this.config, this.containerId);
        } catch (error) {
            console.error(error);
            // Handle the error gracefully, e.g., display an error message to the user
            this.tableRender.renderTable([], this.config, this.containerId);
        }
    }
}

export default SearchData;