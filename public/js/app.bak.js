angular.module('laborGate', [])
.controller('taskController', ($scope, $http) => { 
	
	$scope.getTasks = () => {
		console.log("Controller fired!")
		$scope.formData = {};
		$scope.taskData = {};
		$http.get('/api/tasks')
		.then(function(data) { 
			$scope.taskData = data;
			$scope.formData = {};
			console.log(data);
		})
		.catch(function(error) { 
			console.log('Error: ' + error);
		});
	};

	$scope.createTask = () => {
		console.log($scope.formData);
		$http.post('/api/tasks', $scope.formData)
		.then(function(data) { 
			$scope.formData = {};
			$scope.taskData = data;
			console.log(data);
		})
		.catch(function(error) { 
			console.log("Error: " + error);
		});
	};

	$scope.deleteTask = (taskID) => { 
		$http.delete('/api/tasks/' + taskID)
		.then(function(data) { 
			$scope.taskData = data;
			console.log(data);
		})
		.catch(function(error) { 
			console.log("Error: " + error);
		});
	};
});