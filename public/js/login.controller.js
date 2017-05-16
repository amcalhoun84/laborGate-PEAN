(function() { 

	'use strict';

	angular
		.module('laborGate')
		.controller('LoginController', LoginController);

		LoginControl.$inject = ['$location, AuthenticationService'];
		function LoginControl($location, AuthenticationService) { 

			var vm = this;
			vm.login = login;

			(function initController() { 
				AuthenticationService.ClearCredentials();

		})();

		function login() { 
			vm.dataLoading = true;
			AuthenticationService.Login(vm.email, vm.password, function(response) { 
				if(response.data.length === 1)
				{
					AuthenticationService.SetCredentials(vm.email, vm.password,  response.data[0].name);
					$location.path('/');
				} else { 
					console.log("Login Failed!");
					vm.dataLoading = false;
				}

			});
		};
	}
})();