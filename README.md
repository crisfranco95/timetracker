# TimeTracker

Simple NodeJS app using MongoDB.


### Prerequisites

First of all you should verify that you have properly installed NodeJS and MongoDB in your machine.

```
node -v
```

### Installing

First clone this git repository:

```
git clone https://github.com/crisfranco95/timetracker.git
cd timetracker
```


Then make sure you install all the needed dependencies with
```
npm install
```
After all the dependencies are set up, configure all the enviroment variables, to do this create a .env file in the root of this project

```
touch .env
```
The enviroment variables needed to run the application are:
```
DB="your_db_connection_string"
HOST_FOR_TESTS="your_host_to_run_tests"
JWT_SECRET="your_jwt_secret_key_for_authentication_management"
```

Then make sure the DB is running correctly and then run the app with

```
npm start
```
or
```
node server
```

To make sure the application is responding properply use any of the API's endpoints explained in the following section.

## API documentation


### Register 
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| NO  |

```
Request: (URL)/api/v1/auth/register
Method: POST
```
```
Body: {
    "FirstName": "Cristian",
    "LastName": "Franco",
    "Email": "email@mail.com",
    "Username": "random_user",
    "Password": "abc123$"
}
```

### Authentication 
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| NO  |

```
Request: (URL)/api/v1/auth/authenticate
Method: POST
```
```
Body: {
	"Username" : "random_user",
	"Password" : "abc123$"
}
```

### Create a task
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |

```
Request: (URL)/api/v1/task
Headers: x-access-token - token
Method: POST
```
```
Body: {
	"Name" : "Test task",
	"Duration" : "12:20:12"
}
```

### Create a project
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |

```
Request: (URL)/api/v1/project
Headers: x-access-token - token
Method: POST
```
```
Body: {
	"Name" : "Project name",
	"Tasks" : ["task_id1", "task_id2" ]
}
```

### Get user's tasks 
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |
```
Request: (URL)/api/v1/task/user
Headers: x-access-token - token
Method: GET
```

### Get user's projects 
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |
```
Request: (URL)/api/v1/project/user
Headers: x-access-token - token
Method: GET
```


### Update task by Action (PAUSE, START, RESTART) 
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |
|Params| YES  |

```
Request: (URL)/api/v1/task/:action/:id
Headers: x-access-token - token
Method: PUT
Param - action: start - pause - restart
Param - id: task id
```


### Add following task 
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |
|Params| YES  |

```
Request: (URL)/api/v1/task/:action/:id
Headers: x-access-token - token
Method: PUT
Param - id: task id
```

```
Body: {
	"NextTask" : "task_id"
}
```

### Start following task 
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |
|Params| YES  |

```
Request: (URL)/api/v1/task/continue/:id
Headers: x-access-token - token
Method: PATCH
Param - id: task id
```

### Update project
|Item|Info|
|----|----|
|Response format  | JSON|
|Auth required| YES  |
|Params| YES  |

```
Request: (URL)/api/v1/project/:id
Headers: x-access-token - token
Method: PUT
Param - id: project id
```

```
Body: {
	"TotalTime" : "02:00:00"
}
```

## Running the tests

To run this applications tests 

```
npm test
```
### Break down into end to end tests

This tests ensure the right functionality of the application


## Deployment

This application can be deployed configurating the proper enviroment variables as explained before.

## Built With

* [NodeJS](https://nodejs.org/)
* [Express](https://expressjs.com/) - a minimal and flexible Node.js web application framework.
* [MongoDB](https://www.mongodb.com)

## Authors

* **Cristian Franco** - *Initial work* (https://github.com/crisfranco95)

## License

This project is licensed under the ISC License .

