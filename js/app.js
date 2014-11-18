/** @jsx React.DOM */
define(['angular', 'react', 'ngReact'], function (angular, React) {
	var app = angular.module('app', ['react']);

	app.controller('helloController', [ '$scope', function ($scope) {
			$scope.person = { fname: 'Clark', lname: 'Kent' };
		}]);

	var HelloComponent = React.createClass({
		propTypes: {
			fname: React.PropTypes.string.isRequired,
			lname: React.PropTypes.string.isRequired
		},
		render: function () {
			return <span>Hello {this.props.fname} {this.props.lname}</span>;
		}
	});

	app.value('HelloComponent', HelloComponent);

    angular.element(document).ready(function() {
   		console.log('A');
      	angular.bootstrap(document, ['app']);
      	console.log('B');
    });

});