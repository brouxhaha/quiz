	function Quiz(){

		this.allQuestions = [
			        {id: 1, question: 'Who was the first president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], answer: 'George Washington'},
			        {id: 2, question: 'Who was the sixteenth president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 'Abraham Lincoln'},
			        {id: 3, question: 'Who was the third president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 'Thomas Jefferson'},
			        {id: 4, question: 'Who was the main character of <i>The Jeffersons</i>?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 'George Jefferson'}
			],

			this.settings = {
				userName: "",
				userPass: "",
				userScore: [],
				cookieValue: CookieUtil.get[0],
				numberQuestions: this.allQuestions.length,
				questionNumber: 0
			},

			/*userElements = {
				userForm: document.getElementsByClassName('user-form')[0],
				loginButton: document.getElementsByClassName('login-show')[0],
				signupButton: document.getElementsByClassName('signup-show')[0],
				userSubmit: document.getElementsByClassName('submit-user'),

				checkCookie: function(){
					if(typeof this.cookieValue === 'string'){
						setLoginSignup();
					} else {
						displayWelcomeMessage();
					}
				},

				setLoginSignup: function(){

				},

				showUserForm: function(){

				},

				addUser: function(){

				},

				checkUserCredentials: function(){

				},

				displayWelcome: function(){

				},
			},*/

		this.quizElements = {
				questionsTemplate: $('#quiz-template').html(),
				questionsContainer: $('#quiz'),
				questionNext: $('#questionNext'),
				questionPrev: $('#questionPrev'),
				quizSubmit: $('#quizSubmit')
		}
	};

	Quiz.prototype = {

		init: function(){
			var self = this;

			this.createQuestions();
			this.attachQuestionsTemplate();
			this.questionToggle();

		},

		createQuestions: function(){
			this.questions = this.allQuestions.map(function(item, index, q){
				return new Question(item.id, item.question, item.choices, item.answer);
			});
		},

		attachQuestionsTemplate: function(){
			var template = Handlebars.compile(this.quizElements.questionsTemplate);
			this.quizElements.questionsContainer.append(template(this.questions));
		},

		questionToggle: function(){
			$('#question' + this.settings.questionNumber).toggle();
		},

		/*displayPrevButton: function(){

		},

		displayNextButton: function(){

		},

		nextQuestion: function(){

		},

		previousQuestion: function(){

		},

		validateAnswer: function(){

		},

		changeQuestion: function(){

		},

		bindHandlers: function(){

		}*/

	};

	/* ********************************************
	Need to replace cookieutil with jQuery cookie functionality
	******************************************** */

	var CookieUtil = { //p. 772

		get: function(name){
			var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;

			if(cookieStart > -1){
				var cookieEnd = document.cookie.indexOf(';', cookieStart);
				if(cookieEnd == -1){
					cookieEnd = document.cookie.length;
				}
				cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
			}

			return cookieValue;
		},

		set: function(name, value, expires, path, domain, secure){
			var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

			if(expires instanceof Date){
				cookieText += '; expires=' + expires.toGMTString();
			}

			if(path){
				cookieText += '; path=' + path;
			}

			if(domain){
				cookieText += '; domain=' + domain;
			}

			if(secure){
				cookieText += '; secure';
			}

			document.cookie = cookieText;
		},

		unset: function(name, value){
			this.set(name, "", new Date(0), path, domain, secure);
		}
	};

	function Question(id, question, choices, answer){
		this.id = id;
		this.question = question;
		this.choices = choices;
		this.answer = answer;
		this.userAnswer = '';
	}

	Question.prototype = {
		getCorrectAnswer: function(){
			return this.answer;
		},
		setUserAnswer: function(answer){
			this.userAnswer = answer;
		},
		getUserAnswer: function(){
			return this.userAnswer;
		}

	}

$(document).ready(function(){
	var theQuiz = new Quiz();

	theQuiz.init();
});