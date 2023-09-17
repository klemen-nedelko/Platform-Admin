'use strict'

const search = document.querySelector('.search-input');
const searchInput = document.querySelector('.search-input');
const noDataMessage = document.querySelector('#noData');
const filterOption = document.querySelectorAll('.filter-option');
let form = document.forms['create'];
let tableBody = document.querySelector('#table tbody');
let currentFilter = 'all';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn-create-new');

const showModal = () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const hideModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnOpenModal.addEventListener('click', showModal);
btnCloseModal.addEventListener('click', hideModal);

document.addEventListener('keydown', function (e) {
    if (e === 'Escape' && !modal.classList.contains('hidden')) {
        hideModal();
    }
})



let cachedData = null

const fetchData = async (forceRefresh = false) => {
    if (cachedData && !forceRefresh) {
        return cachedData
    }
    try {
        const response = await fetch('/src/data.json')
        const data = await response.json();
        cachedData = data;
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

const filterData = (data, filter) => {
    return data.filter((item) => {
        if (filter === 'all') {
            return true;
        }
        return item.companyPlan === filter
    })
}

const renderTable = async (data = []) => {

    tableBody.innerHTML = '';

    const filteredData = filterData(data, currentFilter);
    if (data.length === 0) {
        const noDataRow = document.createElement("tr");
        noDataRow.id = "noData";

        const noDataCell = document.createElement("td");
        noDataCell.colSpan = 5;
        noDataCell.className = "no-data font-no-data";
        noDataCell.textContent = "No data...";

        noDataRow.appendChild(noDataCell);
        tableBody.appendChild(noDataRow);
    } else {
        filteredData.forEach((item) => {
            const row = document.createElement("tr");
            row.classList.add('table-body-style')

            const idCell = document.createElement("td");
            idCell.classList.add('table-id')
            idCell.textContent = item.id;

            const nameCell = document.createElement("td");
            nameCell.classList.add('font-primary')
            nameCell.classList.add('table-company-name')
            nameCell.textContent = item.companyName;

            const emailCell = document.createElement("td");
            emailCell.textContent = item.contactEmail;

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell);

            tableBody.appendChild(row);
        });
    }
}
const searchData = async () => {
    try {
        const data = await cachedData;
        if (!data || !Array.isArray(data)) {
            throw new Error('Data is not available or is not an array');
        }

        const searchQuery = searchInput.value.trim().toLowerCase();
        const searchedData = cachedData.filter((item) => {
            return item.companyName.toLowerCase().includes(searchQuery);
        });
        renderTable(searchedData);
    } catch (error) {
        console.error(error);
        renderTable([]);
    }
};

const handleFilterOptionClick = (event) => {
    event.preventDefault();
    filterOption.forEach((option) => {
        option.classList.remove('font-active');
        option.classList.remove('active');
    });
    event.target.classList.add('font-active');
    event.target.classList.add('active');
    currentFilter = event.target.textContent.trim().toLowerCase();

    renderTable(cachedData);
};

filterOption.forEach((option) => {
    option.addEventListener('click', handleFilterOptionClick);
});

const debouncedSearchData = debounce(searchData, 300)

searchInput.addEventListener('input', debouncedSearchData);
fetchData().then((data) => {
    renderTable(data);
});

const addNewDataToCache = (newData) => {
    cachedData.push(newData);
}

const renderTableWithUpdatedData = () => {
    renderTable(cachedData)
}

const createFrom = document.getElementById('create');

createFrom.addEventListener('submit', (event) => {
    event.preventDefault();
    const companyName = document.getElementById('companyName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const companyPlan = document.getElementById('companyPlan').value;
    console.log(contactEmail)

    const newData = {
        id: cachedData.length + 1,
        companyName,
        contactEmail,
        companyPlan
    }
    hideModal();
    addNewDataToCache(newData);
    renderTableWithUpdatedData();
    document.getElementById('companyName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('companyPlan').value = 'free';

})

