<!DOCTYPE html>
<html>
<head>
    <title>LimsBV</title>
    <link rel="stylesheet" type="text/css" href="styles/shared.css">
    <link rel="stylesheet" type="text/css" href="styles/inventory.css">
</head>
<body>
  <!-- Include the PHP file to set the PHP variable -->
<?php include 'database\getI_Data.php'; ?>

  <?php include "sections\header.html" ?>
    <div class="main-container">
      <?php include "sections\menu.html" ?>

        <div class="container">
          <!-- content starts from here-->
          <h4>Inventory</h4>
          <table id="inventory-table">
            <thead>

            </thead>
            <tbody>

            </tbody>
          </table>

          <div id="pagination">
              <!-- Pagination controls will be generated here -->
          </div>

          <!-- content ends here -->
        </div>
    </div>

<script>
    var data = <?php echo $dataVariable; ?>;
</script>
<script src="Scripts/menu.js"></script>
<script src="Scripts/I_table.js"></script>
</body>
</html>
