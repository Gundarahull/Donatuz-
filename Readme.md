# Donatuz Task

A Node.js-based API for managing user authentication, user profiles, file management, and email notifications.

---

## Table of Contents
- [System Features](#system-features)
- [Software Interfaces](#software-interfaces)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
---

## System Features

### 1. Authentication Service
#### Description
The Authentication Service manages user registration and login, ensuring secure access through JWT-based authentication.

#### Functional Requirements
- **POST /auth/register**: Registers a new user with email and password and sends a confirmation email upon successful registration.
- **POST /auth/login**: Authenticates the user by verifying credentials and returns a JWT token for secure access.

### 2. User Management Service
#### Description
The User Management Service allows users to view and update their profile information.

#### Functional Requirements
- **GET /user/profile**: Retrieves the logged-in user’s profile information.
- **PUT /user/profile**: Updates the user’s profile information, such as name and email.

### 3. File Management Service
#### Description
The File Management Service handles file uploads and downloads, ensuring users can manage their own files securely.

#### Functional Requirements
- **POST /files/upload**: Enables users to upload files, with metadata stored in the database and files optionally stored in Cloudinary.
- **GET /files/download/{fileId}**: Allows users to download their uploaded files using the unique file ID.

### 4. Email Notification Service
#### Description
The Email Notification Service handles email notifications for various actions like registration confirmation and file upload alerts.



---

## Software Interfaces

- **MongoDB**: Used to store user and file metadata.
- **Cloudinary**: Cloud storage for file uploads and management.
- **Postman**: Utilized for API testing and documentation.

---

## Setup Instructions

### Prerequisites
- **Node.js**: Make sure Node.js is installed.
- **MongoDB**: Set up MongoDB locally or using a cloud provider like MongoDB Atlas.
- **Cloudinary Account**: Set up an account for storing uploaded files and retrieve API credentials.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/YourProject.git
   cd YourProject
    ```
2. Install dependencies:

    ```
    npm install
     ```
3. Create Env file:
    ```
    MONGO_URL=your_mongodb_connection_string
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```
4. Start the Server:
    ```
    npm run dev
    ```
## API Documentation 
- ###   Postman Documentation
    Access the full API documentation on Postman: API Documentation(https://documenter.getpostman.com/view/36516208/2sAY55aJ8L)
- ###   Postman Colllection
    Go through the Postman Collection and see the responses

## Attaching Images 
-  Attached images for Successfull Registrartion, File upload


