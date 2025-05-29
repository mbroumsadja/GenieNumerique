# Etudiants

## Description

`etudiants` is an application to register students. It allows users to manage student records effectively.

## Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url> 
    cd etudiants
    ```
2.  **Install dependencies:**
    This project uses pnpm as the package manager. To install dependencies, run:
    ```bash
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a template if available (though one is not currently present in the repo).
    Example:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=secret
    DB_NAME=etudiants_db
    SESSION_SECRET=yourverysecuresecret
    ```

## Usage

### Development

To run the application in development mode with automatic restarts when files change, use:

```bash
pnpm run dev
```

This will start the server using `nodemon`.

### Production

To run the application in production mode, use:

```bash
pnpm run start
```

This will start the server using `node`.

## Technologies Used

*   **Backend:** Node.js, Express.js
*   **Database:** Sequelize (ORM for MariaDB, MySQL, PostgreSQL, SQLite) - Specific database used depends on project configuration.
*   **Templating Engine:** EJS
*   **Authentication:** bcrypt (for password hashing), JSON Web Tokens (JWT)
*   **Other Key Libraries:**
    *   `body-parser`: Request body parsing
    *   `cookie-parser`: Cookie parsing
    *   `cors`: Cross-Origin Resource Sharing
    *   `dotenv`: Environment variable management
    *   `express-session`: Session management
    *   `express-validator`: Input validation
    *   `joi`: Schema validation
    *   `morgan`: HTTP request logger
    *   `multer`: File uploads

## Project Structure

```
.
├── config/           # Configuration files (e.g., database connection)
├── controllers/      # Handles incoming requests and business logic
├── middlewares/      # Custom middleware functions (e.g., authentication, validation)
├── models/           # Database models (e.g., Sequelize models)
├── public/           # Static assets (CSS, images, client-side JavaScript)
├── routes/           # Defines API routes and maps them to controllers
├── uploads/          # Directory for uploaded files
├── utils/            # Utility functions and helpers
├── views/            # EJS templates for server-side rendering
├── .env              # Environment variables (should be gitignored)
├── .gitignore        # Specifies intentionally untracked files that Git should ignore
├── package.json      # Project metadata and dependencies
├── pnpm-lock.yaml    # Exact versions of dependencies
├── README.md         # This file
└── server.js         # Main entry point for the application
```

## API Endpoints

Details of the API endpoints can be added here. This would typically include:
*   HTTP Method (GET, POST, PUT, DELETE)
*   URL Path
*   Description of the endpoint
*   Required and optional parameters
*   Example request and response

*Further exploration of the `routes/` and `controllers/` directories is needed to document these accurately.*

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details (if one exists - currently, license information is in `package.json`).
