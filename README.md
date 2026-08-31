# Sytemintegration — Authenticated Service Request Module

A full-stack app with ReactJS (Vite) frontend and Spring Boot backend, using JWT authentication and Spring Security to let logged-in users manage their own Service Requests.

## Project Structure

```
Sytemintegration/
├── backend/     Spring Boot REST API
└── frontend/    ReactJS (Vite) client
```

## Prerequisites

- Java JDK 17 or newer
- Node.js (v18+) and npm
- MySQL Server (running locally)
- IntelliJ IDEA (or any Java IDE) — optional but recommended for the backend

## Backend Setup

1. Create the database in MySQL:
   ```sql
   CREATE DATABASE activity01;
   ```

2. Open `backend/src/main/resources/application.properties` and update it with your own MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/activity01
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```
   Tables (`users`, `service_requests`) are created automatically on first run.

3. Open the `backend` folder in IntelliJ (or your IDE of choice) and let Maven download dependencies.

4. Run the application:
   ```
   ./mvnw spring-boot:run
   ```
   or run `Activity01Application.java` directly from your IDE.

5. The backend starts on **http://localhost:8080**.

## Frontend Setup

1. Open a terminal in the `frontend` folder.

2. Install dependencies:
   ```
   npm install
   ```

3. Start the dev server:
   ```
   npm run dev
   ```

4. The frontend starts on **http://localhost:5173**.

> Both the backend and frontend must be running at the same time for the app to work.

## Usage

1. Go to `http://localhost:5173/register` and create an account.
2. Log in at `http://localhost:5173/login`. On success, a JWT is stored and you're redirected to the Dashboard.
3. From the Dashboard, go to **My Service Requests** to create, view, edit, and delete your own service requests.
4. Every request to a protected backend endpoint automatically includes the JWT via the `Authorization: Bearer <token>` header.
5. Click **Logout** to clear the token and return to the login page.

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | `/api/register` | No | Register a new user |
| POST | `/api/login` | No | Log in and receive a JWT |
| POST | `/api/requests` | Yes | Create a new service request |
| GET | `/api/requests` | Yes | List the current user's requests |
| GET | `/api/requests/{id}` | Yes | Get one request (must belong to the current user) |
| PUT | `/api/requests/{id}` | Yes | Update a request (must belong to the current user) |
| DELETE | `/api/requests/{id}` | Yes | Delete a request (must belong to the current user) |

## Security Notes

- Passwords are hashed with BCrypt before being stored; they are never returned in API responses.
- JWTs expire after 1 hour.
- Ownership of Service Requests is determined from the authenticated user's identity in the JWT, never from data sent by the frontend. Attempting to access another user's request returns `403 Forbidden`.

## Troubleshooting

- **Backend fails to connect to MySQL:** confirm the MySQL service is running and the credentials in `application.properties` match your local MySQL setup.
- **CORS errors in the browser:** confirm the backend is running on port 8080 and the frontend on port 5173 — CORS is configured to allow only `http://localhost:5173`.
- **401/403 on protected endpoints:** confirm you're logged in and that the token hasn't expired (log in again to get a fresh one).
