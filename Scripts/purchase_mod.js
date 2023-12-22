// Open the modal
function displayPurchaseModal(selectedProduct) {
    document.getElementById('purchaseModal').style.display = 'block';
    document.getElementById('mo2').style.display = 'block';

    var selectedObject = data.find(function(obj) {
        return obj.id == selectedProduct;
    });

    document.getElementById('productName').value = selectedObject.name;
    document.getElementById('purchasedate').value = appendCurrentDate();
}

// Close the modal
function closePurchaseModal() {
  document.getElementById('purchaseModal').style.display = 'none';
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
    var form = document.getElementById('purchaseForm');
    return form.checkValidity();
}

function purchaseProduct(){
  // Validate the form before processing the purchase
  if (validateForm()) {
      // Retrieve values from the form
      const pdate = document.getElementById('purchasedate').value;
      const sellerName = document.getElementById('sellerName').value;
      const quantity = document.getElementById('quantity').value;
      const price = document.getElementById('price').value;

      //XMLHttpRequest logic
       var selected_id = selected_Ids;
       var updateObject = {
           pdate: pdate,
           sellN: sellerName,
           qty: quantity,
           price: price
       };

       var xhr = new XMLHttpRequest();
       var url = "database/insert_purchase.php";
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

       // alert("Purchase successful!");
  } else {
      alert("Please fill out the form correctly before purchasing.");
  }

  // Returns false to prevent the form from submitting
  return false;
}
