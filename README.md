📘 Book Catalog API

Live Base URL:

https://book-catalog-api-ns6e.onrender.com

Project Overview:

Book Catalog API is a secure RESTful backend service that allows users to register, login, and manage a collection of books.
All book-related operations are protected using JWT-based authentication stored securely in HTTP-only cookies.

Tech Stack:

Node.js

Express.js

MongoDB Atlas

JWT Authentication

Cookie-based Sessions

Render Cloud Deployment

Step 1: Clone & Install
git clone <url>
cd book-catalog-api
npm install

Step 2: Environment Configuration
Create .env file:
PORT=5000
MONGO_URI=mongodb://localhost:27017/book_catalog_db
JWT_SECRET=your_secret_key
JWT_EXPIRE=JWT_EXPIRY

Step 3: Start Services:
Start Server (Development)
npm run dev

Production
npm start

Authentication APIs:

Register User

POST /api/users/register


Request Body:

{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}


Login User

POST /api/users/login


Response:

{
  "message": "Login successful"
}


Book APIs (Protected Routes):

Add Book

POST /api/books


Get All Books

GET /api/books


Get Single Book

GET /api/books/:id


Update Book

PUT /api/books/:id


Delete Book

DELETE /api/books/:id

Health Check
GET /health

How to Test in Postman

Register a user

Login using /api/users/login

Deployment:
Render.com
Step 1: Create Web Service
Connect GitHub repository.

Step 2: Environment Variables
Add:
MONGO_URI

JWT_SECRET

JWT_EXPIRY

Step 3: Deploy
Build Command: npm install
Start Command: npm start

