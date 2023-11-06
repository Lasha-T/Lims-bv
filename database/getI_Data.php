<?php
include('config.php');

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the database
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$data = [];


if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Create a new row with columns in a different order
        $newRow = [
            'id' => $row['id'],
            'productName' => $row['productName'],
            'sku' => $row['sku'],
            'price' => $row['price'],
            'quantity' => $row['quantity'],
            'reserved' => $row['reserved'],
            'purchases' => $row['purchases'],
            'sales' => $row['sales']
        ];

        $data[] = $newRow;
    }
}

// Close the database connection
$conn->close();

// Save the data as a PHP variable
$dataVariable = json_encode($data);

?>
