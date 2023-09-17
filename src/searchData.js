'use strict'
import debounce from "./debounce.js";

class SearchData {

    constructor(dataFetcher, tableRenderer) {
        this.searchInput = document.getElementById('search-input');
        this.debounceSearchData = debounce(this.searchData.bind(this), 300);
        this.dataFetcher = dataFetcher;
        this.tableRenderer = tableRenderer;
        this.initializeSearchInput();
    }
    initializeSearchInput() {
        this.searchInput.addEventListener('input', this.debounceSearchData)
    }

    async searchData() {
        try {
            const data = await this.dataFetcher.fetchData();

            if (!data || !Array.isArray(data)) {
                throw new Error('Data is not available or is not an array');
            }


            const searchQuery = this.searchInput.value.trim().toLowerCase();

            if (!searchQuery) {
                this.tableRenderer.renderTable(data);
                return;
            }

            !searchQuery && renderTable(data);

            const filteredData = searchQuery ? data.filter(item => item.companyName.toLowerCase().includes(searchQuery)) : data;

            this.tableRenderer.renderTable(filteredData)
        } catch (error) {
            console.error(error);
            this.tableRenderer.renderTable([]);
        }
    }

}

export default SearchData;