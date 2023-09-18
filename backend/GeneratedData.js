const fs = require('fs').promises;
const path = require('path');

class GeneratedData {
    constructor(numEntries) {
        this.numEntries = numEntries;
        this.generateAndWriteData(numEntries);
    }

    async readCompaniesFromFIle() {
        try {
            const data = await fs.readFile("./txt-files/company.txt", "utf8");
            const lines = data.split('\n'); // Split lines by line feed (\n)

            const companyData = [];

            for (const line of lines) {
                // Split each line by tab (\t) to extract companyName and companyContact
                const [companyName, restOfLine] = line.split('\t');

                // Remove any remaining carriage return (\r) characters and trim whitespace
                const companyContact = restOfLine.replace(/\r/g, '').trim();

                // Replace spaces with hyphens and make it lowercase in companyContact
                const formattedCompanyContact = companyContact.replace(/\s/g, '-').toLowerCase();

                companyData.push({ companyName, companyContact: formattedCompanyContact });
            }
            return companyData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getRandomPlan() {
        const plans = ['free', 'paying'];
        const randomIndex = Math.floor(Math.random() * plans.length);
        return plans[randomIndex];
    }

    async generateRandomID() {
        const length = 8;
        const characters = '0123456789';
        let id = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
        }

        return id;
    }

    async readNamesFromFile() {
        try {
            const data = await fs.readFile("./txt-files/names.txt", "utf8");
            const names = data.split('\n').map(name => name.trim());
            return names;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async readExistingDataJson() {
        try {
            const filePath = path.join(__dirname, 'data.json');
            const data = await fs.readFile(filePath, 'utf8');
            const existingDataJson = JSON.parse(data);
            return existingDataJson;
        } catch (error) {
            return [];
        }
    }

    async isCompanyExistsInGeneratedData(comapnyName, generatedData) {
        return generatedData.some(data => data.companyName === companyName);
    }

    async generateRandomData() {
        const companies = await this.readCompaniesFromFIle();
        const names = await this.readNamesFromFile();

        //To track used company names
        const usedCompanyNames = new Set();
        const generatedData = []

        while (generatedData.length < this.numEntries) {
            const randomCompany = companies[Math.floor(Math.random() * companies.length)];

            if (!usedCompanyNames.has(randomCompany.companyName)) {
                const randomName = names[Math.floor(Math.random() * names.length)];

                const companyPlan = this.getRandomPlan();
                const companyContact = `${randomName}${randomCompany.companyContact}`;
                const companyId = await this.generateRandomID();

                generatedData.push({
                    id: companyId,
                    companyName: randomCompany.companyName,
                    contactEmail: companyContact,
                    companyPlan
                });

                usedCompanyNames.add(randomCompany.companyName);
            }
        }

        return generatedData;
    }

    async checkAndDeleteExistingDataFile() {
        const filePath = path.join(__dirname, 'data.json');
        try {
            await fs.access(filePath);
            await fs.unlink(filePath);
            console.log('Existing data file has been rewrited.✅');
        } catch (error) {
            // File does not exist or couldn't be deleted
            console.log('No existing data file found or unable to delete it.');
        }
    }

    async generateAndWriteData(numEntries) {
        try {
            await this.checkAndDeleteExistingDataFile();
            const generatedData = await this.generateRandomData();

            const existingDataJson = await this.readExistingDataJson();

            for (const data of generatedData) {
                existingDataJson.push(data); // Push each data object individually
            }

            const jsonData = JSON.stringify(existingDataJson, null, 2);
            const filePath = path.join(__dirname, 'data.json');
            await fs.writeFile(filePath, jsonData, 'utf8');
            console.log(`Random data has been generated and written to the file successfully (${numEntries} entries).`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = GeneratedData;