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
