define(['angular', 'hello/HelloComponent', 'hello/HelloCtrl', 'ngReact'], function (angular, HelloComponent, HelloCtrl) {

	var appName = 'app',
	app = angular.module(appName, ['react']),

	controllers = [
		HelloCtrl
	],

	components = [
		HelloComponent
	],

	registerController = function (ctrlRec) {
		app.controller(ctrlRec.name, ctrlRec.controller);
	},

	registerComponent = function (componentRec) {
		app.value(componentRec.name, componentRec.component)
	};

	angular.forEach(controllers, registerController);
	angular.forEach(components, registerComponent);

	angular.element(document).ready(function() {
		angular.bootstrap(document, [appName]);
	});

});