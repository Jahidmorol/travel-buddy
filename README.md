# Travel Buddy Application

## Overview

The Travel Buddy Application is a web service that allows users to find travel buddies for their trips. Users can register, create trips, send and respond to travel buddy requests, and manage their profiles. The application is built using TypeScript, Express.js, Prisma with PostgreSQL, and JWT for authentication.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine.
- PostgreSQL installed and running on your local system.
- Prisma CLI installed globally (`npm install -g prisma`).
- vercel live link : https://trave-buddy-server.vercel.app

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mehedihasan8/trip-buddy-server.git
   ```

2. **Navigate to the project directory:**

   ```bash
   trip-buddy-server
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

### User Registration

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/register`
- **Description:** User Registration

### User Login

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/login`
- **Description:** User Login

# Create a Trip

### Create a trips

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/trips`
- **Description:** Create a trips

### Get Paginated and Filtered Trips

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/trips`

  - `destination`: (Optional) Filter trips by destination.
  - `startDate`: (Optional) Filter trips by start date.
  - `endDate`: (Optional) Filter trips by end date.
  - `budget`: (Optional) Filter trips by budget range. Example: ?minBudget=100&maxBudget=10000
  - `searchTerm`: (Optional) Searches for trips based on a keyword or phrase. Only applicable to the following fields: `destination`, `budget`, etc.
  - `page`: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2
  - `limit`: (Optional) Sets the number of data per page. Default is 10. Example: ?limit=5
  - `sortBy`: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: `destination`, `budget`. Example: ?sortBy=budget
  - `sortOrder`: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc

### Send Travel Buddy Request

- **Method:** `POST`
- **URL:** `http://localhost:5000/api/trip/:tripId/request`
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`

### Get Potential Travel Buddies For a Specific Trip

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/travel-buddies/:tripId`
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`

### Respond to Travel Buddy Request

- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/travel-buddies/:buddyId/respond`
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`

### Get User Profile

- **Method:** `GET`
- **URL:** `http://localhost:5000/api/profile`
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`

### Update User Profile

- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/profile`
- **Request Headers:**
  - `Authorization: <JWT_TOKEN>`

# Contributing

Contributions are welcome! If you have any suggestions, bug reports, or improvements, please open an issue or submit a pull request.
