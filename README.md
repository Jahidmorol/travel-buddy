# Travel Buddy Matching Application

## Overview

The Travel Buddy Matching Application is a web service that allows users to find travel buddies for their trips. Users can register, create trips, send and respond to travel buddy requests, and manage their profiles. The application is built using TypeScript, Express.js, Prisma with PostgreSQL, and JWT for authentication.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- PostgreSQL installed and running on your local system.
- Prisma CLI installed globally (`npm install -g prisma`).

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-mehedihasan8.git
   ```

2. **Navigate to the project directory:**

   ```bash
   l2-b2-fullstack-track-assignment-8-mehedihasan8.git
   ```

3. **Install dependencies:**

   ```typescript
   npm install
   ```

4. **Install dependencies:**

   - Create a PostgreSQL database.
   - Update the DATABASE_URL in the .env file with your PostgreSQL connection URL.

5. **Run Prisma migrations:**

   ```base
   npx prisma migrate dev --name init
   ```

6. **Run the server**

   ```typescript
   npm run prod
   or
   npm run dev
   ```

then access the API, make requests to `http://localhost:5000` your local server.

# API Endpoints

### Create new user

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/register`
- **Description:** Create new user

### Login user

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/auth/login`
- **Description:** Login user

# Create Glass

### Create a Glass

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/glass/add-glass`
- **Description:** Create a Glass

### Get All Glass

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/glass`
- **Description:** Get all glass

### Update a Glass

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/glass/:id`
- **Description:** update a Glass

### Delete a Glass

- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/glass/:id`
- **Description:** Delete a Glass

### Delete the Glasses

- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/glass/delete-many-glass`
- **Description:** Delete the Glasses

# Create Sales History

### Create a Sales

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/sell/add-sell-history`
- **Description:** create a sales

### Get all Sales

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/sell`
- **Description:** Get all Sales

# Contributing

Contributions are welcome! If you have any suggestions, bug reports, or improvements, please open an issue or submit a pull request.
