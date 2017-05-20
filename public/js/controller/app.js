// Best Practices normally have you sepearating the various services and controllers; however, this applicaiton 
// should be simple enough that everything, if well documented can be kept in a single app.js controller file.

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
	// this is temporary, will become the default when user is not logged in. Testing purposes.
	.when('/login', { 
		templateUrl: '/view/login.view.html'
	})
})

// Application Factories

	.factory(function($http, $cookies, $rootScope, $timeout) {
	// AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout'];
	// function AuthenticationService($http, $cookies, $rootScope, $timeout) {
		var service = {};

		service.Login = Login;
		service.SetCredentials = SetCredentials;
		service.ClearCredentials = ClearCredentials;
		
		return service;

		// In transition from mongoDB (BLECH!!!!) to postgreSQL, there might be no need for a callback.
		// This is NOT implemented yet until we are absolutely sure that authentication actually works properly.
		function Login(email, password, callback) { 

			console.log("Email: " + email + "\nPassword: " + password);

			$http.post('/api/authenticate/', { email: email, password: password })
			.then(function (response) { 
				callback(response);
				$rootScope.user = response.data[0];
			});

		}

		function SetCredentials(email, password, user_name) {

			var authdata = Base64.encode(email + ':' + password);

			$rootScope.globals = { 
				currentUser: { 
					user_name: user_name,
					email: email,
					password: password
				}
			};

			$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

			var cookieExp = new Date();

			cookieExp.setDate(cookieExp.getDate() + 3);
			console.log("Expiration date: " + cookieExp);
			$cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
		}

		function ClearCredentials() { 

			$rootScope.globals = {};
			$cookies.remove('globals');
			$http.defaults.headers.common.Authorization = 'basic';
		}

	

		var Base64 = { 

			keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

			encode: function(input) { 
				console.log("Beginning encoding...");
				var output = "";
				var chr1, chr2, chr3 = "";
				var enc1, enc2, enc3, enc4 = "";
				var i = 0;
				console.log("Input length: " + input.length);

				do { 
					// console.log("Loop run: " + i);
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr4 & 63;

					if(isNaN(chr2)) { 
						enc3 = enc2 = 64;
					} else if (isNaN(chr3)) { 
						enc4 = 64;
					}

					output = output +
						this.keyStr.charAt(enc1) +
						this.keyStr.charAt(enc2) + 
						this.keyStr.charAt(enc3) +
						this.keyStr.charAt(enc4);
					chr1 = chr2 = chr3 = "";
					enc1 = enc2 = enc3 = enc4 = "";
				}  while(i < input.length);

				console.log("AuthData Output: " + output);

				return output;
			},

			decode: function(input) { 
				var output = "";
				var chr1, chr2, chr3 = "";
				var enc1, enc2, enc3, enc4 = "";
				var i = 0;

				var base64test = /[^A-Za-z0-9\+\/\=]/g;
				if(base64test.exec(input)) { 
					window.alert("There is an invalid BASE64 INPUT found. Expect decoding errors...");
				}
				input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				do { 
					enc1 = this.keyStr.indexOf(input.charAt(i++));
					enc2 = this.keyStr.indexOf(input.charAt(i++));
					enc3 = this.keyStr.indexOf(input.charAt(i++));
					enc4 = this.keyStr.indexOf(input.charAt(i++));

					chr1 = (enc3 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output += String.fromCharCode(chr1);

					if(enc3 != 64) { 
						output += String.fromCharCode(chr2);
					}
					if(enc4 != 64) { 
						output += String.fromCharCode(chr3);
					}

					chr1 = chr2 = chr3 = "";
					enc1 = enc2 = enc3 = enc4 = "";

				} while(i < input.length);
			return output;
		}
	}
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


// Future Features, were interfering with basic features during regression, may ultimately be unecessary until
// 1 to M.

/*	$scope.getUsersAndTasks = () => { 
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
*/

	$scope.getTasks = () => {
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


	// Authentication Checks

	$scope.authenticateUser = () => { 
		console.log("Scope Info:" + $scope.formData);
		$http.post('/api/authenticate/', $scope.formData)
		.success((data) => { 
			$scope.formData = {};
			$scope.loginData = data;
		})
		.error((error) => { 
			console.log("Error: " + error);

		});

	};
});