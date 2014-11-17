/** @jsx React.DOM */
(function () {
	'use strict';

	var Quiz = React.createClass({displayName: 'Quiz',
		propTypes: {
			data: React.PropTypes.array.isRequired
		},
		getInitialState: function () {
			return _.extend({
				bgClass: 'neutral',
				showContinue: false
			}, this.props.data.selectGame());
		},
		handleBookSelected: function (title) {
			var isCorrect = this.state.checkAnswer(title);
			this.setState({
				bgClass: isCorrect ? 'pass' : 'fail',
				showContinue: isCorrect
			});
		},
		handleContinue: function () {
			this.setState(this.getInitialState());
		},
		handleAddGame: function () {
			routie('add');
		},
		render: function () {
			return (
			React.createElement("div", null, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-md-4"}, 
						React.createElement("img", {src: this.state.author.imageUrl, className: "authorimage col-md-3"})
					), 
					React.createElement("div", {className: "col-md-7"}, 
						this.state.books.map(function (b) {
							return React.createElement(Book, {onBookSelected: this.handleBookSelected, title: b});
						}, this)
					), 
					React.createElement("div", {className: "col-md-1 " + this.state.bgClass})
				), 
				this.state.showContinue ? (
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col-md-12"}, 
							React.createElement("input", {	onClick: this.handleContinue, 
									type: "button", 
									className: "btn btn-primary btn-lg pull-right", 
									value: "Continue"})
						)
					)) : React.createElement("span", null), 
				
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-md-12"}, 
						React.createElement("input", {	onClick: this.handleAddGame, 
								id: "addGameButton", 
								type: "button", 
								value: "Add Game", 
								class: "btn "})
					)
				)
			));
		}
	});

	var Book = React.createClass({displayName: 'Book',
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		handleClick: function () {
			this.props.onBookSelected(this.props.title);
		},
		render: function () {
			return 	React.createElement("div", {onClick: this.handleClick, className: "answer"}, 
						React.createElement("h4", null, this.props.title)
					);
		}
	});

	var AddGameForm = React.createClass({displayName: 'AddGameForm',
		propTypes: {
			onGameFormSubmitted: React.PropTypes.func.isRequired
		},
		handleSubmit: function () {
			this.props.onGameFormSubmitted(getRefs(this));
			return false;
		},
		render: function () {
			return (
			React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-md-12"}, 
					React.createElement("h1", null, "Add Game"), 
					React.createElement("form", {role: "form", onSubmit: this.handleSubmit}, 
						React.createElement("div", {className: "form-group"}, 
							React.createElement("input", {ref: "imageUrl", type: "text", className: "form-control", placeholder: "Image Url"})
						), 
						React.createElement("div", {className: "form-group"}, 
							React.createElement("input", {ref: "answer1", type: "text", className: "form-control", placeholder: "Answer 1"})
						), 
						React.createElement("div", {className: "form-group"}, 
							React.createElement("input", {ref: "answer2", type: "text", className: "form-control", placeholder: "Answer 2"})
						), 
						React.createElement("div", {className: "form-group"}, 
							React.createElement("input", {ref: "answer3", type: "text", className: "form-control", placeholder: "Answer 3"})
						), 
						React.createElement("div", {className: "form-group"}, 
							React.createElement("input", {ref: "answer4", type: "text", className: "form-control", placeholder: "Answer 4"})
						), 
					  React.createElement("button", {type: "submit", className: "btn btn-default"}, "Submit")
					)
				)
			));
		}
	});

    var data = [
        {
            name: 'Mark Twain', 
            imageUrl: 'images/authors/marktwain.jpg',
            books: ['The Adventures of Huckleberry Finn']
        },
        {
            name: 'Joseph Conrad',
            imageUrl: 'images/authors/josephconrad.png',
            books: ['Heart of Darkness']
        },
        {
            name: 'J.K. Rowling',
            imageUrl: 'images/authors/jkrowling.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Daniel Ogren',
            books: ['Harry Potter and the Sorcerers Stone']
        },
        {
            name: 'Stephen King',
            imageUrl: 'images/authors/stephenking.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Pinguino',
            books: ['The Shining','IT']
        },
        {
            name: 'Charles Dickens',
            imageUrl: 'images/authors/charlesdickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale of Two Cities']
        },
        {
            name: 'William Shakespeare',
            imageUrl: 'images/authors/williamshakespeare.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
        }
    ];

    var selectGame = function () {
    	var books = _.shuffle(this.reduce(function (p, c, i) {
    		return p.concat(c.books);
    	}, [])).slice(0,4);

    	var answer = books[_.random(books.length - 1)];

    	return {
    		books: books,
    		author: _.find(this, function (author) {
    			return author.books.some(function (title) {
    				return title === answer;
    			});
    		}),

    		checkAnswer: function (title) {
    			return this.author.books.some(function (t) {
    				return t === title;
    			});
    		}
    	};
    };

    data.selectGame = selectGame;

    routie({
    	'': function () {
			React.renderComponent(
				React.createElement(Quiz, {data: data}),
				document.getElementById('app'));
    	},
    	'add': function () {
    		React.renderComponent(React.createElement(AddGameForm, {onGameFormSubmitted: handleAddFormSubmitted}),
    			document.getElementById('app'));
    	}
    });

    function handleAddFormSubmitted(data) {
    	var quizData = [{
    		imageUrl: data.imageUrl,
    		books: [data.answer1, data.answer2, data.answer3, data.answer4]
    	}];
    	quizData.selectGame = selectGame;
    	React.renderComponent(React.createElement(Quiz, {data: quizData}),
    		document.getElementById('app'));
    }

    function getRefs(component) {
    	var result = {};
    	Object.keys(component.refs).forEach(function (refName) {
    		result[refName] = component.refs[refName].getDOMNode().value;
    	});

    	return result;
    }
})();