# Vending Machine App

Welcome to the Vending Machine App, a comprehensive solution for both buyers and sellers. This project comprises a RESTful server and a user-friendly client that provide seamless interactions for users.

### About
The Vending Machine App caters to two types of users: buyers and sellers. Here's what each user can do:

#### Buyers
- Register and log in to the system.
- Deposit 5, 10, 20, 50, and 100 cent coins into their vending machine account.
- Browse and search for products.
- Purchase products using their deposited money.
- View total spent, products purchased, and received change.

#### Sellers
- Register and log in as a seller.
- Add new products with details like name, cost, and availability.
- Edit or delete the products they've added.

## How to Run

To run the entire application, including both the backend server and the frontend client, follow these steps:

1. Open a terminal window.
2. Navigate to the root directory of the project.
3. Run the following command to start the backend server and frontend client concurrently:

### `yarn server`

### `yarn client`



### Backend Features
The backend handles the core functionality of the vending machine system:

- REST API that consumes and produces data in JSON format.
- Product and User models:
  - Product: `amountAvailable`, `cost`, `productName`, `sellerId`
  - User: `username`, `password`, `deposit`, `role`
- Authentication using JSON Web Tokens (JWT).
- CRUD operations for users:
  - User registration (`POST /user`).
  - Retrieval, update, and deletion.
- CRUD operations for products:
  - GET: Accessible to everyone for viewing products.
  - POST, PUT, DELETE: Limited to the seller user who created the product.
- `/deposit` endpoint for buyers to add coins to their account.
- `/buy` endpoint for buyers to purchase products using deposited money.
- `/reset` endpoint for buyers to reset their deposited amount.



### Frontend Features
The frontend provides an intuitive interface for users to interact with the vending machine:

- User registration and login functionality.
- Clear navigation using a hamburger menu.
- Product listing with infinite scroll for convenient browsing.
- Search bar with filtering options for product search.
- Display of user's deposited amount and role.
- Buy products and view spent amount and received change.
- Reset deposited amount to 0.
- User profile management, including updating user information and account deletion.


## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

### Frontend
- React.js
- React Router
- Material-UI
- Axios

## Developer
- Marco Capurri
  
## License

This project is licensed under the [MIT License](LICENSE).
