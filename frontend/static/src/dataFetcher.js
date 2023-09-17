'use strict'

class DataFetcher {

    constructor() {
        this.cachedData = null;
    }

    async fetchData(forceRefresh = false) {
        if (this.cachedData && !forceRefresh) {
            return this.cachedData
        }
        try {
            const response = await fetch('http://localhost:8888/data');
            const data = await response.json();
            this.cachedData = data;
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    addNewDataToCache(newData) {
        if (!this.cachedData) {
            this.cachedData = [];
        }
        this.cachedData.push(newData);
    }

    getCachedData() {
        return this.cachedData;
    }

}

export default DataFetcher;