const table = document.getElementById('inventory-table');
const tbody = table.querySelector('tbody');
const paginationDiv = document.getElementById('pagination');
const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1;

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
        // Capitalize the first letter
        header.textContent = capitalizeFirstLetter(headerText);
        // Assign id name to each <th> element
        header.id = 'th-' + headerText.toLowerCase().replace(' ', '-');

        headerRow.appendChild(header);
    });
    thead.appendChild(headerRow);
}

// Function to generate a table row
function generateTableRow(item) {
    const row = document.createElement('tr');
    const columns = Object.entries(item);

    columns.forEach(([colName, colValue]) => {
        if (colName === 'id') {
            return; // Skip the 'id' column
        }
        const cell = document.createElement('td');
        cell.classList.add('td-' + colName);

        if (['quantity', 'price', 'purchases', 'sales'].includes(colName)) {
            cell.classList.add('number-columns');
        }

        cell.textContent = colValue;
        row.appendChild(cell);
    });

    return row;
}

// Function to generate the table rows (tbody)
function generateTableRows(data) {
    // Clear the table body
    tbody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    data.slice(startIndex, endIndex).forEach((item) => {
        tbody.appendChild(generateTableRow(item));
    });
}

// Function to update the pagination controls
function createPaginationButton(text, clickHandler, isDisabled = false) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add('button-style');
    button.addEventListener('click', clickHandler);
    button.disabled = isDisabled;
    return button;
}

function updatePagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    paginationDiv.innerHTML = '';

    function addPageButton(text, page) {
        paginationDiv.appendChild(createPaginationButton(text, () => {
            currentPage = page;
            updateTablePage(data);
            updatePagination(data);
        }, page === currentPage || page < 1 || page > totalPages));
    }


    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    addPageButton('<<', 1);
    addPageButton('<', currentPage - 1);

    for (let page = startPage; page <= endPage; page++) {
        addPageButton(page.toString(), page);
    }

    addPageButton('>', currentPage + 1);
    addPageButton('>>', totalPages);
}

// Function to update the table to display the current page
function updateTablePage(data) {
    generateTableRows(data);
    updatePagination(data);
}

generateTableHeader(data);
updateTablePage(data);
