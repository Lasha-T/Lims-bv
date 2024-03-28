<!DOCTYPE html>
<html>
<head>
    <title>LimsBV</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" type="text/css" href="styles/shared.css">
    <link rel="stylesheet" type="text/css" href="styles/dashboard.css">

</head>
<body>
  <?php include 'database/getD_Data.php'; ?>

  <?php include "sections/header.html" ?>
    <div class="main-container">
      <?php include "sections/menu.html" ?>

        <div class="container">
          <!-- content starts from here-->
          <h4>Dashboard</h4>

          <div class="dashboard-item">
              <h2>Total number of products</h2>
              <p><?php echo getTotalProducts($conn);?> products</p>
          </div>
          <div class="dashboard-item">
            <h2>Total number of purchases</h2>
            <?php
                $totalPurchases = getTotalPurchases($conn);
                echo "<p> {$totalPurchases['totalPurchases']} purchases of {$totalPurchases['totalRecords']} products</p>";
            ?>
          </div>
          <div class="dashboard-item">
              <h2>Total number of sales</h2>
              <?php
                  $totalSales = getTotalSales($conn);
                  echo "<p> {$totalSales['totalSales']} sales of {$totalSales['totalRecords']} products</p>";
              ?>
          </div>

          <?php
          // Close the database connection
          $conn->close();
          ?>

          <!-- content ends here -->
        </div>
    </div>

<script src="scripts/menu.js"></script>

</body>
</html>
