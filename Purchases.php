<!DOCTYPE html>
<html>
<head>
    <title>LimsBV</title>
    <link rel="stylesheet" type="text/css" href="styles/shared.css">

</head>
<body>
  <?php include "sections\header.html" ?>
    <div class="main-container">
      <?php include "sections\menu.html" ?>

        <div class="container">
          <!-- content starts from here-->
          <h4>Purchases</h4>

          <?php include 'database\getP_Data.php'; ?>

          <!-- content ends here -->
        </div>
    </div>

<script src="scripts/menu.js"></script>

</body>
</html>
