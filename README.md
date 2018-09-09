# todo-activity

### list of index routes 
Routes | Methods | Description
-------|---------|------------
_/_ | POST | Register New Account
_/signin_ | POST | Signin with manual way
_/signin/facebook_ | POST | Signin with facebook

### list of task routes

Routes | Methods | Description 
-------|---------|------------
_/tasks_ | POST | Create a new task
_/tasks/_ | GET | Get uncomplete task
_/tasks/complete_ | GET | Get complete task
_/tasks/reminder_ | GET | Get a reminder / sent a reminder
_/tasks/todaytask_ | GET | Get all today task
_/tasks/:id_ | PUT | Update Task info
_/tasks/:id/complete_ | PUT | Update Task as complete
_/tasks/:id_ | DELETE | Delete task

### list of weather routes 

Routes | Methods | Description 
-------|---------|------------
_/weathers_ | GET | Get weather info

ket: 
base url = http://localhost:3000

## Usage

```
npm install
npm run dev