angular.module('laborGate', [])
.controller('taskController', ($scope, $http) => { 
	console.log("Controller fired!")
	$scope.formData = {};
	$scope.taskData = {};
	$http.get('/api/tasks')
	.success((data) => { 
		$scope.taskData = data;
		console.log(data);
	})
	.error((error) => { 
		console.log('Error: ' + error);
	});

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
});