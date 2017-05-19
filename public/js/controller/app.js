angular.module('laborGate', ['ngRoute', '720kb.datepicker'])
	.config(function($routeProvider, $locationProvider) { 
	$routeProvider
	.when("/", { 
		//controller: 'appController',
		templateUrl: '/view/tasks.view.html',
		//controllerAs: 'vm'
	})
	.when('/users', { 
		templateUrl: '/view/users.view.html'
	})
	.when('/groups', {
		templateUrl: '/view/groups.view.html'
	})
	.when('/createUser', {
		templateUrl: '/view/createUser.view.html'
	})
	.when('/createTask', { 
		templateUrl: '/view/createTask.view.html'
	})
	.when('/createUser', { 
		templateUrl: '/view/createUser.view.html'
	})
	.when('/updateUser', { 
		template: "<h3 style='text-align: center'> Nothing here yet, please check back later. </h3>"
	})
	.when('/updateTask', { 
		template: "<h3 style='text-align: center'> Nothing here yet, please check back later. </h3>"
	})
	.when('/updateGroup', { 
		template: "<h3 style='text-align: center'> Nothing here yet, please check back later. </h3>"
	})
})

.controller('appController', ($scope, $http) => { 
	
	// CreateTask key-value pairs and ng-option/repeat:

	$scope.urgency = 
        [
          { key: 0, value: "Low"}, 
          { key: 1, value: "Medium" } , 
          { key: 2, value: "High"}, 
          { key: 3, value: "Urgent"},
          { key: 4, value: "Immediate"}
        ];

    // This will eventually change to be pulled directly from the Users table within the database. 

    $scope.assignTo = ["Andrew", "Jackie", "Karl"];



	// CREATEUSER key-value pairs: -- the level of the user, once integrated will affect what they are able to do.
	$scope.type = [
	        { key: 0, value: "Admin" },  // Can add, edit, and delete tasks that are assigned and not-assigned to them.
	        { key: 1, value: "Editor" }, // Can add and edit tasks that are assigned to them and their group.
	        { key: 2, value: "Contributor" }, // Can add to and edit tasks that are assigned to them.
	        { key: 3, value: "Viewer" }, // Strictly observational. They can look at tasks. 
	        { key: 4, value: "Restricted" } // Sees nothing.
        ];

	// API control calls -- this pulls the data from the forms on the assorted pages and then 
	// feeds it into a JSON format for the postgreSQL database -- refer to ./query.js and ./routes.js
	// for reference.

	$scope.getUsersAndTasks = () => { 
		console.log("Controller fired!")
		$scope.formData = {};
		$scope.taskData = {};
		$http.get('/api/usertasks/')
		.success((data) => { 
			$scope.taskData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log('Error: ' + error);
		});
	};

	$scope.getUserAndTasksByName = (userName) => { 
		console.log("Searching for tasks by name!")
		$scope.formData = {};
		$scope.taskData = {};
		$http.get('/api/usertasks/' + userName)
		.success((data) => { 
			$scope.taskData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log('Error: ' + error);
		});
	};

	$scope.getUsers = () => {
		console.log("Controller fired!")
		$scope.formData = {};
		$scope.userData = {};
		$http.get('/api/users')
		.success((data) => { 
			$scope.userData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log('Error: ' + error);
		});
	};

	$scope.getGroups = () => {
		console.log("Controller fired!");
		$scope.formData = {};
		$scope.groupData = {};
		$http.get('/api/groups')
		.success((data) => { 
			$scope.groupData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log('Error: ' + error);
		});
	};

	$scope.createTask = () => {
		console.log($scope.formData);
		$http.post('/api/tasks', $scope.formData)
		.success((data) => { 
			$scope.formData = {};
			$scope.taskData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};

	$scope.createGroup = () => {
		console.log($scope.formData);
		$http.post('/api/groups', $scope.formData)
		.success((data) => { 
			$scope.formData = {};
			$scope.groupData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};

	$scope.createUser = () => {
		console.log($scope.formData);
		$http.post('/api/users', $scope.formData)
		.success((data) => { 
			$scope.formData = {};
			$scope.userData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};


	// Basic Delete calls. These will likely be updated and refactored as the framework continues to evolve.
	// However, for now they exist to demonstrate and test CRUD. 


	$scope.deleteTask = (taskID) => { 
		$http.delete('/api/tasks/' + taskID)
		.success((data) => { 
			$scope.taskData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};

	$scope.deleteUser = (userID) => { 
		$http.delete('/api/users/' + userID)
		.success((data) => { 
			$scope.userData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};
	
	$scope.deleteGroup = (groupID) => { 
		$http.delete('/api/groups/' + groupID)
		.success((data) => { 
			$scope.groupData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};


	// UPDATE Tools.
	$scope.updateTask = (taskID) => { 
		$http.put('/api/tasks/' + taskID)
		.success((data) => { 
			$scope.formData = {};
			$scope.taskData = data;
			console.log(data);
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};

	$scope.updateUser = (userID) => { 
		$http.put('/api/users/' + userID)
		.success((data) => {
			$scope.formData = {};
			$scope.userData = data; 
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};

	$scope.updateGroup = (groupID) => { 
		$http.put('/api/groups/' + userID)
		.success((data) => {
			$scope.formData = {};
			$scope.groupData = data; 
		})
		.error((error) => { 
			console.log("Error: " + error);
		});
	};
});