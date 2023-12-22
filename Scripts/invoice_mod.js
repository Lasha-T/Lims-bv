function appendCurrentDate() {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
}

function displayInvoiceModal(selectedProducts) {
  // Set the content of the "invoice-date" span
  document.getElementById("invoice-date").innerText = appendCurrentDate();


  const modal = document.getElementById('createInvoiceModal');
  const overlay = document.getElementById('mo1');
  const selectedProductsTableBody = document.getElementById('selectedProductsTableBody');
  const totalSumSpan = document.getElementById('totalSum');

  // Populate the modal with selected products in a table
  selectedProductsTableBody.innerHTML = '';
  let totalSum = 0;

  selectedProducts.forEach(product => {
    const row = document.createElement('tr');

    // Extract data from the 'data' array based on the product id
    const productData = data.find(item => item.id === product);

    const nameCell = document.createElement('td');
    nameCell.textContent = productData.name;
    nameCell.classList.add('productName'); // Add class "productName"
    row.appendChild(nameCell);

    const quantityCell = document.createElement('td');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = 1;
    quantityInput.value = 1; // Set default quantity to 1
    quantityInput.classList.add('quantity-Input');
    quantityInput.addEventListener('input', updateTotalPrice.bind(null, row, productData.price, totalSumSpan));
    quantityCell.appendChild(quantityInput);
    quantityCell.classList.add('number-columns'); // Add class "number-columns"
    row.appendChild(quantityCell);

    const priceCell = document.createElement('td');
    const price = !isNaN(productData.price) ? productData.price : 'Invalid Price';
    priceCell.textContent = price;
    priceCell.classList.add('number-columns'); // Add class "number-columns"
    row.appendChild(priceCell);

    const totalPriceCell = document.createElement('td');
    const totalPrice = (1 * productData.price * 100 / 100).toString(); // Convert to string without rounding
    totalPriceCell.textContent = totalPrice;
    totalPriceCell.classList.add('number-columns'); // Add class "number-columns"
    row.appendChild(totalPriceCell);

    selectedProductsTableBody.appendChild(row);
    totalSum += parseFloat(totalPrice);
  });

  totalSumSpan.textContent = totalSum.toFixed(2);

  // Display the modal and overlay
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

function updateTotalPrice(row, price, totalSumSpan) {
  const quantityInput = row.querySelector('input');
  const totalPriceCell = row.querySelector('td:last-child');
  const totalSum = document.getElementById('totalSum');

  // Remove characters that are not digits
  quantityInput.value = quantityInput.value.replace(/[^\d]/g, '');

  const quantity = parseInt(quantityInput.value, 10) || 0;
  const totalPrice = Math.round((quantity * price) * 100) / 100;

  totalPriceCell.textContent = totalPrice.toFixed(2); // Rounding for display

  // Update the total sum
  let newTotalSum = 0;
  document.querySelectorAll('#selectedProductsTableBody td:last-child').forEach(cell => {
    newTotalSum += parseFloat(cell.textContent) || 0;
  });

  totalSum.textContent = newTotalSum.toFixed(2); // Rounding for display
}

function closeInvoiceModal() {
  const modal = document.getElementById('createInvoiceModal');
  const overlay = document.getElementById('mo1');

  // Hide the modal and overlay
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

document.getElementById('saveToExcelButton').addEventListener('click', function () {
  saveToExcel("invoiceForm");
});
