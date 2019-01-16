DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 product_name VARCHAR(50) NOT NULL,
 department_name VARCHAR(30) NOT NULL,
 price DECIMAL (10,2) NULL,
 stock_quantity INT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Sabbath Album", "Music", 39.99, 3),
        ("microwave", "Appliances", 225.75, 100),
        ("Equalizer 2", "Video", 14.99, 128),
        ("soccer ball", "sports", 28.32, 50),
        ("Red Dead Redemtion", "Game", 45.99, 1125),
        ("Sony Record Player", "Music", 345.88, 7),
        ("Game of Thrones Board Game", "Games", 75.85, 18),
        ("lazy boy", "Furniture", 400.12, 17),
        ("Petzel Grigri", "Sports", 99.99, 55),
        ("potatoe chips", "Food", 3.25, 2005);

