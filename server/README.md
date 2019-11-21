# Hacktiv Overflow

## Getting Started
---
Welcome to Hacktiv Overflow! <br/>
You can use the API for user, question and answer management.<br/>
All API access is performed over HTTP and accessed from the http://hacktivoverflow.server.edirates.xyz.<br/>

API Base URL :
```html
  http://hacktivoverflow.server.edirates.xyz
```
Client URL :
```html
  http://hacktivoverflow.edirates.xyz
```

---
# Users

**1. Sign Up**
----
Register a new user :
| Syntax                        | Description      |
| ----------------------------- | ---------------- |
| **URL**                       | `/users/signup`  |
| **Method**                    | `POST`           |
| **Authentication Required**   | NO               |
| **Authorization Required**    | NO               |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |
| **name**                      | `<your full name>`     |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "user_data": {
        "_id": "5dd60c4f7757be272fed3ca2",
        "name": "Tyrion Lannister",
        "email": "tyrion@lannister.com"
    },
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ2MGM0Zjc3NTdiZTI3MmZlZDNjYTIiLCJuYW1lIjoiVHlyaW9uIExhbm5pc3RlciIsImVtYWlsIjoidHlyaW9uQGxhbm5pc3Rlci5jb20iLCJpYXQiOjE1NzQzMDg5NDN9.37EqQ7rj5LhUIEWyL6fDd3UdAqFD5iN0mTpupHvgrrk"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": [
        "Email must be unique.",
        "Invalid email format.",
        "Password length at least 8 characters."
    ]
  }
  ```

**2. Sign In**
----
Sign in with an existing user :
| Syntax                        | Description      |
| ----------------------------- | ---------------- |
| **URL**                       | `/users/signin`  |
| **Method**                    | `POST`           |
| **Authentication Required**   | NO               |
| **Authorization Required**    | NO               |

Request Body :
| Field Name                    | Value                  |
| ----------------------------- | ---------------------- |
| **email**                     | `<your email address>` |
| **password**                  | `<your password>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "user_data": {
        "_id": "5dd60c4f7757be272fed3ca2",
        "name": "Tyrion Lannister",
        "email": "tyrion@lannister.com"
    },
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ2MGM0Zjc3NTdiZTI3MmZlZDNjYTIiLCJuYW1lIjoiVHlyaW9uIExhbm5pc3RlciIsImVtYWlsIjoidHlyaW9uQGxhbm5pc3Rlci5jb20iLCJpYXQiOjE1NzQzMDkwMzl9.YcKB9VFxIkl2Ok7nyGihM1WhXvn-ZlnvTclBkXBXwCU"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "User not found.",
  }
  ```

**3. Google Sign In**
----
Sign in with Google Account :
| Syntax                        | Description         |
| ----------------------------- | ------------------- |
| **URL**                       | `/users/gsignin`    |
| **Method**                    | `POST`              |
| **Authentication Required**   | NO                  |
| **Authorization Required**    | NO                  |

Request Body :
| Field Name                    | Value                   |
| ----------------------------- | ----------------------- |
| **CLIENT_ID**                 | `<Google Client ID>`    |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGJjZTFmOWFiYTE0OGMzNDZhYWQ3YmUiLCJlbWFpbCI6ImVkaXJhdGVzQGdtYWlsLmNvbSIsImlhdCI6MTU3MjY2NjU2MX0.DcYLScfR9RAz0-RgnfhWsFLTnfB7a1jyFvON9OagR6o"
  }
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "message": "Internal Server Error."
  }
  ```

**4. Get User Info**
----
Get detail of an existing user :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/`           |
| **Method**                    | `GET`         |
| **Authentication Required**   | YES           |
| **Authorization Required**    | NO            |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "watched_tags": [],
    "_id": "5dd60c4f7757be272fed3ca2",
    "email": "tyrion@lannister.com",
    "password": "$2a$10$ETAvGSGvs5jsa6XXx2PygOdHcIrGftj8eMjWnDU.sy385gmRlxRtO",
    "name": "Tyrion Lannister",
    "createdAt": "2019-11-21T04:02:23.683Z",
    "updatedAt": "2019-11-21T04:02:23.683Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "User not found.",
  }
  ```

