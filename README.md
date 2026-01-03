# Book Catalog API

## Live Base URL
https://book-catalog-api-ns6e.onrender.com

## Project Overview
Book Catalog API is a secure RESTful backend service that allows users to register, login, and manage a collection of books.

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Cookie-based Sessions
- Render Cloud Deployment

## Clone & Install
git clone <url>
cd book-catalog-api
npm install

## Initialize npm project
npm init -y

## Install required dependencies
npm install express mongoose jsonwebtoken bcryptjs dotenv express-rate-limit cookie-parser

## Install development dependencies
npm install --save-dev nodemon

## Authentication APIs

POST /api/users/register

POST /api/users/login

## Book APIs

POST /api/books  
GET /api/books  
GET /api/books/:id  
PUT /api/books/:id  
DELETE /api/books/:id  

## How to Test in Postman

Register a user

Login using /api/users/login

## Deployment:
Render.com
### Step 1: Create Web Service
Connect GitHub repository.

### Step 2: Environment Variables
Add:
MONGO_URI

JWT_SECRET

JWT_EXPIRY

### Step 3: Deploy
Build Command: npm install
Start Command: npm start
Start Command: npm start

