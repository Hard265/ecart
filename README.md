# Ecart Server

This is the backend for the Ecart project, which handles authentication, product listings, and transactions for a seamless online marketplace. The server is built using **Node.js**, **Express**, **Sequelize**, and **JWT** for authentication.

## Features

- User authentication (signup, login, JWT-based sessions)
- Product listing (add, view, update, delete)
- Cart management
- Order processing
- API to interact with the Ecart mobile app

## Tech Stack

- **Node.js**
- **Express.js**
- **Sequelize ORM** (for database management)
- **JWT** (for secure authentication)
- **PostgreSQL/MySQL/SQLite3** (supported databases)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Hard265/ecart.gi
   ```
2. Install dependencies
   ```bash
   cd ecart
   npm install
   ```
3. Configure environment variables by creating a `.env` file at the root of the project with the following
   ```text
     DATABASE_URL=<your-database-url>
   JWT_SECRET=<your-jwt-secret>
   PORT=<server-port>
   ```
4. start server
   ```bash
   npm start
   ```
