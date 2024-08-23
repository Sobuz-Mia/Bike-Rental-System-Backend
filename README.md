# Bike Rental Reservation System Backend

# Live Link :- [https://bike-rental-reservation-system-backend-henna.vercel.app](https://bike-rental-reservation-system-backend-henna.vercel.app).

## Description

<P>Welcome to the "Bike Rental Reservation System" project. This is a robust backend application designed to manage bike rentals efficiently </p>

# Some key features:-

- User Authentication & Authorization.
- Bike Management system using CRUD operations.
- Automatically calculates <b> Rental Costs </b> based on duration and bike type
- Error Handling & Data Validation

# Techniques I used:-

- TypeScript
- Node.js & Express.js
- MongoDB with mongoose

## Introductory material

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine. You can download it from [here](https://nodejs.org/).
- MongoDB installed and Running on your local machine. You can download it from [here](https://www.mongodb.com/try/download/community).
- Git installed on your local machine. You can download it from [here](https://git-scm.com/).

## Installations

- Clone the Repository following this command in command line:

```
   git clone <repository url>
```

- Navigate to the project directory:

```
   cd Initial-setup-for-backend
```

- Install Dependencies

```
npm install
```

## Running the applications

- To start the application development mode with automatic restart on file changes, run:

```
npm run start:dev
```

- To build the application in production mode, run:

```
npm run start:prod
```

## Environment Variable Setup:

Create a `.env` file in the root directory and add the following environment variables:

```
NODE_ENV=your_mode_like "development | production"
PORT=5000
DATABASE_URL=<Your mongoDB_connection_url_string>
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET=a857c0e7f3f23f8d3b0d5197f30e8b51c04407088bd35a3c3a84afea21ff3af9

```

Replace `<your_mongoDB_connections_url>` with the connecting string for your database.

## Linting and Formatting

- To lint the code. run: <br>
  ```
  npm run lint
  ```
- To Automatically fixed the lint issues. run, <br>
  ```
  npm run lint:fix
  ```
- To format the code using Prettier. run: <br>
  ```
  npm run prettier
  ```
- To Automatically fixed formatting issues. run: <br>
  ```
  npm run prettier
  ```

If you following the instruction you will successfully run the project in your local machine
