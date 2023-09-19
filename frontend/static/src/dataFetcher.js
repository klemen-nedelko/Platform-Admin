'use strict'
class DataFetcher {
    constructor() {
        this.cache = new Map();
    }

    async fetchData(forceRefresh = false) {
        if (!forceRefresh && this.cache.has('data')) {
            return this.cache.get('data');
        }

        try {
            const response = await fetch('http://localhost:8888/data');
            const data = await response.json();
            this.cache.set('data', data);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    addNewDataToCache(newData) {
        if (!this.cache.has('data')) {
            this.cache.set('data', []);
        }
        const cachedData = this.cache.get('data');
        cachedData.push(newData);
    }

    getCachedData() {
        return this.cache.get('data') || [];
    }
}

export default DataFetcher;