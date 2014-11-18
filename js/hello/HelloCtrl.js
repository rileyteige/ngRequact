define([], function () {
	var HelloCtrl = [ '$scope', function ($scope) {
		$scope.person = { fname: 'Clark', lname: 'Kent' };
	}];

	return {
		name: 'HelloController',
		controller: HelloCtrl
	};
});