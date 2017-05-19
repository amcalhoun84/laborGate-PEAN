var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var db = require('./query');

//API hooks

router.get('/api/users', db.getUsers);
router.get('/api/groups', db.getGroups);
router.get('/api/tasks', db.getTasks);

router.get('/api/usertasks/', db.getUsersAndTasks);
router.get('/api/usertasks/:name', db.getUsersAndTasksByName);
router.get('/api/usertasksid/:id', db.getUsersAndTasksById);

// future hooks
/*

router.get('/api/usergroups/', db.getUserGroups);
router.get('/api/usergroups/:name', getGroupsByUserName);
router.get('/api/groupusers/', getUsersInGroup);



*/

router.get('/api/users/:id', db.getUserById);
router.get('/api/groups/:id', db.getGroupById);
router.get('/api/tasks/:id', db.getTaskById);

router.post('/api/users/', db.createUser); 
router.post('/api/tasks/', db.createTask);
router.post('/api/groups/', db.createGroup);

router.put('/api/users/:id', db.updateUser);
router.put('/api/tasks/:id', db.updateTask);
router.put('/api/groups/:id', db.updateGroup);

router.delete('/api/users/:id', db.deleteUser);
router.delete('/api/tasks/:id', db.deleteTask);
router.delete('/api/groups/:id', db.deleteGroup);

module.exports = router;