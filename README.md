# Outfitter Shopping API

This is a robust e-commerce API built with Node.js, Express, and TypeScript. It provides endpoints for user authentication, product management, order processing, and payment integration.

## Features

- User authentication (signup, login, logout)
- Product management (CRUD operations)
- Order processing
- Shopping cart functionality
- Payment integration with Stripe
- Category management
- User reviews for products

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- SQLite (for development)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Hard265/outfitter-api.git
   cd shopping-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. Run database migrations:
   ```
   npm run migrate
   ```

## Usage

To start the server in development mode:

```
npm run dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/login`: Login to an existing account
- `POST /api/auth/logout`: Logout the current user

### Products
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product (admin only)
- `PUT /api/products/:id`: Update a product (admin only)
- `DELETE /api/products/:id`: Delete a product (admin only)

### Orders
- `GET /api/orders`: Get all orders for the current user
- `GET /api/orders/:id`: Get a specific order
- `POST /api/orders`: Create a new order

### Cart
- `GET /api/cart`: Get the current user's cart
- `POST /api/cart`: Add an item to the cart
- `PUT /api/cart/:itemId`: Update a cart item
- `DELETE /api/cart/:itemId`: Remove an item from the cart

### Categories
- `GET /api/categories`: Get all categories
- `POST /api/categories`: Create a new category (admin only)
- `PUT /api/categories/:id`: Update a category (admin only)
- `DELETE /api/categories/:id`: Delete a category (admin only)

### Reviews
- `GET /api/products/:id/reviews`: Get all reviews for a product
- `POST /api/products/:id/reviews`: Create a new review for a product

### Payments
- `POST /api/payments/create-payment-intent`: Create a payment intent for an order
- `POST /api/payments/webhook`: Stripe webhook endpoint

## Testing

To run the test suite:
```
npm test
```
## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
