angular.module('laborGate', [])
.controller('appController', ($scope, $http) => { 
	

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

	}

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
});