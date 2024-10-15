# **User Authentication API**

A RESTful API for user authentication built using Node.js, Express.js, and MongoDB. This API includes user registration, login, logout, and features to change the user's password, username, and email. The authentication mechanism uses JWT for managing access and refresh tokens.

## **Features**

- **User Registration:** Create a new user with a unique username and email.
- **User Login:** Login with either username or email, and receive JWT tokens (access and refresh tokens).
- **User Logout:** Securely log out by invalidating the refresh token.
- **Change Password:** Allow users to change their password after providing the current one.
- **Change Username:** Allow users to change their username.
- **Change Email:** Allow users to update their email address.

## **API Endpoints**

### **Authentication Routes**

- **POST /register**
  - Register a new user by providing a `username`, `email`, and `password`.
  - **Request Body**: 
    ```json
    {
      "username": "exampleUser",
      "email": "example@example.com",
      "password": "examplePassword"
    }
    ```
  - **Response**: 
    - `201 Created` with the new user information (excluding the password).

- **POST /login**
  - Login with either `username` or `email` and receive access and refresh tokens.
  - **Request Body**: 
    ```json
    {
      "user": "exampleUser or example@example.com",
      "password": "examplePassword"
    }
    ```
  - **Response**: 
    - `200 OK` with the user information and tokens.

- **DELETE /logout**
  - Logout the currently authenticated user by invalidating the refresh token.
  - **Headers**: Authorization: Bearer `<accessToken>`
  - **Response**: 
    - `200 OK` on successful logout.

### **User Update Routes**

- **PATCH /changePassword**
  - Update the user’s password by providing the current password and the new password.
  - **Headers**: Authorization: Bearer `<accessToken>`
  - **Request Body**: 
    ```json
    {
      "oldPassword": "currentPassword",
      "newPassword": "newPassword"
    }
    ```
  - **Response**: 
    - `200 OK` on successful password change, requiring the user to re-login.

- **PATCH /changeUsername**
  - Update the username.
  - **Headers**: Authorization: Bearer `<accessToken>`
  - **Request Body**: 
    ```json
    {
      "newUsername": "newExampleUser"
    }
    ```
  - **Response**: 
    - `200 OK` on successful username update.

- **PATCH /changeEmail**
  - Update the user’s email.
  - **Headers**: Authorization: Bearer `<accessToken>`
  - **Request Body**: 
    ```json
    {
      "newEmail": "newemail@example.com"
    }
    ```
  - **Response**: 
    - `200 OK` on successful email update.

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/vikas-bhat-d/user-authentication-api.git
   cd user-authentication-api
