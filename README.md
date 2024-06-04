## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS

## Project Setup

1. **Clone the repository**:
   ```sh
   git clone https://github.com/Annu117/MERN.git
   cd MelodyVerse
   ```

2. **Install dependencies for the server**:
   ```sh
   cd server
   npm install
   ```

3. **Install dependencies for the client**:
   ```sh
   cd ../client
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the `server` directory and add the following:
   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   GOOGLE_OAUTH_CLIENT_ID=<client-id>
   GOOGLE_OAUTH_CLIENT_SECRET=<client-secret>
   ```

5. **Run the application**:
   - Start the server:
     ```sh
     cd server
     npm start
     ```
   - Start the client:
     ```sh
     cd ../client
     npm run dev
     ```
## Features

### Signup Screen

- **Fields**: Username, Email, Password (with confirmation), Name (optional).
- **Validation**: Ensured required fields and correct email format using React state management and validation libraries.
- **Terms and Conditions**: Included a checkbox to accept terms and conditions.
- **Error and Success Messages**: Displayed clear messages for user feedback.
- **Welcome Email Simulation**: Simulated sending a welcome email upon successful signup.
- **Redirection**: Redirected to the post list screen using React Router after successful signup.

### Post List Screen

- **Infinite Scrolling**: Implemented infinite scrolling to fetch and render posts using the GET API.
- **Responsive Design**: Used Tailwind CSS for responsive and visually appealing design consistent with the "MelodyVerse" theme.

### API Endpoints

1. **POST /signup**:
   - Registers a new user with the provided username and password.
   - Validates input, ensures unique usernames and emails, and securely hashes passwords.
   - Stores user data in the MongoDB database.
   - Returns a success message and JWT token upon successful registration.

2. **GET /posts**:
   - Implements paginated fetching of posts data from the database.
   - Ensures security by rejecting non-authenticated requests.

### JWT Implementation

- **Token Generation**: Generates JWT tokens with appropriate payload and expiration time upon successful login.
- **Token Validation**: Validates JWT tokens in protected routes to ensure user authentication.
- **Token Refresh**: Implements robust token refresh mechanisms.

### Best Practices

- **Input Validation and Sanitization**: Prevents vulnerabilities by enforcing input validation and sanitization.
- **Protection Against Attacks**: Protects against SQL injection, XSS, and other common attacks.
- **Secure Password Storage**: Uses bcrypt for secure password hashing.
- **Error Handling**: Implements proper error handling and provides informative error messages.
- **Environment Variables**: Uses environment variables for sensitive information.
- **Session and Token Management**: Handles sessions and token expiration effectively.

## Additional Features

- **Password Reset**: Implemented functionality for users to reset their passwords.
- **Email Verification**: Integrated email verification for signup.
- **Middleware**: Used middleware for authentication and authorization.
- **Social Login**: Implemented social login options using mock APIs and React libraries.
- **Password Visibility Toggle**: Added a toggle to show/hide the password input.

## Usage

1. **Signup**: Users can sign up by providing their username, email, and password.
2. **Login**: Users can log in using their credentials to receive a JWT token.
3. **View Posts**: Authenticated users can view the post list screen with infinite scrolling.

## Screenshots
<div align="center">
    <img width="400" src="https://github.com/Annu117/MERN/assets/108427028/42fe52ce-929f-4894-a9eb-4b1c6e7cd0be">
    <img width="400" src="https://github.com/Annu117/MERN/assets/108427028/ec982f4a-27ea-4d27-b652-97a4dc485040">
</div>
<div align="center">
    <img width="400" src="https://github.com/Annu117/MERN/assets/108427028/a21c5b61-6fb3-4496-b722-b514c3cae760">
    <img width="400" src="https://github.com/Annu117/MERN/assets/108427028/56d043d3-6971-4e0c-aefb-1ccc6c1d87fa">
</div>

## Video
https://github.com/Annu117/MERN/assets/108427028/78a747c8-a310-435f-bb5e-7696a69881a5


---
