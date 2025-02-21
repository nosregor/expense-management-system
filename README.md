# Expense Management System

This is a simple Expense Management System with a React frontend and a Node.js backend.

## Features

- Create, read, update, and delete expenses.
- List all expenses in a table.
- Create new expenses with a form.
- Update and delete expenses from the list.

## Technologies - MERN stack

- **Frontend**: React, Tailwind, Vite
- **Backend**: Node.js, Express, MongoDB
- **Testing**: Jest, Supertest

## How to run the app

1. Start MongoDB locally or use a cloud service. [How to install](https://www.mongodb.com/docs/manual/administration/install-community/)

> The following commands should be run from the root folder `~/expense-management-system/

2. Initialise the app

```bash
npm install
```

3. Build both backend and frontend apps:

```bash
npm run build
```

4. Lets seed the mongodb with fake data (mongodb must be runnng for this to work):

```bash
npm run seed:database
```

5. You can run both backend and frontend together:

```bash
npm start
```

Or, separately:

```bash
npm run backend
npm run frontend
```

- Backend should be running on [http://localhost:3000/](http://localhost:3000/)
- React app should be running on [http://localhost:5173/](http://localhost:5173/)

5. To run the backend tests, run the command:

```bash
npm run test
```

## Improvements

### Usability Improvements

- Add user login
- Add filtering and sorting expenses
- Adding more fields such as date
- Adding pagination, filtering and sorting
- Add a Loading Spinner, for a better user experience.
- Add error handling on the front end
- Add empty State messaging - Instead of showing "No expenses found," you can add a button to create a new expense directly from the empty state.
- Add notification toast for success and failure

### Backend improvements:

- Amount formatting with currency info/locale
- API documentation (Swagger or Postman)
- Authentication & Authorization
- Adding observability (i.e. honeycomb, sentry)
- Add a rate limiter (limiting the number of requests per user)
- Add caching strategy
- Add integration tests
- Consider using transactional operations that require atomicity reads and writes

## Production-Ready Considerations

1. **Environment Variables**: dotenv to manage environment variables in development.
2. **Input Validation**: request validations
3. **Error Handling**: centralized error handling (differiate `development` from `production`)
4. **Logging**: logging with [pino](https://github.com/pinojs/pino), pino-http and pino-pretty in both development and production environments for debugging and monitoring.
5. **Dockerize**: Create a `Dockerfile` for easy deployment.

## Deployment options

1. Deploy the backend to a service like Heroku or Vercel.
2. Deploy the frontend to Netlify or Vercel.
3. Containerize the application and run on AWS EC2.
4. Cloud serivce to run the MongoDB instance.
