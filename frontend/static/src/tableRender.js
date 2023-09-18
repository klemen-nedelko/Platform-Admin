class TableRender {

    constructor() {
        this.tableBody = document.querySelector('#table tbody');
        this.currentFilter = 'all';
    }
    filterData(data, filter) {
        return data.filter((item) => {
            if (filter === 'all') {
                return true
            }
            return item.companyPlan === filter;
        });
    }

    renderTable(data, config, containerId) {

        let columns = [];
        let table = document.createElement('table');
        table.id = 'table';
        table.classList.add('table')

        let thead = document.createElement('thead');
        thead.classList.add('table-head');
        let trHeader = document.createElement('tr');
        trHeader.classList.add('font-table');

        // NOTE: We assume that all `data` objects have the same keys!
        for (let keyName in data[0]) {
            if (config[keyName]) {
                columns.push({ colKey: keyName, colName: config[keyName] });

                let th = document.createElement('th');
                th.classList.add(`table-${keyName.toLowerCase()}`);
                th.innerHTML = config[keyName];
                trHeader.appendChild(th);
            }
        }
        thead.appendChild(trHeader);
        table.appendChild(thead);

        let tbody = document.createElement('tbody');
        tbody.classList.add('table-body-style')

        if (data.length === 0) {
            let noDataRow = document.createElement('tr');
            noDataRow.id = 'noDataRow';

            let noDataCell = document.createElement('td');
            noDataCell.colSpan = columns.length;
            noDataCell.classList.add('no-data', 'font-no-data');
            noDataCell.innerHTML = 'No data...';

            noDataRow.appendChild(noDataCell);

            tbody.appendChild(noDataRow);
        } else {
            for (let item of data) {
                let tr = document.createElement('tr');

                tr.classList.add('table-body-style');
                tr.classList.add('font-table');

                for (let col of columns) {
                    let td = document.createElement('td');

                    td.innerHTML = item[col.colKey];
                    tr.appendChild(td);

                    if (col.colKey === 'id') {
                        td.classList.add('table-id');

                    } else if (col.colKey === 'companyName') {

                        td.classList.add('table-company-name');
                        td.classList.add('font-primary')
                    }
                }
                tbody.appendChild(tr);
            }

        }

        table.appendChild(tbody);
        let tableContainer = document.getElementById(containerId);
        tableContainer.innerHTML = ''; //Clear table
        tableContainer.appendChild(table);
    }

}

export default TableRender;