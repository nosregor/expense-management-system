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

## API Endpoints

Below are the available API endpoints for the Expense Management System.

## Expense Endpoints

## Expense Endpoints

| **Method** | **Endpoint**    | **Description**                  | **Query Parameters**                                                                                            | **Request Body**                                               | **Response**              |
| ---------- | --------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------- |
| `GET`      | `/expenses`     | Get all expenses                 | `category` (optional): Filter by category (e.g., `MEALS`)<br>`amount` (optional): Filter by amount (e.g., `15`) | -                                                              | `{ expenses: Expense[] }` |
| `GET`      | `/expenses/:id` | Get a single expense by ID       | -                                                                                                               | -                                                              | `{ expense: Expense }`    |
| `POST`     | `/expenses`     | Create a new expense             | -                                                                                                               | `{ description: string, amount: number, category: string }`    | `{ expense: Expense }`    |
| `PUT`      | `/expenses/:id` | Update an existing expense by ID | -                                                                                                               | `{ description?: string, amount?: number, category?: string }` | `{ expense: Expense }`    |
| `DELETE`   | `/expenses/:id` | Delete an expense by ID          | -                                                                                                               | -                                                              | `{ }`                     |

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

### Backend improvements

- Amount formatting with currency info/locale
- API documentation (Swagger or Postman)
- Authentication & Authorization: implement secure authentication mechanisms and proper authorization controls. (JWT or OAuth for token-based authentication)
- Rate Limiting and DDoS Protection: implement rate limiting to prevent abuse of your APIs and mitigate distributed denial-of-service attacks.
- Add caching strategy
- Enhance testing with integration tests
- Consider using transactional operations that require atomicity reads and writes

## Preparing for Deployment

1. **Environment Variables**: configure environment variables for sensitive data like database credentials. Keep secrets secure.

2. **Input Validation**:

- user inputs are validated to prevent security vulnerabilities like SQL injection, XSS attacks, and more.
- I chose the [express-validator](https://express-validator.github.io/docs/) library to sanitize and validate incoming data.

3.  **Error handling**:

- centralized error handling to gracefully handle unexpected issues and effective logging helps in debugging and monitoring.
- I added a custom error handling middleware

4. **Logging**:

- essential for monitoring and debugging our app.
- I chose to use [pino](https://github.com/pinojs/pino) and [pino-pretty](https://github.com/pinojs/pino-pretty)
- automatic logging of request/response with [pino-http](https://github.com/pinojs/pino-http)

5. **Security Headers and Middleware**: I added security-focused middleware [helmet](https://github.com/helmetjs/helmet) to automatically set security headers

6. **Dockerize**: Create a `Dockerfile` for easy deployment.

## Deployment options

1. Self-Managed Servers: Deploy backend to DigitalOcean or AWS EC2.
2. Platform as as Service: Deploy the backend to Heroku or Vercel. Deploy the frontend to Netlify or Vercel.
3. Cloud service to run the MongoDB instance (Mongo Atlas).
4. Blue/Green Deployment 🌏💚 Deploy without breaking anything. Test on a "blue version while users stay on "green"

## Deployment and scaling strategies

Successfully deploying and scaling our application ensures it can handle traffic and provides a reliable experience for users.

1. **Database considerations**

- Vertical Scaling: Increase the resources (CPU, RAM) of the database server to handle increased load.
- Horizontal Scaling: Distribute your database across multiple servers using sharding or replication.
- Use managed database services like AWS RDS, Google Cloud SQL, or MongoDB Atlas for automatic scaling and maintenance.

2. **Load balancing**

- For high availability and scalability, we can use load balancers like Nginx or HAProxy to distribute incoming traffic among multiple instances on the Node.js application.

3. **Monitoring and Scaling**

- Implement monitoring and alerting using tools like New Relic, Datadog, or Prometheus.
- Monitor key metrics like CPU usage, memory consumption, and request latency.
- Set up autoscaling policies to automatically adjust the number of application instances based on traffic.

4. **Caching**

- Implement caching mechanism to reduce the load on application servers.
- Tools like Redis or Memcached can cache frequently accessed data and improve response times.

5. **Security**

- Use HTTPS and regularly update dependencies to patch vulnerabilities.

6. **Continuous Integration and Deployment (CI/CD)**

- Set up a CI/CD pipeline to automate the deployment process.
- Use GitHub Actions to automate testing, building, and deploying of our app.

7. **Disaster Recovery**

- Plan for disaster recovery by creating regular backups of our data and having a plan in place to restore services in case of unexpected outages.