---
# Questions

**1. Show All Questions**
----
Show all questions from all users in database :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/questions/`     |
| **Method**                    | `GET`             |
| **Authentication Required**   | NO                |
| **Authorization Required**    | NO                |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "upvotes": [],
        "downvotes": [
            "5dd40cd71cd1e575ae01da63"
        ],
        "answers": [],
        "tags": [
            "life",
            " wonder"
        ],
        "views": [],
        "_id": "5dd53a382e391ff7bfc7acbd",
        "title": "Second Question",
        "description": "How  are you?",
        "UserId": {
            "watched_tags": [],
            "_id": "5dd40cd71cd1e575ae01da63",
            "email": "edirates@gmail.com",
            "name": "Edison Zhou",
            "createdAt": "2019-11-19T15:40:07.871Z",
            "updatedAt": "2019-11-19T15:40:07.871Z",
            "__v": 0
        },
        "createdAt": "2019-11-20T13:06:00.256Z",
        "updatedAt": "2019-11-20T15:57:25.267Z",
        "__v": 3
    },
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [
            "5dd53e5e2e391ff7bfc7acbf",
            "5dd5849c92f0970cdd286ec9",
            "5dd58b2a92f0970cdd286eca"
        ],
        "tags": [
            "life",
            " wonder"
        ],
        "views": [
            "5dd40cd71cd1e575ae01da63"
        ],
        "_id": "5dd53a302e391ff7bfc7acbc",
        "title": "First Question",
        "description": "How  are you?",
        "UserId": {
            "watched_tags": [],
            "_id": "5dd40cd71cd1e575ae01da63",
            "email": "edirates@gmail.com",
            "name": "Edison Zhou",
            "createdAt": "2019-11-19T15:40:07.871Z",
            "updatedAt": "2019-11-19T15:40:07.871Z",
            "__v": 0
        },
        "createdAt": "2019-11-20T13:05:52.482Z",
        "updatedAt": "2019-11-21T01:36:50.663Z",
        "__v": 7,
        "solution": "5dd5849c92f0970cdd286ec9"
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "message": "Internal Server Error."
  }
  ```

