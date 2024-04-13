# Pinterest (First Backend Project)

This project represents my initial foray into backend development, aiming to create a simplified version of Pinterest's functionality. It serves as my debut endeavor in building server-side applications, where I've focused on implementing fundamental features such as user authentication, post creation, and data management.

## Routes

- **Index**: The main landing page.
- **Register**: Allows users to create a new account.
- **Login**: Enables existing users to log in to their accounts.
- **Profile**: Displays the user's profile information and uploaded posts.
- **Feed**: Shows a feed of posts uploaded by all users.
- **Upload (GET)**: Renders a form for users to upload a new post.
- **Upload (POST)**: Handles the submission of the upload form.

## Data Models

- **User**: Stores information about registered users.
- **Posts**: Contains image and caption data for each post uploaded by users.

## Features

- **Sign Up / Log In**: Users can create a new account or log in to their existing account.
- **Flash Messages**: Informative messages are displayed to users when they provide incorrect information during login.
- **Log Out**: Allows users to log out of their account securely.
- **Post Creation**: Users can upload posts containing images and captions. Multer is used to handle file uploads securely.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend server.
- **Express.js**: Web application framework for building RESTful APIs.
- **MongoDB**: NoSQL database used to store user and post data.
- **Multer**: Middleware for handling file uploads.
- **Passport.js**: Authentication middleware for Node.js.
- **EJS**: Templating engine for rendering dynamic content on the server side.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and configure database connection.
4. Run the server using `npm start`.
5. Access the application through a web browser at the specified URL.
Sign up / Log in 

Flash massages of wrong info while logging in

Log out
