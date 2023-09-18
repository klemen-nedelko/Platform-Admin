const express = require('express');
const Fuse = require('fuse.js');
const GeneratedData = require('./GeneratedData');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:8080'
}));

const filterDataBySubscription = (data, subscription) => data.filter(item => item.companyPlan === subscription);

const searchByQuery = (data, query) => {
    const fuse = new Fuse(data, {
        keys: ['companyName'],
        isCaseSensitive: true,
        threshold: 1,
    });
    const fuseQuery = query || '';
    return fuse.search(fuseQuery);
}

// /search?query=foo&subscription=free
// When no query -> return all data that fits `subscription`
// When no subscription -> return all data that fits query and all subscriptions
//
// /search
// /search?subscription=free
// /search?subscription=paid
// /search?query=foo
// /search?query=foo&subscription=free
// /search?query=foo&subscription=paid
app.get('/search', async (req, res) => {
    const query = req.query.query;
    const subscription = req.query.subscription;

    try {
        // Read the data from the JSON file asynchronously
        const filePath = path.join(__dirname, 'data.json');
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        jsonData.forEach(item => {
            item.companyName = item.companyName;
        });

        // Filter the data based on query and/or subscription
        let filteredData = jsonData;

        if (query && subscription) {
            filteredData = searchByQuery(filterDataBySubscription(filteredData, subscription), query);
        } else if (subscription) {
            filteredData = filterDataBySubscription(filteredData, subscription);
        } else if (query) {
            filteredData = searchByQuery(jsonData, query);
        }

        res.json(filteredData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/data', async (req, res) => {
    try {

        const filePath = path.join(__dirname, 'data.json');

        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        res.json(jsonData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internale server error' });
    }
})

const generateData = new GeneratedData(30);


app.listen(8888, () => {
    console.log(`Running on port: 8888 `)
});