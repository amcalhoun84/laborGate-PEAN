angular.
	module('laborGate', ['$location', '$scope', '$rootscope', 'AuthenticationService'])
	.controller('LoginController', ($location, $scope, $rootscope, AuthenticationService) => { 

	var vm = this;
	vm.login = login;

	(function initController() { 
		AuthenticationService.ClearCredentials();
	})();

	function login() { 
		vm.dataLoading = true;
		AuthenticationService.Login(vm.email, vm.password, function(response) { 
			if(response.data.length ===1) { // ensure that we do not have duplicate accounts during the early period building of the app and go from there. 
				// When using root scope this is critically important as injections can occur. 
				AuthenticationService.SetCredentials(vm.email, vm.password, response.data[0].user_name);
				alert("Welcome " + response.data[0].user_name);
				$location.path('/');
			} else { 
				console.log("Login Failed!");
				alert("Login Failed!");
				vm.dataLoading = false;
			}
		});
	};
};


