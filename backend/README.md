# Backend

## Testing Strategy

Test both controllers and services, but in different ways to verify that the correct data is being saved, retrieved, updated, or deleted.

### Controllers

Mock the services to test the HTTP layer (e.g., request/response handling, status codes, and error handling).

Focus on the business logic (e.g., validation, transformations, or calculations).

### Services

Test the actual database interactions in isolation (without mocking) ensures that they work independently of the controllers.

Use an in-memory database (e.g., mongodb-memory-server) to test database queries without affecting a real database.

### Handling errors

- Custom error types (e.g., ValidationError, NotFoundError, DatabaseError)
- Centralized error handling
- Logging of errors with custom messages and stack traces

### Testing Utilities

- dbHandler for testing services with an in-memory MongoDB database, ensuring isolated and controlled testing environments.

### Logs

- Logging: pino to log errors and requests/response

### Improvements:

1. MongoDB

- Assign Object Id before save

\_id: { type: Types.ObjectId, default: () => new Types.ObjectId() },

The solution that worked for me is to assign the \_id before calling save()

```
export const addUser = async (_user) => {
let user = new User({ ..._user });
user._id = mongoose.Types.ObjectId();
let result;
try {
    result = await user.save();
    console.log(result._id);
} catch (err) {
    console.log(err);
}
return result;
```
