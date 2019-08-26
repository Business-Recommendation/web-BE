==================== LOGIN && REGISTER ENDPOINTS START HERE =======================

**Register a user**
method url: **/api/auth/register**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| email    | String | Yes      |                                   |
| username | String | Yes      | Must be unique/ Must be < 24 char |
| password | String | Yes      | Must be < 24 char                 |

**Example**
```
{
    email: 'anthony@gmail.com',
    username: 'john100',
    password: 'jenkins'
}
```

**Response** 201 (created)


=========================================================================

**Login a user**
method url: **/api/auth/login**

http method: **[POST]**

**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| username | String | Yes      | Must be unique/ Must be < 24 char |
| password | String | Yes      | Must be < 24 char                 |

**Example**
```
{
    username: 'john100',
    password: 'jenkins'
}
```

**Response** 200 (ok)

```
{
    message: 'Logged In! Your ID is 5',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJlbWFpbCI6ImJwb2x0bEBnbWFpbC5jb20iLCJpYXQiOjE1NTU5NzAyMjMsImV4cCI6MTU1NjA1NjYyM30.lWi9hhalGt2ftr4Ju_jP12dCavZgXAMwABGYPzltwr8'
}
```

400 (Unauthorized) **Example response**
```
{ 
error: 'Invalid username or password, please try again with a new one'
}
```
