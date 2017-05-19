angular.module('laborGate', [])
.controller('groupController', ($scope, $http) => { 
	
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