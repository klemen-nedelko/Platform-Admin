'use strict'
class DataFetcher {
    constructor(url) {
        this.url = url
        this.cache = new Map();
    }

    async fetchData(forceRefresh = false) {
        if (!forceRefresh && this.cache.has('data')) {
            return this.cache.get('data');
        }

        try {
            const response = await fetch(this.url);
            const data = await response.json();
            this.cache.set('data', data);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    addNewDataToCache = (newData) => {
        if (!this.cache.has('data')) {
            this.cache.set('data', []);
        }
        const cachedData = this.cache.get('data');
        this.cache.set('data', [...cachedData, newData]);
    }

    getCachedData() {
        return this.cache.get('data') || [];
    }
}

export default DataFetcher;