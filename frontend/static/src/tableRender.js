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

    renderTable(data = []) {
        this.tableBody.innerHTML = '';
        const filteredData = this.filterData(data, this.currentFilter);

        if (data.length === 0) {
            const noDataRow = document.createElement("tr");
            noDataRow.id = "noData";

            const noDataCell = document.createElement("td");
            noDataCell.colSpan = 5;
            noDataCell.className = "no-data font-no-data";
            noDataCell.textContent = "No data...";

            noDataRow.appendChild(noDataCell);
            this.tableBody.appendChild(noDataRow);
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

                this.tableBody.appendChild(row);
            });
        }
    }
}

export default TableRender;