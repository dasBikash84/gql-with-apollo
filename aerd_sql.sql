-- Users Table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for each user.',
    first_name VARCHAR(100) NOT NULL COMMENT 'User\'s first name.',
    last_name VARCHAR(100) NOT NULL COMMENT 'User\'s last name.',
    email VARCHAR(255) UNIQUE NOT NULL COMMENT 'User\'s email address.',
    password_hash VARCHAR(255) NOT NULL COMMENT 'Hashed password for security.',
    phone_number VARCHAR(15) COMMENT 'User\'s phone number.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Account creation timestamp.',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp.'
) COMMENT = 'Stores information about users including personal details and account data.';

-- Addresses Table
CREATE TABLE addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique address identifier.',
    user_id INT COMMENT 'Foreign key to the user who owns the address.',
    address_line1 VARCHAR(255) NOT NULL COMMENT 'Primary address line (e.g., Street address).',
    address_line2 VARCHAR(255) COMMENT 'Secondary address line (e.g., Apartment, Suite).',
    city VARCHAR(100) NOT NULL COMMENT 'City.',
    state VARCHAR(100) COMMENT 'State or region.',
    postal_code VARCHAR(20) NOT NULL COMMENT 'Postal/ZIP code.',
    country VARCHAR(100) NOT NULL COMMENT 'Country.',
    phone_number VARCHAR(15) COMMENT 'Contact phone number for the address.',
    is_default BOOLEAN DEFAULT FALSE COMMENT 'Flag to indicate if this is the default address.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the address was added.',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when the address was last updated.',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX (user_id) COMMENT 'Index for faster lookups by user_id.'
) COMMENT = 'Stores address information for users, including billing and shipping addresses. \'user_id\' field have Foreign key relationship with the users table \'user_id\' field';

-- Categories Table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for each product category.',
    _name VARCHAR(100) NOT NULL COMMENT 'Category name (e.g., Electronics, Clothing).',
    _description TEXT COMMENT 'A detailed description of the category.',
    parent_category_id INT COMMENT 'Foreign key to the parent category, used for subcategories. Foreign key reference to self for subcategories.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Category creation timestamp.',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp.',
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id),
    INDEX (parent_category_id) COMMENT 'Index for faster lookups by parent category.'
) COMMENT = 'Stores information about product categories including subcategories and descriptions.';

-- Products Table

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for each product.',
    _name VARCHAR(255) NOT NULL COMMENT 'Product name.',
    _description TEXT COMMENT 'Detailed description of the product.',
    price DECIMAL(10, 2) NOT NULL COMMENT 'Price of the product (2 decimal places).',
    stock_quantity INT DEFAULT 0 COMMENT 'Available stock quantity for the product.',
    category_id INT COMMENT 'Foreign key to product categories.',
    image_url VARCHAR(255) COMMENT 'Link to the product image.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Product creation timestamp.',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp.',
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    INDEX (category_id) COMMENT 'Index for faster lookups by category_id.'
) COMMENT = 'Stores product information for the e-commerce application, including details and pricing.';

-- Orders Table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique order identifier.',
    user_id INT COMMENT 'Foreign key to the user who placed the order.',
    total_price DECIMAL(10, 2) NOT NULL COMMENT 'Total price of the order.',
    shipping_address TEXT COMMENT 'Shipping address for the order.',
    order_status VARCHAR(50) DEFAULT 'Pending' COMMENT 'Current status of the order (e.g., Pending, Shipped, Delivered).',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Order placement timestamp.',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp.',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX (user_id) COMMENT 'Index for faster lookups by user_id.'
) COMMENT = 'Stores order details, including customer, status, and shipping information.';

-- Order Items Table
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique order item identifier.',
    order_id INT COMMENT 'Foreign key to the orders table.',
    product_id INT COMMENT 'Foreign key to the products table.',
    quantity INT NOT NULL COMMENT 'Quantity of the product in the order.',
    unit_price DECIMAL(10, 2) NOT NULL COMMENT 'Price of a single unit of the product at the time of purchase.',
    total_price DECIMAL(10, 2) NOT NULL COMMENT 'Total price for this item (quantity * unit price).',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the item was added to the order.',
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX (order_id) COMMENT 'Index for faster lookups by order_id.',
    INDEX (product_id) COMMENT 'Index for faster lookups by product_id.'
) COMMENT = 'Stores individual items in an order, linking products to specific orders and quantities.';

-- Payments Table
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique payment identifier.',
    order_id INT COMMENT 'Foreign key to the orders table.',
    payment_method VARCHAR(50) COMMENT 'Payment method used (e.g., Credit Card, PayPal).',
    payment_status VARCHAR(50) DEFAULT 'Pending' COMMENT 'Status of the payment (e.g., Pending, Completed, Failed).',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date and time of the payment.',
    amount DECIMAL(10, 2) NOT NULL COMMENT 'Total payment amount.',
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    INDEX (order_id) COMMENT 'Index for faster lookups by order_id.'
) COMMENT = 'Stores payment details for orders, including payment method and status.';

-- Product Reviews Table
CREATE TABLE product_reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique review identifier.',
    user_id INT COMMENT 'Foreign key to the user who left the review.',
    product_id INT COMMENT 'Foreign key to the reviewed product.',
    rating INT CHECK (rating BETWEEN 1 AND 5) COMMENT 'Rating between 1 and 5.',
    review_text TEXT COMMENT 'Text of the review.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the review was created.',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX (product_id) COMMENT 'Index for faster lookups by product_id.',
    INDEX (user_id) COMMENT 'Index for faster lookups by user_id.'
) COMMENT = 'Stores user reviews for products, including ratings and review text.';

-- Shopping Cart Table
CREATE TABLE shopping_cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique cart identifier.',
    user_id INT COMMENT 'Foreign key to the user who owns the cart.',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the cart was created.',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Timestamp when the cart was last updated.',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX (user_id) COMMENT 'Index for faster lookups by user_id.'
) COMMENT = 'Stores shopping cart details for each user, including cart items.';

--  Shopping Cart Items Table
CREATE TABLE shopping_cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique cart item identifier.',
    cart_id INT COMMENT 'Foreign key to the shopping cart.',
    product_id INT COMMENT 'Foreign key to the products table.',
    quantity INT NOT NULL COMMENT 'Quantity of the product in the cart.',
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Timestamp when the item was added to the cart.',
    FOREIGN KEY (cart_id) REFERENCES shopping_cart(cart_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX (cart_id) COMMENT 'Index for faster lookups by cart_id.',
    INDEX (product_id) COMMENT 'Index for faster lookups by product_id.'
) COMMENT = 'Stores the items added to a shopping cart, linking products to the user\'s cart.';








