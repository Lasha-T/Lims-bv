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
          <div id="controls-container">
              <div id="table-controls">
                  <!-- Controls will be generated dynamically here -->
              </div>
              <div id="search-container">
                  <input type="text" id="search" placeholder="Search...">
                  <span>in</span>
                  <select id="selectSearch">
                    <option value="name">Name</option>
                    <!-- Options will be dynamically generated here -->
                  </select>
              </div>
          </div>
          <table id="inventory-table">
            <thead>
              <!-- header created dynamically -->
            </thead>
            <tbody>
              <!-- pages created dynamically -->
            </tbody>
          </table>
          <div id="pagination">
              <!-- Page buttons will be added dynamically -->
          </div>
          <div class="row">
            <div class="column column-2">

            </div>
            <div class="column column-2">
              <div id="showSelected">
                <!-- table created dynamically -->
              </div>
            </div>
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
