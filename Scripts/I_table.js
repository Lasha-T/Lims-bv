
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

function hideColumns(dataProcessed, checkboxesArray) {
    const anyCheckboxUnchecked = checkboxesArray.some(checkbox => !checkbox.checked);
    if (anyCheckboxUnchecked) {
        dataProcessed = dataProcessed.map(item => {
            keysToExclude.forEach((key, keyIndex) => {
                if (checkboxesArray[keyIndex] && !checkboxesArray[keyIndex].checked) {
                    if (item.hasOwnProperty(key)) {
                        delete item[key];
                    }
                }
            });
            return item;
        });
    }
    return dataProcessed;
}

function updateSearchOptions(checkboxesArray) {
    // Clear existing options (except the first one)
    while (searchSelect.options.length > 1) {
        searchSelect.remove(1);
    }
    // Iterate through checkboxes and add options for checked ones
    checkboxesArray.forEach(function (checkbox) {
        if (checkbox.checked) {
            let option = document.createElement("option");
            option.value = checkbox.id.replace("show-", ""); // Remove "show-" prefix
            option.textContent = option.value.charAt(0).toUpperCase() + option.value.slice(1);
            searchSelect.appendChild(option);
        }
    });
}

function updateSelectedOption() {
    // Check if selectedOption value exists in the options, if not, set it to "Name"
    if (![...searchSelect.options].some(option => option.value === selectedOption)) {
        selectedOption = "name";
    }
    // Set the selected option based on the selectedOption variable
    searchSelect.value = selectedOption;
}

function applySearchFilter(dataProcessed) {
    // filtering part
    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText !== '') {
        dataProcessed = dataProcessed.filter(item => {
            if (selectedOption && item[selectedOption]) {
                return item[selectedOption].toLowerCase().includes(searchText);
            }
            return true; // No filtering if no specific option is selected
        });
    }
    return dataProcessed;
}

let selected_Ids = [];
function updateSelectedStatus(dataProcessed) {
    dataProcessed.forEach(item => {
        item.selected = selected_Ids.includes(item.id) ? 1 : 0;
    });
}

// Attach a click event listener to the table
const table = document.getElementById('inventory-table');
table.addEventListener('click', function (event) {
    const target = event.target;
    // Check if the clicked element is a cell within a row
    if (target.tagName === 'TD' && target.parentElement.tagName === 'TR') {
        const selectedRow = target.parentElement;
        const dataId = selectedRow.getAttribute('data-id');
        if (dataId) {
            // Check if dataId is already in the selected_Ids array
            const index = selected_Ids.indexOf(dataId);
            if (index === -1) {
                // DataId is not in the array, so add it
                selected_Ids.push(dataId);
            } else {
                // DataId is already in the array, so remove it
                selected_Ids.splice(index, 1);
            }
            processData();
        }
    }
});

// Call the function when any of the checkboxes change
let checkboxes = document.querySelectorAll('#table-controls input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', processData);
});

// Call the function on search input
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function() {
    currentPage = 1;
    processData();
});
// Add an onchange event handler for searchSelect to update selectedOption
let selectedOption = "Name";
const searchSelect = document.getElementById("selectSearch");
searchSelect.addEventListener("change", function() {
    selectedOption = searchSelect.value;
    processData();
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
        const cell = document.createElement('td');
        cell.classList.add('td-' + colName);

        if (!['name', 'sku', 'descr'].includes(colName)) {
            cell.classList.add('number-columns');
        }

        if (colName === 'id') {
            row.setAttribute('data-id', colValue); // Set data-id attribute for the row
            return; // Skip creating a cell for 'id' column
        }

        if (colName === 'selected') {
            if(colValue == 1)
              row.classList.add('selectedRow');
            return; // Skip creating a cell for 'selected' column
        }

        cell.textContent = colValue;
        row.appendChild(cell);
    });

    return row;
}


// Function to generate the table rows (tbody)
const tbody = table.querySelector('tbody');
const itemsPerPage = 10; // Number of items to display per page
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

const paginationDiv = document.getElementById('pagination');
let currentPage = 1;

function updatePagination(dataProcessed) {
    const totalPages = Math.ceil(dataProcessed.length / itemsPerPage);

    paginationDiv.innerHTML = '';

    function addPageButton(text, page) {
        paginationDiv.appendChild(createPaginationButton(text, () => {
            currentPage = page;
            updateTablePage(dataProcessed);
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
    generateTableRows(dataP);
    updatePagination(dataP);
}

// Data processing function
function processData() {
    let dataProcessed = JSON.parse(JSON.stringify(data));

    // Columns Show/Hide
    const checkboxesArray = Array.from(checkboxes);
    dataProcessed = hideColumns(dataProcessed, checkboxesArray);

    // Table header
    generateTableHeader(dataProcessed);

    // Select
    updateSelectedStatus(dataProcessed);

    // Search
    updateSearchOptions(checkboxesArray);
    updateSelectedOption();
    dataProcessed = applySearchFilter(dataProcessed);

    // Pages
    updateTablePage(dataProcessed);
}
// Call the function on page load
processData();
