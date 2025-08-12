# News Aggregator API

A RESTful API for news aggregation with user authentication, preferences management, and news retrieval capabilities.

## Overview

This News Aggregator API provides a complete solution for news management with the following capabilities:

- **User Authentication**: Secure user registration and login with JWT tokens
- **User Preferences**: Manage user news preferences and categories
- **News Retrieval**: Get personalized news based on user preferences from GNews API
- **Data Validation**: Robust input validation and error handling
- **In-Memory Storage**: JSON-based user data storage
- **Testing**: Comprehensive test suite with tap framework

## Features

### Core Features
- ✅ User registration and authentication
- ✅ JWT token-based security (1 hour expiration)
- ✅ User preferences management
- ✅ News retrieval from GNews API
- ✅ Password hashing and validation
- ✅ Input validation and error handling

### Advanced Features
- ✅ Secure password handling with bcrypt
- ✅ Token-based authorization middleware
- ✅ User preference customization
- ✅ News filtering by user preferences
- ✅ Comprehensive error handling
- ✅ Email format validation

## Installation and Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)
- GNews API key (for news retrieval)

### Setup Instructions

1. **Clone or navigate to the project directory:**
```bash
cd news-aggregator-api-nik-1207
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
```env
JWT_SECRET=your-super-secret-jwt-key-here
API_KEY=your-gnews-api-key-here
```

4. **Run tests:**
```bash
npm test
```

## API Endpoints

### Authentication Endpoints

#### POST /users/signup
Register a new user account.

**Request Body:**
```json
{
  "name": "Clark Kent",
  "email": "clark@superman.com",
  "password": "Krypt()n8",
  "preferences": ["movies", "comics"]
}
```

**Validation Rules:**
- `name`: Required, minimum 3 characters, non-empty string
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters
- `preferences`: Optional, must be an array

**Success Response (200):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "Clark Kent",
    "email": "clark@superman.com",
    "preferences": ["movies", "comics"]
  }
}
```

**Error Response (400):**
```json
{
  "message": "Email, password and name are required"
}
```

**Error Response (409):**
```json
{
  "message": "User already exists"
}
```

#### POST /users/login
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "clark@superman.com",
  "password": "Krypt()n8"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "message": "Email and password are required"
}
```

**Error Response (401):**
```json
{
  "message": "Invalid password"
}
```

**Error Response (404):**
```json
{
  "message": "User not found"
}
```

### User Preferences Endpoints

#### GET /users/preferences
Retrieve user's news preferences.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "message": "User preference fetch succesfully",
  "preferences": ["movies", "comics"]
}
```

**Error Response (401):**
```json
{
  "message": "No token provided"
}
```

#### PUT /users/preferences
Update user's news preferences (adds new preferences to existing ones).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "preferences": ["movies", "comics", "games"]
}
```

**Success Response (200):**
```json
{
  "message": "Preferences updated successfully",
  "preferences": ["movies", "comics", "games"]
}
```

**Note:** This endpoint merges new preferences with existing ones, removing duplicates.

### News Endpoints

#### GET /news
Retrieve personalized news based on user preferences from GNews API.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
  "news": [
    {
      "title": "Latest Movie News",
      "description": "Exciting updates from the movie industry...",
      "url": "https://example.com/news",
      "image": "https://example.com/image.jpg",
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "source": {
        "name": "News Source"
      }
    }
  ]
}
```

**Error Response (401):**
```json
{
  "message": "No token provided"
}
```

**Error Response (404):**
```json
{
  "message": "No news found for the given preferences"
}
```

## Data Models

### User Schema
```json
{
  "id": 1,
  "name": "Clark Kent",
  "email": "clark@superman.com",
  "password": "hashed_password",
  "preferences": ["movies", "comics"]
}
```

### News Schema (from GNews API)
```json
{
  "title": "News Title",
  "description": "News description",
  "url": "https://example.com/news",
  "image": "https://example.com/image.jpg",
  "publishedAt": "2024-01-01T00:00:00.000Z",
  "source": {
    "name": "News Source"
  }
}
```

## Project Structure

```
news-aggregator-api-nik-1207/
├── app.js                    # Main application file
├── package.json              # Dependencies and scripts
├── README.md                 # This documentation
├── user.json                 # Initial user data (in-memory storage)
├── .env                      # Environment variables (create this)
├── src/                      # Source code
│   ├── routes/               # API route handlers
│   │   ├── user.routes.js    # User authentication routes
│   │   └── news.routes.js    # News retrieval routes
│   ├── controllers/          # Route controllers
│   │   ├── user.controller.js # User operations
│   │   └── news.controller.js # News operations
│   ├── middlewares/          # Express middleware
│   │   └── verifyJWT.middleware.js # JWT authentication middleware
│   └── utils/                # Utility functions
│       └── passwordHandler.js # Password hashing utilities
└── test/                     # Test files
    └── server.test.js        # API tests
```

## Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JSON** - In-memory data storage
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **axios** - HTTP client for GNews API
- **dotenv** - Environment configuration
- **tap** - Testing framework
- **supertest** - HTTP testing
- **nodemon** - Development auto-reload

## Error Handling

The API includes comprehensive error handling:
- **400 Bad Request** - Invalid input data or missing required fields
- **401 Unauthorized** - Invalid or missing authentication token
- **404 Not Found** - User or news not found
- **409 Conflict** - User already exists
- **500 Internal Server Error** - Server errors (e.g., GNews API issues)

All errors return a consistent format:
```json
{
  "message": "Error description"
}
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
- **JWT Authentication**: Secure token-based authentication with 1-hour expiration
- **Input Validation**: Robust validation of all input data
- **Environment Variables**: Sensitive data stored in environment variables
- **Middleware Protection**: JWT verification middleware for protected routes

## Development

### Running Tests

```bash
npm test
```

### Available Scripts
- `npm test` - Run all tests
- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload using nodemon

### Environment Variables

Create a `.env` file in the root directory:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# GNews API Configuration
API_KEY=your-gnews-api-key-here
```

## Initial User Data

The application comes with pre-loaded user data in `user.json`:

- **Bruce Wayne** (bruce@batman.com) - Preferences: gadgets, martial arts
- **Diana Prince** (diana@wonderwoman.com) - Preferences: history, combat
- **Barry Allen** (barry@flash.com) - Preferences: running, science
- **Arthur Curry** (arthur@aquaman.com) - Preferences: swimming, marine life
