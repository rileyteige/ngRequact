/** @jsx React.DOM */
(function () {

	var app = angular.module('app', ['react']);

	app.controller('helloController', [ '$scope', function ($scope) {
			$scope.person = { fname: 'Clark', lname: 'Kent' };
		}]);

	var HelloComponent = React.createClass({displayName: 'HelloComponent',
		propTypes: {
			fname: React.PropTypes.string.isRequired,
			lname: React.PropTypes.string.isRequired
		},
		render: function () {
			return React.createElement("span", null, "Hello ", this.props.fname, " ", this.props.lname);
		}
	});

	app.value('HelloComponent', HelloComponent);

})();