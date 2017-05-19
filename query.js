var promise = require('bluebird');

var options = { 	// We can expand to allow for additional options later. Right now we are just trying to get the base query system to work properly. 
	promiseLib: promise
};

var pg = require('pg');
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:root@localhost:5432/laborGate';
var db = pgp(connectionString);

// Query List

function getUsers(req, res, next) { 
	console.log("Executing get users..");

	const results = [];
	pg.connect(connectionString, (err, client, done) => { 
		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		const query = client.query('SELECT * FROM users ORDER BY user_id ASC');
		//const query = client.query('SELECT * FROM users INNER JOIN tasks ON users.user_name = tasks.assignedto ORDER BY user_id ASC');
		query.on('row', (row) => { 
			console.log("ROW: " + row.user_id + " " + row.user_name + row.task_name);
			results.push(row);
		});

		query.on('end', () => { 
			
			// console.log(res.json(results));
			console.log("All tasks returned");
			console.log(results);
			//console.log(results);
			done();
			return res.json(results);
		});
	});

/*
	db.any('select * from users')
	 .then(function(data) { 
  	  res.status(200)
	    .json({
			status: 'success',
			data: data,
			message: 'Retrieved all users'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
*/

};

function getGroups(req, res, next) { 

/*	db.any('select * from groups')
	 .then(function(data) { 
  	  res.status(200)
	    .json({
			status: 'success',
			data: data,
			message: 'Retrieved all groups'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
};*/

	console.log("Executing get groups..");

	const results = [];
	pg.connect(connectionString, (err, client, done) => { 
		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		const query = client.query('SELECT * FROM groups ORDER BY group_id ASC');
		query.on('row', (row) => { 
			console.log("ROW: " + row.group_id + " " + row.name);
			results.push(row);
		});

		query.on('end', () => { 
			
			// console.log(res.json(results));
			console.log("All tasks returned");
			console.log(results);
			//console.log(results);
			done();
			return res.json(results);
		});
	});
};


function getTasks(req, res, next) { 
	console.log("Executing get tasks..");

	/*
	// This is for PURE BACK END -- integrating attempt at angular-js compatible usage below...
	//db.any('select * from tasks')
	db.any('select * from tasktest')
	 .then(function(data) { 
  	  res.status(200)
	    .json({
			status: 'success',
			data: data,
			message: 'Retrieved all tasks'
		});
	})
	.catch(function(err) { 
		return next(err);
	}); */


	const results = [];
	pg.connect(connectionString, (err, client, done) => { 
		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		const query = client.query('SELECT * FROM tasks ORDER BY task_id ASC');
		query.on('row', (row) => { 
			console.log("ROW: " + row.task_id + " " + row.name);
			results.push(row);
		});

		query.on('end', () => { 
			
			// console.log(res.json(results));
			console.log("All tasks returned");
			console.log(results);
			//console.log(results);
			done();
			return res.json(results);
		});
	});
};

// Get by specific circumstances

function getUsersAndTasks(req, res, next) { 
	console.log("Executing get users..");

	const results = [];
	pg.connect(connectionString, (err, client, done) => { 
		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		const query = client.query('SELECT * FROM users INNER JOIN tasks ON users.user_name = tasks.assignedto ORDER BY user_name ASC');
		query.on('row', (row) => { 
			console.log("ROW: " + row.user_id + " " + row.user_name + row.name);
			results.push(row);
		});

		query.on('end', () => { 
			
			// console.log(res.json(results));
			console.log("All tasks returned");
			console.log(results);
			//console.log(results);
			done();
			return res.json(results);
		});
	});
};


function getUsersAndTasksById(req, res, next) { 
	console.log("Executing getting tasks by id associated to users..");

	var id = parseInt(req.params.id);
	console.log("ID: " + id);
	const results = [];
	pg.connect(connectionString, (err, client, done) => { 
		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		const query = client.query('SELECT * FROM users INNER JOIN tasks ON users.user_name = tasks.assignedto WHERE tasks.task_id=$1', [id]);
		query.on('row', (row) => { 
			console.log("ROW: " + row.user_id + " " + row.user_name + row.name);
			results.push(row);
		});

		query.on('end', () => { 
			
			// console.log(res.json(results));
			console.log("All tasks returned");
			console.log(results);
			//console.log(results);
			done();
			return res.json(results);
		});
	});
};

function getUsersAndTasksByName(req, res, next) { 
	console.log("Executing get users..");

	var name = req.params.name;
	console.log(name);
	const results = [];
	pg.connect(connectionString, (err, client, done) => { 
		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		const query = client.query('SELECT * FROM users INNER JOIN tasks ON users.user_name = tasks.assignedto WHERE user_name=$1', [name]);
		query.on('row', (row) => { 
			console.log("ROW: " + row.user_id + " " + row.user_name + row.task_name);
			results.push(row);
		});

		query.on('end', () => { 
			
			// console.log(res.json(results));
			console.log("All tasks returned");
			console.log(results);
			//console.log(results);
			done();
			return res.json(results);
		});
	});

};


