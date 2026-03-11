# Clean Architecture Example

This project demonstrates a simple clean architecture implementation using Node.js, Express, and SQL Server. It defines two objects: `User` and `Role`, with RESTful endpoints for create, read, update, and soft delete. Additional routes allow enabling/disabling users by email/username and fetching users by role.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your SQL Server connection in `.env`:
   ```
   DB_USER=sa
   DB_PASSWORD=yourStrong(!)Password
   DB_SERVER=localhost
   DB_DATABASE=MyDatabase
   DB_PORT=1433
   ```

3. Create database and tables using the provided SQL script (`src/database/setup.sql`). Run this against your SQL Server instance.

4. Start the server:
   ```bash
   npm run dev   # or npm start
   ```

## API Endpoints

**Users**
- `POST /users` - create
- `GET /users` - list all
- `GET /users/:id` - get by id
- `PUT /users/:id` - update
- `DELETE /users/:id` - soft delete (sets status=2)
- `POST /users/enable` - enable user (body: `{ email, username }`)
- `POST /users/disable` - disable user (body: `{ email, username }`)

**Roles**
- `POST /roles` - create
- `GET /roles` - list all
- `GET /roles/:id` - get by id
- `PUT /roles/:id` - update
- `DELETE /roles/:id` - delete role
- `GET /roles/:id/users` - get users belonging to a role

## Architecture

- `src/controllers` – HTTP layer
- `src/usecases` – business logic
- `src/repositories` – database access
- `src/config` – DB connection
- `src/routes` – express routers

