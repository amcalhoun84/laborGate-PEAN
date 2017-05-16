angular.module('laborGate', [])
.controller('userController', ($scope, $http) => { 
	
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
});