// get by ids

function getUserById(req, res, next) { 
	var queryID = parseInt(req.params.id);
	db.one('select * from users where id=$1', queryID)
	 .then(function(data) { 
  	  res.status(200)
	    .json({
			status: 'success',
			data: data,
			message: 'Retrieved one user'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
};

function getTaskById(req, res, next) { 
	var queryID = parseInt(req.params.id);
	db.one('select * from tasks where id=$1', queryID)
	 .then(function(data) { 
  	  res.status(200)
	    .json({
			status: 'success',
			data: data,
			message: 'Retrieved one task'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
};

function getGroupById(req, res, next) { 
	var queryID = parseInt(req.params.id);
	db.one('select * from groups where id=$1', queryID)
	 .then(function(data) { 
  	  res.status(200)
	    .json({
			status: 'success',
			data: data,
			message: 'Retrieved one group'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
};

// Creation Algorithms

// I am keeping this as is, because user creation should ONLY be done outside of the app...

function createUser(req, res, next) { 
	
	const results = []
	const data = { text: req.body.text,
				   email: req.body.email,
				   password: req.body.password,
				   type: req.body.type };
	console.log(data);
	pg.connect(connectionString, (err, client, done) => {

		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err}); 
		}

		client.query('INSERT INTO users(user_name, email, password, type) VALUES($1, $2, $3, $4)', 
			[data.text, data.email, data.password, data.type]);
		//const query = client.query('SELECT * FROM users ORDER by user_id ASC');

		//query.on('row', (row) => { 
		//	results.push(row);
		//});

		//query.on('end', () => { 
		//	done();
		//	return res.json(results);
		//});

	});

	/*
	db.none('insert into users(name, email, password, type)' + 'values(${name}, ${email}, ${password}, ${type})',
		req.body)
		.then(function() {
			res.status(200)
			.json({
				status: 'success',
				message: 'Created a new user.'
			});
		})
		.catch(function (err) { 
			return next(err);
		});
		*/
}

function createTask(req, res, next) { 
	const results = []
	const data = { text: req.body.text,
				   urgency: req.body.urgency, 
				   assignTo: req.body.assignTo,
				   description: req.body.description, 
				   date: req.body.date
				};
	pg.connect(connectionString, (err, client, done) => {

	console.log(data);

		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		// client.query('INSERT INTO tasks(name, urgency) VALUES($1, \'Low\')', 
		//	[data.text]);
		client.query('INSERT INTO tasks(name, urgency, description, due_date, assignedto, complete, overdue) VALUES($1, $2, $3, $4, $5, false, false)', 
			[data.text, data.urgency, data.description, data.date, data.assignTo]);
		
		// const query = client.query('SELECT * FROM tasks ORDER by task_id ASC');

		/*query.on('row', (row) => { 
			results.push(row);
		});

		query.on('end', () => { 
			done();
			return res.json(results);
		});
*/
	});

	// Move to Master Commands...
	/*db.none('insert into tasktest(task_name)' + 'values($1)',
	//db.none('insert into tasks(name, description, urgency, duedate, complete, overdue, assignedtoid)' + 'values(${name}, ${description}, ${urgency}, ${duedate}, ${complete}, ${overdue}, ${assignedtoid})',
		[req.body.text])
		.then(function() {
			res.status(200)
			.json({
				status: 'success',
				message: 'Created a new task.'
			});
		})
		.catch(function (err) { 
			return next(err);
		});
	db.any('select * from tasktest ORDER by task_id ASC')
	.then(function() { 
		res.status(200)
		.json({ 
			status: 'success',
			message: 'revealed all tasks'
		});
	})
	.catch(function(err) { 
		return next(err);
	});*/
};

function createGroup(req, res, next) { 
	
	const results = []
	const data = { text: req.body.text };
	pg.connect(connectionString, (err, client, done) => {

		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		client.query('INSERT INTO groups(name, type) VALUES($1, \'Testing\')', 
			[data.text]);
		const query = client.query('SELECT * FROM groups ORDER by group_id ASC');

		query.on('row', (row) => { 
			results.push(row);
		});

		query.on('end', () => { 
			done();
			return res.json(results);
		});

	});

	/*db.none('insert into groups(name, type)' + 'values(${name}, ${type})', 
		req.body)
		.then(function() { 
			res.status(200)
			.json({
				status: 'success',
				message: 'Created a new group.'
			});
		})
		.catch(function(err) { 
			return next(err);
		});*/
};

// Update Algorithms

function updateUser(req, res, next) { 
	//var queryID = req.params.id
	db.none('update users set name=$1, email=$2, password=$3, type=$4', 
	[req.body.name, req.body.email, req.body.password, req.body.type])
	.then(function() { 
		res.status(200)
		.json({
			status: 'success',
			message: 'Updated User'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
};

function updateTask(req, res, next) { 
	//var queryID = req.params.id
	db.none('update tasks set name=$1, description=$2, urgency=$3, due_date=$4', 
	[req.body.name, req.body.description, req.body.urgency, req.body.due_date])
	.then(function() { 
		res.status(200)
		.json({
			status: 'success',
			message: 'Updated Task'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
};

function updateGroup(req, res, next) { 
	db.none('update groups set name=$1, type=$2',
		[req.body.name, req.body.type])
		.then(function() { 
			res.status(200)
			.json({
				status: 'success',
				message: 'Updated Group'
			});
		})
		.catch(function(err) { 
			return next(err);
		});
}

function deleteUser(req, res, next) { 
	/*
	var queryID = parseInt(req.params.id);
	db.result('delete from users where id=$1', queryID)
	.then(function(result) { 
		res.status(200)
		.json({
			status: 'success',
			message: 'Removed ${result.rowCount} user'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
	*/

	const results = [];
	const id = req.params.id;

	pg.connect(connectionString, (err, client, done) => { 
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		client.query('DELETE FROM users WHERE user_id=$1', [id]);
		var query = client.query('SELECT * FROM users ORDER by user_id ASC');
		query.on('row', (row) => { 
			results.push(row);
		});

		query.on('end', () => { 
			done();
			return res.json(results);
		});

	});
}

function deleteTask(req, res, next) { 
	const results = [];
	const id = req.params.id;

	// Move to MASTER Controls Later.
	/*console.log("Deleting a number...")
	var queryID = req.params.id;
	console.log(queryID);
	db.result('delete from tasks where task_id=$1', [queryID])
	.then(function(result) { 
		res.status(200)
		.json({
			status: 'success',
			message: 'Removed ${result.rowCount} task'
		});
	})
	.catch(function(err) { 
		return next(err);
	});*/

	pg.connect(connectionString, (err, client, done) => { 
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		client.query('DELETE FROM tasks WHERE task_id=$1', [id]);
		var query = client.query('SELECT * FROM tasks ORDER by task_id ASC');
		query.on('row', (row) => { 
			results.push(row);
		});

		query.on('end', () => { 
			done();
			return res.json(results);
		});

	});
};

function deleteGroup(req, res, next) { 
	
	const results = [];
	const id = req.params.id;

	/*
	var queryID = parseInt(req.params.id);
	console.log(queryID);
	db.result('delete from groups where group_id=$1', queryID)
	.then(function(result) { 
		res.status(200)
		.json({
			status: 'success',
			message: 'Removed ${result.rowCount} group'
		});
	})
	.catch(function(err) { 
		return next(err);
	});
	*/

	pg.connect(connectionString, (err, client, done) => { 
		if(err)
		{
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		client.query('DELETE FROM groups WHERE group_id=$1', [id]);
		var query = client.query('SELECT * FROM groups ORDER by group_id ASC');
		query.on('row', (row) => { 
			results.push(row);
		});

		query.on('end', () => { 
			done();
			return res.json(results);
		});

	});
}

function authenticateUser(req, res, next) {
	
	const results = []
	const data = { email: req.body.email,
				   password: req.body.password
				 }
	
	console.log(data);
	pg.connect(connectionString, (err, client, done) => {

		if(err) { 
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err}); 
		}

		client.query('SELECT users.user_name FROM users where users.email = $1 AND users.password = $2', 
			[data.email, data.password]);
	});

}

module.exports = {

	// get-alls
	getUsers: getUsers,
	getTasks: getTasks,
	getGroups: getGroups,

	// Cross Reference Gets

	getUsersAndTasks: getUsersAndTasks,
	getUsersAndTasksByName: getUsersAndTasksByName,
	getUsersAndTasksById: getUsersAndTasksById,
	
	// Individual-Gets
	getUserById: getUserById,
	getTaskById: getTaskById,
	getGroupById: getGroupById,

	// posts

	createUser: createUser,
	createTask: createTask,
	createGroup: createGroup,

	// updats (put)

	updateUser: updateUser,
	updateTask: updateTask,
	updateGroup: updateGroup,

	// delete

	deleteUser: deleteUser,
	deleteGroup: deleteGroup,
	deleteTask: deleteTask

	// authenticate:

	authenticateUser: authenticateUser,

};
