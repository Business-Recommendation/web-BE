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
token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJlbWFpbCI6ImJwb2x0bEBnbWFpbC5jb20iLCJpYXQiOjE1NTU5NzAyMjMsImV4cCI6MTU1NjA1NjYyM30.lWi9hhalGt2ftr4Ju_jP12dCavZgXAMwABGYPzltwr8'
}
```

400 (Unauthorized) **Example response**
```
{ 
error: 'Invalid username or password, please try again with a new one'
}
```

=========================== USERS ENDPOINTS START HERE ===========================

======================================================================

**Add a User's Business**
method url: **/api/biz/listings**

http method: **[POST]**

**Headers**

| name          | type   | required | description                       | 
| ------------- | ------ | -------- | --------------------------------- |
| authorization | String | Yes      | token to Authorize user           |


**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| name     | String | Yes      |                                   |
| yelp_url | String | Yes      | Unique                            |

**Example**
```
{
    name: 'Eataly NYC Flatiron',
    yelp_url: 'https://www.yelp.com/biz/eataly-nyc-flatiron-new-york?osq=eatzis'
}
```

**Response** 201 (ok)

```
{
  message: 'Biz successfully added'
}
```

400 (Unauthorized) **Example response**
```
{ 
error: 'Database connection has failed'
}
```

======================================================================

**Get a User's Businesses**
method url: **/api/biz/listings**

http method: **[GET]**

**Headers**

| name          | type   | required | description                       | 
| ------------- | ------ | -------- | --------------------------------- |
| authorization | String | Yes      | token to Authorize user           |


**Response** 200 (ok)

```
[
  {
    "id": 5,
    "name": "Smugglyduckling",
    "data": [
      {
        "term": "awesome",
        "highratingscore": 0.9,
        "poorratingscore": 0.3,
        "business_id": 5
      },
      {
        "term": "friendly",
        "highratingscore": 0.93,
        "poorratingscore": 0.14,
        "business_id": 5
      },
      {
        "term": "value",
        "highratingscore": 0.99,
        "poorratingscore": 0.02,
        "business_id": 5
      },
      {
        "term": "awesome",
        "highratingscore": 0.99,
        "poorratingscore": 0.04,
        "business_id": 5
      }
    ]
  },
]
```

400 (Unauthorized) **Example response**
```
{ 
error: 'Database connection has failed'
}
```

======================================================================

**Delete a User's Business**
method url: **/api/biz/listings/:id**

http method: **[DELETE]**


**Headers**

| name          | type   | required | description                       | 
| ------------- | ------ | -------- | --------------------------------- |
| authorization | String | Yes      | token to Authorize user           |


**Body**

| name     | type   | required | description                       | 
| -------- | ------ | -------- | --------------------------------- |
| name     | String | Yes      |                                   |
| yelp_url | String | Yes      | Unique                            |


**Response** 200 (ok)

```
1
```

500 (Unauthorized) **Example response**
```
{ 
error: 'Couldnt remove Biz'
}
```