**2. Show My Questions**
----
Show all questions from logged-in user :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/questions/user` |
| **Method**                    | `GET`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | NO                |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [
            "5dd576eab9e2b30a2507ee93"
        ],
        "tags": [
            "life",
            " wonder"
        ],
        "views": [
            "5dd40cd71cd1e575ae01da63"
        ],
        "_id": "5dd53ed62e391ff7bfc7acc0",
        "title": "Stark Question",
        "description": "How  are you?",
        "UserId": "5dd50fcbc20eb1f05d1ce4e7",
        "createdAt": "2019-11-20T13:25:42.268Z",
        "updatedAt": "2019-11-21T01:40:09.904Z",
        "__v": 10
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**3. Show Detail of One Question**
----
Show detail of a specific question :
| Syntax                        | Description           |
| ----------------------------- | --------------------- |
| **URL**                       | `/questions/:id`      |
| **Method**                    | `GET`                 |
| **Authentication Required**   | NO                    |
| **Authorization Required**    | NO                    |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<product ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "upvotes": [],
    "downvotes": [],
    "answers": [
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dd58b2a92f0970cdd286eca",
            "QuestionId": "5dd53a302e391ff7bfc7acbc",
            "description": "<p>Final test done</p>",
            "UserId": {
                "watched_tags": [],
                "_id": "5dd40cd71cd1e575ae01da63",
                "email": "edirates@gmail.com",
                "password": "$2a$10$NAwwU5lFeLa1IloD7EM1Ie/qAUvTMLkz9q9lYiSdhhKPVVk2I2p2e",
                "name": "Edison Zhou",
                "createdAt": "2019-11-19T15:40:07.871Z",
                "updatedAt": "2019-11-19T15:40:07.871Z",
                "__v": 0
            },
            "createdAt": "2019-11-20T18:51:22.436Z",
            "updatedAt": "2019-11-20T18:51:33.850Z",
            "__v": 0
        },
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dd5849c92f0970cdd286ec9",
            "QuestionId": "5dd53a302e391ff7bfc7acbc",
            "description": "<p>I'm joining too</p>",
            "UserId": {
                "watched_tags": [],
                "_id": "5dd50fcbc20eb1f05d1ce4e7",
                "email": "arya@stark.com",
                "password": "$2a$10$ByMsFJ7rmM3hAfVh60Ef9ud89zhf.06sBSkD7Hhcg7Dka2DVWAs3m",
                "name": "Arya Stark",
                "createdAt": "2019-11-20T10:04:59.522Z",
                "updatedAt": "2019-11-20T10:04:59.522Z",
                "__v": 0
            },
            "createdAt": "2019-11-20T18:23:24.997Z",
            "updatedAt": "2019-11-21T01:14:22.052Z",
            "__v": 8
        },
        {
            "upvotes": [],
            "downvotes": [],
            "_id": "5dd53e5e2e391ff7bfc7acbf",
            "QuestionId": "5dd53a302e391ff7bfc7acbc",
            "description": "I'm fine thanks",
            "UserId": {
                "watched_tags": [],
                "_id": "5dd40cd71cd1e575ae01da63",
                "email": "edirates@gmail.com",
                "password": "$2a$10$NAwwU5lFeLa1IloD7EM1Ie/qAUvTMLkz9q9lYiSdhhKPVVk2I2p2e",
                "name": "Edison Zhou",
                "createdAt": "2019-11-19T15:40:07.871Z",
                "updatedAt": "2019-11-19T15:40:07.871Z",
                "__v": 0
            },
            "createdAt": "2019-11-20T13:23:42.642Z",
            "updatedAt": "2019-11-20T16:40:45.542Z",
            "__v": 2
        }
    ],
    "tags": [
        "life",
        " wonder"
    ],
    "views": [
        "5dd40cd71cd1e575ae01da63"
    ],
    "_id": "5dd53a302e391ff7bfc7acbc",
    "title": "First Question",
    "description": "How  are you?",
    "UserId": {
        "watched_tags": [],
        "_id": "5dd40cd71cd1e575ae01da63",
        "email": "edirates@gmail.com",
        "name": "Edison Zhou",
        "createdAt": "2019-11-19T15:40:07.871Z",
        "updatedAt": "2019-11-19T15:40:07.871Z",
        "__v": 0
    },
    "createdAt": "2019-11-20T13:05:52.482Z",
    "updatedAt": "2019-11-21T01:36:50.663Z",
    "__v": 7,
    "solution": "5dd5849c92f0970cdd286ec9"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**4. Add A Question**
----
Add a new question :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/questions`  |
| **Method**                    | `POST`        |
| **Authentication Required**   | YES           |
| **Authorization Required**    | NO            |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                      |
| ----------------------------- | -------------------------- |
| **name**                      | `<question name>`          |
| **description**               | `<question description>`   |
| **tags**                      | `<question tags>`          |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "upvotes": [],
    "downvotes": [],
    "answers": [],
    "tags": [
        "life, wonder"
    ],
    "views": [],
    "_id": "5dd618067757be272fed3ca3",
    "title": "Stark Question",
    "description": "How  are you?",
    "UserId": "5dd50fcbc20eb1f05d1ce4e7",
    "createdAt": "2019-11-21T04:52:22.765Z",
    "updatedAt": "2019-11-21T04:52:22.765Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**5. Update A Question**
----
Update a specific question :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/questions/:id`  |
| **Method**                    | `PUT`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<question ID>`      |

Request Body :
| Field Name                    | Value                       |
| ----------------------------- | --------------------------- |
| **name**                      | `<question name>`           |
| **description**               | `<question description>`    |
| **tags**                      | `<question price>`          |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "upvotes": [],
    "downvotes": [],
    "answers": [],
    "tags": [
        "update, put"
    ],
    "views": [],
    "_id": "5dd618067757be272fed3ca3",
    "title": "First Modified",
    "description": "We changed it",
    "UserId": {
        "watched_tags": [],
        "_id": "5dd50fcbc20eb1f05d1ce4e7",
        "email": "arya@stark.com",
        "name": "Arya Stark",
        "createdAt": "2019-11-20T10:04:59.522Z",
        "updatedAt": "2019-11-20T10:04:59.522Z",
        "__v": 0
    },
    "createdAt": "2019-11-21T04:52:22.765Z",
    "updatedAt": "2019-11-21T04:58:36.382Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**6. Delete A Question**
