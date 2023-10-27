const table = document.getElementById('inventory-table');
const tbody = table.querySelector('tbody');
const paginationDiv = document.getElementById('pagination');
const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1;

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

    return row;
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
    // Clear the table body
    tbody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    data.slice(startIndex, endIndex).forEach((item) => {
        tbody.appendChild(generateTableRow(item));
    });
}


// Function to update the pagination controls
function updatePagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Clear the paginationDiv
    paginationDiv.innerHTML = '';

    // Calculate the start and end of the page buttons
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

    // Add "<<" button
    const firstButton = document.createElement('button');
    firstButton.textContent = '<<';
    firstButton.classList.add('button-style');
    firstButton.addEventListener('click', () => {
        currentPage = 1;
        updateTablePage(data);
        updatePagination(data);
    });
    if (currentPage === 1) {
        firstButton.disabled = true; // Disable the button
    }
    paginationDiv.appendChild(firstButton);

    // Add "<" button
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('button-style');
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTablePage(data);
            updatePagination(data);
        }
    });
    if (currentPage === 1) {
        prevButton.disabled = true; // Disable the button
    }
    paginationDiv.appendChild(prevButton);

    // Add page buttons
    for (let page = startPage; page <= endPage; page++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = page;
        pageButton.classList.add('button-style');
        pageButton.addEventListener('click', () => {
            currentPage = page;
            updateTablePage(data);
            updatePagination(data);
        });
        if (page === currentPage) {
            pageButton.disabled = true;
        }
        paginationDiv.appendChild(pageButton);
    }

    // Add ">" button
    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('button-style');
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateTablePage(data);
            updatePagination(data);
        }
    });
    if (currentPage === totalPages) {
        nextButton.disabled = true; // Disable the button
    }
    paginationDiv.appendChild(nextButton);

    // Add ">>" button
    const lastButton = document.createElement('button');
    lastButton.textContent = '>>';
    lastButton.classList.add('button-style');
    lastButton.addEventListener('click', () => {
        currentPage = totalPages;
        updateTablePage(data);
        updatePagination(data);
    });
    if (currentPage === totalPages) {
        lastButton.disabled = true; // Disable the button
    }
    paginationDiv.appendChild(lastButton);
}

// Function to update the table to display the current page
function updateTablePage(data) {
    generateTableRows(data);
    updatePagination(data);
}

generateTableHeader(data);
updateTablePage(data);
