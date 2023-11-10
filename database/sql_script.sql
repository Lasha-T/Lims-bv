-- Create a table named 'products'
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    sku VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    purchases INT NOT NULL,
    sales INT NOT NULL
);

-- Insert data from the 'data' variable into the table
INSERT INTO products (productName, sku, price, quantity, purchases, sales) VALUES
    ('Product 1', 'SKU001', 10.00, 100, 50, 25),
    ('Product 2', 'SKU002', 20.00, 75, 30, 40);
-- Add more INSERT statements for additional data

-- Insert 100 random records into the 'products' table
INSERT INTO products (productName, sku, price, quantity, purchases, sales)
SELECT
    CONCAT('Product ', FLOOR(RAND() * 1000)) AS productName,
    CONCAT('SKU', LPAD(FLOOR(RAND() * 1000), 3, '0')) AS sku,
    ROUND(RAND() * 100, 2) AS price,
    FLOOR(RAND() * 1000) AS quantity,
    FLOOR(RAND() * 1000) AS purchases,
    FLOOR(RAND() * 1000) AS sales
FROM
    (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL
     SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) AS t1
JOIN
    (SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL
     SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10) AS t2
-- Adjust the number of random records as needed
LIMIT 100;

-- Add new column reserved
ALTER TABLE products
ADD COLUMN reserved INT NOT NULL;

UPDATE products
SET reserved = FLOOR(RAND() * 121);

-- Add new column description
ALTER TABLE products
ADD COLUMN description VARCHAR(255) AFTER productName;

UPDATE products
SET description = CASE
    WHEN RAND() < 0.2 THEN 'red'
    WHEN RAND() < 0.4 THEN 'blue'
    WHEN RAND() < 0.6 THEN 'green'
    WHEN RAND() < 0.8 THEN 'yellow'
    ELSE 'gray'
END;