----
Delete a specific question :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/questions/:id`     |
| **Method**                    | `DELETE`             |
| **Authentication Required**   | YES                  |
| **Authorization Required**    | YES                  |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<question ID>`       |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Question deleted successfully"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**7. Increment View Count**
----
Add view count whenever new user view the question :
| Syntax                        | Description            |
| ----------------------------- | ---------------------- |
| **URL**                       | `/questions/view/:id`  |
| **Method**                    | `PATCH`                |
| **Authentication Required**   | YES                    |
| **Authorization Required**    | NO                     |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<question ID>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Viewed question"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**8. Upvote Question**
----
Upvote for the question :
| Syntax                        | Description              |
| ----------------------------- | ------------------------ |
| **URL**                       | `/questions/upvote/:id`  |
| **Method**                    | `PATCH`                  |
| **Authentication Required**   | YES                      |
| **Authorization Required**    | NO                       |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<question ID>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Upvoted question"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "You cannot vote your own answer"
  }
  ```

**9. Downvote Question**
----
Downvote for the question :
| Syntax                        | Description                |
| ----------------------------- | -------------------------- |
| **URL**                       | `/questions/downvote/:id`  |
| **Method**                    | `PATCH`                    |
| **Authentication Required**   | YES                        |
| **Authorization Required**    | NO                         |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<question ID>`      |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Downvoted question"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "You cannot vote your own answer"
  }
  ```

**10. Mark Solution**
----
Mark an answer as solution for the question :
| Syntax                        | Description                |
| ----------------------------- | -------------------------- |
| **URL**                       | `/questions/solution/:id`  |
| **Method**                    | `PATCH`                    |
| **Authentication Required**   | YES                        |
| **Authorization Required**    | NO                         |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<question ID>`      |

