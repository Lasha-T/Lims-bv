const table = document.getElementById('inventory-table');
const tbody = table.querySelector('tbody');
const paginationDiv = document.getElementById('pagination');
const itemsPerPage = 10; // Number of items to display per page
let currentPage = 1;

// Define columns To Exclude
const keysToExclude = Object.keys(data[0]).slice(2); // Exclude the first two keys

// Function to create show/hide controls dynamically
function createControls() {
    const tableControls = document.getElementById('table-controls');

    keysToExclude.forEach(key => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'show-' + key;
        checkbox.checked = true;
        label.setAttribute('for', 'show-' + key);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1)));
        tableControls.appendChild(label);
    });
}
createControls();

// Data processing function
let dataProcessed;
function processData() {
    let checkboxes = document.querySelectorAll('#table-controls input[type="checkbox"]');
    let newDataProcessed = JSON.parse(JSON.stringify(data));
    //Columns Show/Hide part
    newDataProcessed = newDataProcessed.map(item => {
        keysToExclude.forEach((key, keyIndex) => {
            if (checkboxes[keyIndex] && !checkboxes[keyIndex].checked) {
                if (item.hasOwnProperty(key)) {
                    delete item[key];
                }
            }
        });
        return item;
    });
    dataProcessed = newDataProcessed;
    // Generate table
    updateTablePage(dataProcessed);
}

// Call the function when any of the checkboxes change
let checkboxes = document.querySelectorAll('#table-controls input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', processData);
});


// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to generate the table header (thead)
function generateTableHeader(dataProcessed) {
    const thead = table.querySelector('thead');
    thead.innerHTML = '';
    const headerRow = document.createElement('tr');

    // Extract the column names from the first dataProcessed object, excluding 'id'
    const headers = Object.keys(dataProcessed[0]).filter((headerText) => headerText !== 'id');

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

        if (!['productName', 'sku'].includes(colName)) {
            cell.classList.add('number-columns');
        }

        cell.textContent = colValue;
        row.appendChild(cell);
    });

    return row;
}

// Function to generate the table rows (tbody)
function generateTableRows(dataProcessed) {
    // Clear the table body
    tbody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    dataProcessed.slice(startIndex, endIndex).forEach((item) => {
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

function updatePagination(dataProcessed) {
    const totalPages = Math.ceil(dataProcessed.length / itemsPerPage);

    paginationDiv.innerHTML = '';

    function addPageButton(text, page) {
        paginationDiv.appendChild(createPaginationButton(text, () => {
            currentPage = page;
            updateTablePage(dataProcessed);
            updatePagination(dataProcessed);
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
function updateTablePage(dataP) {
    generateTableHeader(dataP);
    generateTableRows(dataP);
    updatePagination(dataP);
}
// Call the function on page load
processData();
