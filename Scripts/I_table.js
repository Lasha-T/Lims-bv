
const table = document.getElementById('inventory-table');
const tbody = table.querySelector('tbody');

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to generate the table header (thead)
function generateTableHeader(data) {
    const thead = table.querySelector('thead');
    const headerRow = document.createElement('tr');

    // Extract the column names from the first data object, excluding 'id'
    const headers = Object.keys(data[0]).filter((headerText) => headerText !== 'id');

    headers.forEach((headerText) => {
        const header = document.createElement('th');
        header.textContent = capitalizeFirstLetter(headerText); // Capitalize the first letter
        headerRow.appendChild(header);
    });

    thead.appendChild(headerRow);
}

// Function to generate the table rows (tbody)
function generateTableRows(data) {
    data.forEach((item) => {
        const row = document.createElement('tr');
        const columns = Object.entries(item);

        columns.forEach(([colName, colValue]) => {
            if (colName === 'id') {
                return; // Skip the 'id' column
            }

            const cell = document.createElement('td');

            if (colName === 'sku') {
                cell.classList.add('product-sku');
            } else if (colName === 'productName') {
                cell.classList.add('name-column');
            } else if (['quantity', 'price', 'purchases', 'sales'].includes(colName)) {
                cell.classList.add('number-columns');
            }

            cell.textContent = colValue;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}

generateTableHeader(data);
generateTableRows(data);