Request Body :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **AnswerId**                  | `<answer ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Solution selected"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

---
# Answers

**1. Show All Answers**
----
Show all answers from all users in database :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/answers/`       |
| **Method**                    | `GET`             |
| **Authentication Required**   | NO                |
| **Authorization Required**    | NO                |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  [
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5dd5849c92f0970cdd286ec9",
        "QuestionId": {
            "upvotes": [],
            "downvotes": [],
            "answers": [
                "5dd53e5e2e391ff7bfc7acbf",
                "5dd5849c92f0970cdd286ec9",
                "5dd58b2a92f0970cdd286eca"
            ],
            "tags": [
                "life",
                " wonder"
            ],
            "views": [
                "5dd40cd71cd1e575ae01da63"
            ],
            "_id": "5dd53a302e391ff7bfc7acbc",
            "title": "First Question",
            "description": "How  are you?",
            "UserId": "5dd40cd71cd1e575ae01da63",
            "createdAt": "2019-11-20T13:05:52.482Z",
            "updatedAt": "2019-11-21T05:11:47.348Z",
            "__v": 7,
            "solution": "5dd58b2a92f0970cdd286eca"
        },
        "description": "<p>I'm joining too</p>",
        "UserId": {
            "watched_tags": [],
            "_id": "5dd50fcbc20eb1f05d1ce4e7",
            "email": "arya@stark.com",
            "name": "Arya Stark",
            "createdAt": "2019-11-20T10:04:59.522Z",
            "updatedAt": "2019-11-20T10:04:59.522Z",
            "__v": 0
        },
        "createdAt": "2019-11-20T18:23:24.997Z",
        "updatedAt": "2019-11-21T01:14:22.052Z",
        "__v": 8
    },
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5dd53e5e2e391ff7bfc7acbf",
        "QuestionId": {
            "upvotes": [],
            "downvotes": [],
            "answers": [
                "5dd53e5e2e391ff7bfc7acbf",
                "5dd5849c92f0970cdd286ec9",
                "5dd58b2a92f0970cdd286eca"
            ],
            "tags": [
                "life",
                " wonder"
            ],
            "views": [
                "5dd40cd71cd1e575ae01da63"
            ],
            "_id": "5dd53a302e391ff7bfc7acbc",
            "title": "First Question",
            "description": "How  are you?",
            "UserId": "5dd40cd71cd1e575ae01da63",
            "createdAt": "2019-11-20T13:05:52.482Z",
            "updatedAt": "2019-11-21T05:11:47.348Z",
            "__v": 7,
            "solution": "5dd58b2a92f0970cdd286eca"
        },
        "description": "I'm fine thanks",
        "UserId": {
            "watched_tags": [],
            "_id": "5dd40cd71cd1e575ae01da63",
            "email": "edirates@gmail.com",
            "name": "Edison Zhou",
            "createdAt": "2019-11-19T15:40:07.871Z",
            "updatedAt": "2019-11-19T15:40:07.871Z",
            "__v": 0
        },
        "createdAt": "2019-11-20T13:23:42.642Z",
        "updatedAt": "2019-11-20T16:40:45.542Z",
        "__v": 2
    }
  ]
  ```
Error Response : 
  * **HTTP Code :** 500 (Internal Server Error)
  * **JSON Response :**
  ```html
  {
    "message": "Internal Server Error."
  }
  ```

**2. Show Detail of One Answer**
----
Show detail of a specific answer :
| Syntax                        | Description           |
| ----------------------------- | --------------------- |
| **URL**                       | `/answers/:id`        |
| **Method**                    | `GET`                 |
| **Authentication Required**   | NO                    |
| **Authorization Required**    | NO                    |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<product ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "upvotes": [],
    "downvotes": [],
    "_id": "5dd53e5e2e391ff7bfc7acbf",
    "QuestionId": {
        "upvotes": [],
        "downvotes": [],
        "answers": [
            "5dd53e5e2e391ff7bfc7acbf",
            "5dd5849c92f0970cdd286ec9",
            "5dd58b2a92f0970cdd286eca"
        ],
        "tags": [
            "life",
            " wonder"
        ],
        "views": [
            "5dd40cd71cd1e575ae01da63"
        ],
        "_id": "5dd53a302e391ff7bfc7acbc",
        "title": "First Question",
        "description": "How  are you?",
        "UserId": "5dd40cd71cd1e575ae01da63",
        "createdAt": "2019-11-20T13:05:52.482Z",
        "updatedAt": "2019-11-21T05:11:47.348Z",
        "__v": 7,
        "solution": "5dd58b2a92f0970cdd286eca"
    },
    "description": "I'm fine thanks",
    "UserId": {
        "watched_tags": [],
        "_id": "5dd40cd71cd1e575ae01da63",
        "email": "edirates@gmail.com",
        "name": "Edison Zhou",
        "createdAt": "2019-11-19T15:40:07.871Z",
        "updatedAt": "2019-11-19T15:40:07.871Z",
        "__v": 0
    },
    "createdAt": "2019-11-20T13:23:42.642Z",
    "updatedAt": "2019-11-20T16:40:45.542Z",
    "__v": 2
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**3. Add An Answer**
----
Add a new answer :
| Syntax                        | Description   |
| ----------------------------- | ------------- |
| **URL**                       | `/answers`    |
| **Method**                    | `POST`        |
| **Authentication Required**   | YES           |
| **Authorization Required**    | NO            |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Body :
| Field Name                    | Value                      |
| ----------------------------- | -------------------------- |
| **QuestionId**                | `<question ID>`            |
| **description**               | `<answer description>`     |

Success Response :
  * **HTTP Code :** 201 (Created)
  * **JSON Response :**
  ```html
  {
    "upvotes": [],
    "downvotes": [],
    "_id": "5dd61f337757be272fed3ca5",
    "QuestionId": "5dd61acb7757be272fed3ca4",
    "description": "I'm fine thanks",
    "UserId": {
        "watched_tags": [],
        "_id": "5dd40cd71cd1e575ae01da63",
        "email": "edirates@gmail.com",
        "name": "Edison Zhou",
        "createdAt": "2019-11-19T15:40:07.871Z",
        "updatedAt": "2019-11-19T15:40:07.871Z",
        "__v": 0
    },
    "createdAt": "2019-11-21T05:22:59.131Z",
    "updatedAt": "2019-11-21T05:22:59.131Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You must log in first."
  }
  ```

**4. Update An Answer**
----
Update a specific answer :
| Syntax                        | Description       |
| ----------------------------- | ----------------- |
| **URL**                       | `/answers/:id`    |
| **Method**                    | `PUT`             |
| **Authentication Required**   | YES               |
| **Authorization Required**    | YES               |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<answer ID>`        |

