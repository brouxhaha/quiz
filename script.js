var allQuestions = [
	{question: 'Who was the first president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 1},
	{question: 'Who was the sixteenth president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 0},
	{question: 'Who was the third president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 2},
	{question: 'Who was the main character of <i>The Jeffersons</i>?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 3}
],
		CookieUtil = { //p. 772

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
		},
		userScore = [],
		theQuiz = document.getElementsByClassName('quiz')[0],
		questionNumber = 0,
		numberQuestions = allQuestions.length,
		cookieValue = CookieUtil.get('name');

if(cookieValue === null){
	console.log(cookieValue + " is null")
	setUpLoginSignup();
} else {
	console.log(cookieValue + " not null")
	displayWelcomeMessage(cookieValue);
}

createQuestion();


function setUpLoginSignup(){
	var userForm = document.getElementsByClassName('user-form')[0],
			signUpLink = document.getElementsByClassName('signup-show')[0],
			loginLink = document.getElementsByClassName('login-show')[0],
			userSubmitButton = document.getElementsByClassName('submit-user')[0],
			userName = '',
			password = '';

	//console.log(userSubmitButton);
	userForm.style.display = 'none';

	loginLink.addEventListener('click', showForm);
	signUpLink.addEventListener('click', showForm);

	function showForm(event){
		event.preventDefault();
		var loginOrSignup = this.className;

		if(loginOrSignup === 'signup-show'){
			userSubmitButton.value = 'Sign up';
			signUpLink.setAttribute("class", "signup-show active");
			loginLink.setAttribute("class", "login-show");
		} else if(loginOrSignup === 'login-show') {
			userSubmitButton.value = 'Login';
			loginLink.setAttribute("class", "login-show active");
			signUpLink.setAttribute("class", "signup-show");
		}
		userForm.style.display = '';

		if(userSubmitButton.value === 'Sign up'){
			userSubmitButton.addEventListener('click', addUser);
		} else {
			userSubmitButton.addEventListener('click', checkLoginCredentials)
		}

	}

	function addUser(){
		var userName = userForm.getElementsByClassName('user-name')[0].value;
		var password = userForm.getElementsByClassName('password')[0].value;

		if(userSubmitButton.value === 'Sign up'){
			localStorage.setItem('userName', userName);
			localStorage.setItem('password', password);
			CookieUtil.set('name', userName);
			console.log(userName);
			console.log(CookieUtil.get('name') + 'addUser function');
		} else {
			checkLoginCredentials(userName, password);
		}

		//console.log(localStorage.getItem('userName'));
		//console.log(localStorage.getItem('password'));
		displayWelcomeMessage(userName);
	}

	function checkLoginCredentials(){
		var storedUserName = localStorage.userName,
				storedPassword = localStorage.password,
				userName = userForm.getElementsByClassName('user-name')[0].value,
				password = userForm.getElementsByClassName('password')[0].value,
				loginError = userForm.getElementsByClassName('login-error')[0];

		//console.log(loginError);
		if(userName === storedUserName && password === storedPassword){
			displayWelcomeMessage(userName);
			CookieUtil.set('name', userName);
			console.log(CookieUtil.get('name'));
		} else {
			loginError.className = 'login-error';
		}
	}
}

function displayWelcomeMessage(uN){
	var theWelcomeElement = document.createElement('h3'),
			theWelcomeText = document.createTextNode('Welcome, ' + uN),
			loginSignupDiv = document.getElementsByClassName('login-signup')[0],
			loginSignupLinks = document.getElementsByClassName('links')[0],
			userForm = document.getElementsByClassName('user-form')[0];

	theWelcomeElement.className = 'welcome';

	loginSignupDiv.removeChild(loginSignupLinks);
	loginSignupDiv.removeChild(userForm);

	theWelcomeElement.appendChild(theWelcomeText);
	loginSignupDiv.appendChild(theWelcomeElement);
}

function createQuestion(){
	var theQuestionElement = document.createElement('h2'),
			theQuestionText = document.createTextNode(allQuestions[questionNumber]['question']);
	theQuestionElement.className = 'question';
	theQuiz.appendChild(theQuestionElement);
	theQuestionElement.appendChild(theQuestionText);

	theQuestionElement.style.display = 'none';
	$(theQuestionElement).fadeIn();
	createAnswers();
}

function createAnswers(){
	var orderedList = document.createElement('ol'),
			answersArray = allQuestions[questionNumber]['choices'],
			selectedAnswer = allQuestions[questionNumber]['selectedAnswer'];

	orderedList.style.display = 'none';

	theQuiz.appendChild(orderedList);

	//create the answer elements and append each one to the ordered list
	for(var i = 0; i < answersArray.length; i++){
		var answerListItem = document.createElement('li'),
				answerInput = document.createElement('input'),
				answerLabel = document.createElement('label'),
				answerText = document.createTextNode(answersArray[i]);

		orderedList.appendChild(answerListItem);
		answerListItem.appendChild(answerInput);
		answerListItem.appendChild(answerLabel);
		answerLabel.appendChild(answerText);

		answerInput.type = 'radio';
		answerInput.name = 'answer';
		answerInput.value = i;
		answerInput.id = 'answer' + i;

		if(selectedAnswer == i){
			answerInput.setAttribute('checked', 'checked');
			answerInput.checked = true;
		}

		answerLabel.setAttribute('for', 'answer' + i);
	}

	$(orderedList).fadeIn();
	createButtons();
}

function createButtons() {
	var nextButton = document.createElement('input'),
			previousButton = document.createElement('input');

	theQuiz.appendChild(nextButton);
	theQuiz.appendChild(previousButton);

	nextButton.type = 'submit';
	nextButton.value = 'Next question';
	nextButton.className = 'next-question';

	previousButton.type = 'submit';
	previousButton.value = 'Previous question';
	previousButton.className = 'previous-question';

	displayButtons(nextButton, previousButton);
}

function displayButtons(next, prev) {
	if(questionNumber === 0){
		prev.style.display = 'none';
		prev.removeEventListener('click', determineQuestion);
	} else {
		prev.style.display = '';
		prev.addEventListener('click', determineQuestion);
	}
	if(questionNumber === numberQuestions - 1){
		next.value = 'Submit quiz';
	}
	next.addEventListener('click', determineQuestion);
}

function determineQuestion(){
	if(this.className === 'previous-question'){
		questionNumber--;
		userScore.pop();
	} else {
		validateAnswer();
		questionNumber++;
	}
	removeQuestionAndAnswers();
}

function validateAnswer(){
	var answers = theQuiz.getElementsByTagName('li'),
			numberAnswers = answers.length;
	for(var i = 0; i < numberAnswers; i++){
		if(answers[i].getElementsByTagName('input')[0].checked){
			compareAnswers(answers, numberAnswers);
			return false;
		}
	}
	alert('Please choose an answer.');
}

/*function previousQuestion(){
	if(questionNumber === 0){
		document.getElementsByClassName('quiz')[0].removeChild(previousQuestionButton);
	}

	questionNumber--;
	userScore.pop();
	console.log('previous: ' + questionNumber + '/' + numberQuestions + ' ' + userScore);
	setQuestion();
}*/

function compareAnswers(answers, numberAnswers){
	console.log("compareAnswers");
	var correctAnswer = allQuestions[questionNumber]['correctAnswer'],
			selectedAnswer;
	for(var j = 0; j < numberAnswers; j++){
		if(answers[j].getElementsByTagName('input')[0].checked){
			selectedAnswer = answers[j].getElementsByTagName('input')[0];
			allQuestions[questionNumber]['selectedAnswer'] = selectedAnswer.getAttribute('value');
			console.log(allQuestions[questionNumber]['selectedAnswer']);
		}
	}

	if(correctAnswer == selectedAnswer.getAttribute('value')) {
		userScore.push(1);
	} else {
		userScore.push(0);
	}
	selectedAnswer.removeAttribute('checked');
}

function removeQuestionAndAnswers(){
		var header = theQuiz.getElementsByTagName('h2')[0],
				orderedList = theQuiz.getElementsByTagName('ol')[0],
				nextButton = theQuiz.getElementsByClassName('next-question')[0],
				previousButton = theQuiz.getElementsByClassName('previous-question')[0];

		theQuiz.removeChild(nextButton);
		theQuiz.removeChild(previousButton);

		$(header).fadeOut(function(){
			theQuiz.removeChild(header);
		});

		$(orderedList).fadeOut(function(){
			theQuiz.removeChild(orderedList);
			if(questionNumber === numberQuestions){
				completeQuiz();
			} else {
				createQuestion();
			}
		});
}

function completeQuiz(){
	displayScore();
}

function displayScore(){
	var finalUserScore = calculateScore();
	var scoreDisplayElement = document.createElement('h2'),
			scoreDisplayText = document.createTextNode('You scored ' + finalUserScore + ' out of ' + numberQuestions + '!');
	theQuiz.appendChild(scoreDisplayElement);
	scoreDisplayElement.appendChild(scoreDisplayText);
}

function calculateScore(){
	var finalScore = 0;
	for(var i = 0; i < userScore.length; i++){
		finalScore += userScore[i];
	}
	return finalScore;
}