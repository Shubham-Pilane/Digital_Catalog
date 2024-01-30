# Digital Catalog

## Technologies and Dependencies

- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database used for storing data.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcrypt:** A library for hashing passwords.
- **jsonwebtoken:** A library for generating JSON Web Tokens (JWT) for user authentication.
- **cors:** A middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js applications.

## Product Route

### 1. Get all products
- **Method:** GET
- **Route:** `/product/`
- **Description:** Retrieves all products from the database.

### 2. Create a new product
- **Method:** POST
- **Route:** `/product/add`
- **Description:** Adds a new product to the database. Requires authentication.

### 3. Update a product by ID
- **Method:** PUT
- **Route:** `/product/update/:id`
- **Description:** Updates a product in the database by its ID. Requires authentication.

### 4. Delete a product by ID
- **Method:** DELETE
- **Route:** `/product/delete/:id`
- **Description:** Deletes a product from the database by its ID. Requires authentication.

### 5. Add/post multiple products at one time
- **Method:** POST
- **Route:** `/product/addmultiple`
- **Description:** Adds multiple products to the database at once. Requires authentication.

### 6. Delete Multiple products at a time
- **Method:** DELETE
- **Route:** `/product/deletemultiple`
- **Description:** Deletes multiple products from the database at once. Requires authentication.

## Supplier Route

### 1. Sign up
- **Method:** POST
- **Route:** `/supplier/signup`
- **Description:** Registers a new supplier account.

### 2. Login
- **Method:** POST
- **Route:** `/supplier/login`
- **Description:** Logs in a supplier.

### 3. Get only those products which added by supplier
- **Method:** GET
- **Route:** `/supplier/`
- **Description:** Retrieves products added by the authenticated supplier.

## User Route

### 1. Sign up
- **Method:** POST
- **Route:** `/user/signup`
- **Description:** Registers a new user account.

### 2. Login
- **Method:** POST
- **Route:** `/user/login`
- **Description:** Logs in a user.

## Index File

- Sets up the express application, defines routes, and starts the server.

## Deployment 

This server is deployed on Render 

Deployed Link : https://digitalcatalog.onrender.com/

FrontEnd for this project is Deployed on Netlify

Deployed Link : https://65b8d116aa9615cde51756f0--astonishing-capybara-8c90ec.netlify.app/

