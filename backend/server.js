const express = require('express');
const Fuse = require('fuse.js');
const GeneratedData = require('./GeneratedData');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const cors = require('cors');


const dat = [
    {
        "id": 12401,
        "companyName": "ACME Corporation",
        "contactEmail": "tom.hudges@apple.com",
        "companyPlan": "paying"
    },
    {
        "id": 12402,
        "companyName": "intera d.o.o.",
        "contactEmail": "the.boss@intera.si",
        "companyPlan": "free"
    }
];

app.use(cors({
    origin: 'http://localhost:8080'
}));

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
app.use('/search', function (req, res) {
    const query = req.query.query;
    const subscription = req.query.subscription;

    const filePath = path.join(__dirname, 'data.json');

    const data = fs.readFile(filePath, 'utf8');

    //
    const fuse = new Fuse(data, {
        keys: ['companyName']
    })

    // 3. Now search!
    const fuseQuery = query ?? '';
    const result = fuse.search(fuseQuery);

    console.log(query);
    console.log(subscription);

    res.json(result);
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
    console.log(`Running on port 8888`)
});