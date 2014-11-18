define(['angular', 'components/helloComponent', 'ngReact'], function (angular, helloComponent) {
	var registerComponent = function (app, componentRec) {
		app.value(componentRec.name, componentRec.component)
	}

	var bootstrapAngular = function(appName) {
	    angular.element(document).ready(function() {
	      	angular.bootstrap(document, ['app']);
	    });
	}

	var appName = 'app';



	var app = angular.module(appName, ['react']);

	app.controller('helloController', [ '$scope', function ($scope) {
		$scope.person = { fname: 'Clark', lname: 'Kent' };
	}]);

	registerComponent(app, helloComponent);

	bootstrapAngular(appName);

});