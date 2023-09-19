'use strict'

import Modal from "./components/modal/modal.js";
import DataFetcher from "./dataFetcher.js";
import TableRender from "./tableRender.js";
import SearchData from "./searchData.js";
import FilterOption from "./filterOption.js";
import { config } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {

    const modal = new Modal("add-new-account");
    const containerId = 'table-container'
    const dataFetcher = new DataFetcher('http://localhost:8888/data');
    const tableRender = new TableRender();
    const searchData = new SearchData(tableRender, config, containerId);
    const filterOption = new FilterOption();

    dataFetcher.fetchData().then((data) => {
        tableRender.renderTable(data, config, containerId);
    })

    searchData.searchInput.addEventListener('input', () => {
        searchData.handleSearch();
    });
    document.addEventListener('filterChange', () => {
        searchData.handleSearch(); // Trigger a search with the current filter and query
    });

    const createForm = document.getElementById('create');
    createForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        let companyNameInput = document.getElementById('companyName').value;
        let contactEmailInput = document.getElementById('contactEmail').value;
        let companyPlanInput = document.getElementById('companyPlan').value;
        if (!companyName || !contactEmail || !companyPlan) {
            alert('Please fill in all fields');
            return;
        }
        try {

            let newData = {
                id: dataFetcher.getCachedData().length + 1,
                companyName: companyNameInput,
                contactEmail: contactEmailInput,
                companyPlan: companyPlanInput,
            };

            dataFetcher.addNewDataToCache(newData);

            createForm.reset();
            modal.hideModal();

            tableRender.renderTable(dataFetcher.getCachedData(), config, containerId);

        } catch (error) {
            console.log(error);
            alert('An error occurred while adding data.')
        }
    });

})