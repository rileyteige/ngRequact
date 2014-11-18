require.config({
	baseUrl: 'build',

	paths: {
		angular: '../bower_components/angular/angular',
		react: "../bower_components/react/react",
		ngReact: '../bower_components/ngReact/ngReact.min',
		underscore: "../ext/underscore",
		routie: "../ext/routie"
	},

	shim: {
		ngReact: ['react'],

		angular: {
			exports: 'angular'
		},
		react: {
			exports: 'React'
		},
		
		underscore: {
			exports: '_'
		},
		routie: {
			exports: "routie"
		}
	}
});

require(['app'], function (app) {});