Request Body :
| Field Name                    | Value                   |
| ----------------------------- | ----------------------- |
| **description**               | `<answer description>`  |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "upvotes": [],
    "downvotes": [],
    "_id": "5dd61f337757be272fed3ca5",
    "QuestionId": {
        "upvotes": [
            "5dd40cd71cd1e575ae01da63"
        ],
        "downvotes": [],
        "answers": [
            "5dd61f337757be272fed3ca5"
        ],
        "tags": [
            "life, wonder"
        ],
        "views": [
            "5dd40cd71cd1e575ae01da63"
        ],
        "_id": "5dd61acb7757be272fed3ca4",
        "title": "Stark Question",
        "description": "How  are you?",
        "UserId": "5dd50fcbc20eb1f05d1ce4e7",
        "createdAt": "2019-11-21T05:04:11.204Z",
        "updatedAt": "2019-11-21T05:22:59.137Z",
        "__v": 2
    },
    "description": "Yoohooo",
    "UserId": {
        "watched_tags": [],
        "_id": "5dd40cd71cd1e575ae01da63",
        "email": "edirates@gmail.com",
        "name": "Edison Zhou",
        "createdAt": "2019-11-19T15:40:07.871Z",
        "updatedAt": "2019-11-19T15:40:07.871Z",
        "__v": 0
    },
    "createdAt": "2019-11-21T05:22:59.131Z",
    "updatedAt": "2019-11-21T05:24:35.321Z",
    "__v": 0
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**5. Delete An Answer**
----
Delete a specific answer :
| Syntax                        | Description          |
| ----------------------------- | -------------------- |
| **URL**                       | `/answers/:id`       |
| **Method**                    | `DELETE`             |
| **Authentication Required**   | YES                  |
| **Authorization Required**    | YES                  |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                 |
| ----------------------------- | --------------------- |
| **id**                        | `<answer ID>`         |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Answer deleted successfully"
  }
  ```
Error Response : 
  * **HTTP Code :** 403 (Forbidden)
  * **JSON Response :**
  ```html
  {
    "message": "You are not authorized."
  }
  ```

**6. Upvote An Answer**
----
Upvote for an answer :
| Syntax                        | Description              |
| ----------------------------- | ------------------------ |
| **URL**                       | `/answers/upvote/:id`    |
| **Method**                    | `PATCH`                  |
| **Authentication Required**   | YES                      |
| **Authorization Required**    | NO                       |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<answer ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Upvoted answer"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "You cannot vote your own answer"
  }
  ```

**9. Downvote An Answer**
----
Downvote for an answer :
| Syntax                        | Description                |
| ----------------------------- | -------------------------- |
| **URL**                       | `/answers/downvote/:id`    |
| **Method**                    | `PATCH`                    |
| **Authentication Required**   | YES                        |
| **Authorization Required**    | NO                         |

Request Headers :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **jwt_token**                 | `<your JWT Token>`   |

Request Params :
| Field Name                    | Value                |
| ----------------------------- | -------------------- |
| **id**                        | `<answer ID>`        |

Success Response :
  * **HTTP Code :** 200 (OK)
  * **JSON Response :**
  ```html
  {
    "message": "Downvoted answer"
  }
  ```
Error Response : 
  * **HTTP Code :** 400 (Bad Request)
  * **JSON Response :**
  ```html
  {
    "message": "You cannot vote your own answer"
  }
  ```
