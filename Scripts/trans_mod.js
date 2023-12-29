// Open the modal
let activeModal, the_Name, msg_word;
function displayTransactionModal(selectedProduct, button_Name) {
    activeModal = button_Name;
    if(activeModal === 'Purchase'){
      the_Name = 'Seller Name';
      msg_word = 'purchasing';
    }
    else if (activeModal === 'Sell'){
      the_Name = 'Buyer Name';
      msg_word = 'selling';
    }

    document.getElementById('transactionModal').style.display = 'block';
    document.getElementById('mo2').style.display = 'block';

    var selectedObject = data.find(function(obj) {
        return obj.id == selectedProduct;
    });

    document.getElementById('modalName').innerHTML = activeModal;
    document.getElementById('transactiondate').value = appendCurrentDate();
    document.getElementById('productName').value = selectedObject.name;
    document.getElementById('theNameLabel').textContent = the_Name;
    document.getElementById('submitButton').textContent = activeModal;
}

// Close the modal
function closeTransactionModal() {
  document.getElementById('transactionModal').style.display = 'none';
  document.getElementById('mo2').style.display = 'none';
}

function updateTotal() {
    // Get the quantity and price values
    var quantity = document.getElementById('quantity').value;
    var price = document.getElementById('price').value;

    // Calculate the total price
    var totalPrice = quantity * price;

    // Update the total price input field
    document.getElementById('totalPrice').value = totalPrice;
}

function validateForm() {
    // Check the validity of the form
    var form = document.getElementById('transactionForm');
    return form.checkValidity();
}

function submitB(){
  // Validate the form before processing the purchase
  if (validateForm()) {
      // Retrieve values from the form
      const pdate = document.getElementById('transactiondate').value;
      const theName = document.getElementById('theName').value;
      const quantity = document.getElementById('quantity').value;
      const price = document.getElementById('price').value;

      //XMLHttpRequest logic
       var selected_id = selected_Ids;
       var updateObject = {
           pdate: pdate,
           qty: quantity,
           price: price
       };
       let url;
       if (activeModal === 'Purchase') {
           updateObject.sellN = theName;
           url = "database/insert_purchase.php";
       } else if (activeModal === 'Sell'){
           updateObject.buyN = theName;
           url = "database/insert_sell.php";
       }

       var xhr = new XMLHttpRequest();
       xhr.open("POST", url, true);
       xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

       xhr.onreadystatechange = function() {
           if (xhr.readyState == 4) {
               if (xhr.status == 200) {
                   alert("Success: \n" + xhr.responseText);
               } else {
                   alert("Error: \n" + xhr.status + " " + xhr.statusText);
               }
           }
       };

       var sdata = "selected_id=" + selected_id + "&updateObject=" + encodeURIComponent(JSON.stringify(updateObject));
       xhr.send(sdata);


  } else {
      alert("Please fill out the form correctly before "+ msg_word +".");
  }

  // Returns false to prevent the form from submitting
  return false;
}
