# Online-Library-Web-Application-MEAN-Stack-

This is a fullstack online library management system project built using Node.js, Angular, MongoDB, and Express.js. It provides user authentication and authorization functionality and supports three types of users: 
- reader
- moderator
- admin

The system allows users to manage books, borrow and return books, and perform various library-related operations.

## Project Structure
The project is organized into two main directories: frontend and backend.

## Frontend
The frontend directory contains the Angular application, which handles the user interface and communicates with the backend. It follows the standard Angular project structure:

- src: Contains the application's source code.
  - app: Contains the main application components, services, and modules.
  - assets: Contains static assets like images, stylesheets, etc.
  - environments: Contains environment-specific configuration files.
  - index.html: The main HTML file that serves as the entry point for the application.
## Backend
The backend directory contains the Node.js and Express.js server application. It handles incoming HTTP requests, performs business logic, and communicates with the MongoDB database. The backend structure is as follows:

- src: Contains the server's source code.
  - controllers: Contains the request handlers and business logic.
  - models: Contains the database models and schema definitions.
  - routes: Defines the API routes and maps them to the appropriate controller methods
  - server.ts: The main entry point for the backend server.
