# Identity Reconciliation

This project provides a backend service for identity reconciliation and management of contact information using TypeScript, Node.js, Express, and TypeORM with PostgreSQL. It includes functionality to identify and consolidate contact records based on email and phone number, as well as CRUD operations for managing contacts.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Sample Test Cases](#sample-test-cases)
- [CURL Examples](#curl-examples)
- [License](#license)

## Features

- Identify and consolidate contacts based on email and phone number.
- Create, read, update, and delete (CRUD) operations for contact management.
- Error handling for various scenarios.
- Security measures with CORS, helmet, and rate limiting.

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL database

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/itsRkator/identity-reconciliation.git
   cd identity-reconciliation
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root of the project with the following content:

     ```
     # Configure the DB as per your database credentials
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=your_user
     DB_PASS=your_password
     DB_NAME=your_database

     # Server Port
     PORT=8000
     ```

## Project Structure

```
identity-reconciliation/
├── src/
│   ├── controllers/          # Controller functions for handling requests
│   │   └── contactController.ts
│   ├── entities/             # TypeORM entities representing the database structure
│   │   └── Contact.ts
│   ├── routes/               # Routing definitions for API endpoints
│   │   ├── index.ts
│   │   └── contactRoutes.ts
│   ├── services/             # Business logic and data handling
│   │   └── contactService.ts
│   ├── types/                # TypeScript types and DTOs
│   │   └── contact.dto.ts
│   ├── utils/                # Utility functions and database connection
│   │   ├── db.ts
│   │   └── errorHandler.ts    # Custom error handling
│   ├── middlewares/          # Middleware functions for security and error handling
│   │   └── security.ts
│   ├── app.ts                # Main application setup
│   └── server.ts             # Entry point for the application
├── .env                      # Environment variables
├── tsconfig.json            # TypeScript configuration
└── package.json              # Project metadata and dependencies
```

## Running the Server

To start the server in development mode with automatic reloads:

```bash
npm run start:dev
```

For production, start the server:

```bash
npm run start
```

## API Endpoints

### 1. Identify Contacts

- **Endpoint**: `POST /api/contacts/identify`
- **Request Body**:
  ```json
  {
    "email": "example@example.com",
    "phoneNumber": "1234567890"
  }
  ```

### 2. Create Contact

- **Endpoint**: `POST /api/contacts`
- **Request Body**:
  ```json
  {
    "email": "newuser@example.com",
    "phoneNumber": "0987654321",
    "linkedId": null,
    "linkedPrecedence": "primary"
  }
  ```

### 3. Get Contact by ID

- **Endpoint**: `GET /api/contacts/:id`

### 4. Update Contact by ID

- **Endpoint**: `PUT /api/contacts/:id`
- **Request Body**:
  ```json
  {
    "email": "updateduser@example.com"
  }
  ```

### 5. Delete Contact by ID

- **Endpoint**: `DELETE /api/contacts/:id`

## Sample Test Cases

### 1. Identify Contact

**Test Case**: Identify an existing contact by email.

- **Request**:
  ```json
  {
    "email": "test@example.com",
    "phoneNumber": null
  }
  ```
- **Expected Response**:
  ```json
  {
    "contact": {
      "primaryContactId": "uuid",
      "emails": ["test@example.com"],
      "phoneNumbers": ["1234567890"],
      "secondaryContactIds": ["uuid1", "uuid2"]
    }
  }
  ```

### 2. Create Contact

**Test Case**: Create a new contact.

- **Request**:
  ```json
  {
    "email": "newuser@example.com",
    "phoneNumber": "0987654321"
  }
  ```
- **Expected Response**:
  ```json
  {
    "contact": {
      "id": "uuid",
      "phoneNumber": "0987654321",
      "email": "newuser@example.com",
      "linkedId": null,
      "linkPrecedence": "primary",
      "createdAt": "date",
      "updatedAt": "date",
      "deletedAt": null
    }
  }
  ```

### 3. Get Contact by ID

**Test Case**: Retrieve a contact by ID.

- **Expected Response** (if contact exists):
  ```json
  {
    "contact": {
      "id": "uuid",
      "phoneNumber": "0987654321",
      "email": "newuser@example.com",
      "linkedId": null,
      "linkPrecedence": "primary",
      "createdAt": "date",
      "updatedAt": "date",
      "deletedAt": null
    }
  }
  ```

### 4. Update Contact

**Test Case**: Update an existing contact's email.

- **Request**:
  ```json
  {
    "email": "updateduser@example.com"
  }
  ```
- **Expected Response**:
  ```json
  {
    "contact": {
      "id": "uuid",
      "phoneNumber": "0987654321",
      "email": "updateduser@example.com",
      "linkedId": null,
      "linkPrecedence": "primary",
      "createdAt": "date",
      "updatedAt": "new date",
      "deletedAt": null
    }
  }
  ```

### 5. Delete Contact

**Test Case**: Delete a contact by ID.

- **Expected Response**:
  ```json
  {
    "message": "Contact deleted successfully."
  }
  ```

## CURL Examples

### 1. Identify Contacts

```bash
curl -X POST http://localhost:3000/api/contacts/identify \
-H "Content-Type: application/json" \
-d '{"email": "example@example.com", "phoneNumber": "1234567890"}'
```

### 2. Create Contact

```bash
curl -X POST http://localhost:3000/api/contacts \
-H "Content-Type: application/json" \
-d '{"email": "newuser@example.com", "phoneNumber": "0987654321"}'
```

### 3. Get Contact by ID

```bash
curl -X GET http://localhost:3000/api/contacts/{CONTACT_ID}
```

### 4. Update Contact by ID

```bash
curl -X PUT http://localhost:3000/api/contacts/{CONTACT_ID} \
-H "Content-Type: application/json" \
-d '{"email": "updateduser@example.com"}'
```

### 5. Delete Contact by ID

```bash
curl -X DELETE http://localhost:3000/api/contacts/{CONTACT_ID}
```

## Basic Database state and the test cases

1. **Database State**

   ```
   {
       "id": 1,
       "phoneNumber": "123456",
       "email": "lorraine@hillvalley.edu",
       "linkedId": null,
       "linkPrecedence": "primary",
       "createdAt": "2024-10-29T03:26:52.585Z",
       "updatedAt": "2024-10-29T03:26:52.585Z",
       "deletedAt": null
   },
   {
       "id": 2,
       "phoneNumber": "123456",
       "email": "mcfly@hillvalley.edu",
       "linkedId": 1,
       "linkPrecedence": "secondary",
       "createdAt": "2024-10-29T03:27:14.154Z",
       "updatedAt": "2024-10-29T03:27:37.916Z",
       "deletedAt": null
   }
   ```

   - **Test Case 1**
     **_Input:_**
     ```
     {
         "email": "mcfly@hillvalley.edu",
         "phoneNumber": "123456"
     }
     ------------ OR ------------
     {
         "email": null,
         "phoneNumber": "123456"
     }
     ------------ OR ------------
     {
         "email": "lorraine@hillvalley.edu",
         "phoneNumber": null
     }
     ------------ OR ------------
     {
         "email": "mcfly@hillvalley.edu",
         "phoneNumber": null
     }
     ```
     **_Output:_**
     ```
     {
         "contact": {
             "primaryContactId": 1,
             "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
             "phoneNumbers": ["123456"],
             "secondaryContactIds": [23]
         }
     }
     ```

2. **Database State**

   ```
   {
       "id": 3,
       "phoneNumber": "919191",
       "email": "george@hillvalley.edu",
       "linkedId": null,
       "linkPrecedence": "primary",
       "createdAt": "2024-10-29T03:29:12.667Z",
       "updatedAt": "2024-10-29T03:29:12.667Z",
       "deletedAt": null
   },
   {
       "id": 4,
       "phoneNumber": "717171",
       "email": "biffsucks@hillvalley.edu",
       "linkedId": 3,
       "linkPrecedence": "secondary",
       "createdAt": "2024-10-29T03:29:29.722Z",
       "updatedAt": "2024-10-29T03:30:16.085Z",
       "deletedAt": null
   }
   ```

   **Test Case 1**

   **_Input:_**

   ```
   {
       "email": "george@hillvalley.edu",
       "phoneNumber": "717171"
   }
   ```

   **_Output:_**

   ```
   {
       "contact": {
           "primaryContactId": 3,
           "emails": ["george@hillvalley.edu", "biffsucks@hillvalley.edu"],
           "phoneNumbers": ["919191", "717171"],
           "secondaryContactIds": [4]
       }
   }
   ```

## License

This project is licensed under the MIT License.
