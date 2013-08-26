var allQuestions = [
	{question: 'Who was the first president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 1},
	{question: 'Who was the sixteenth president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 0},
	{question: 'Who was the third president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 2},
	{question: 'Who was the main character of <i>The Jeffersons</i>?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 3}
],
		userScore = [],
		theQuiz = document.getElementsByClassName('quiz')[0],
		questionNumber = 0,
		numberQuestions = allQuestions.length;

setUpLoginSignup();
createQuestion();

function setUpLoginSignup(){
	var userForm = document.getElementsByClassName('user-form')[0],
			signUpLink = document.getElementsByClassName('signup-show')[0],
			loginLink = document.getElementsByClassName('login-show')[0],
			userSubmitButton = document.getElementsByClassName('submit-user')[0];

	console.log(userForm);
	userForm.style.display = 'none';

	loginLink.addEventListener('click', showForm);
	//signUpLink.addEventListener('click', showForm(event));

	function showForm(event){
		event.preventDefault();
		var loginOrSignup = this.className;
		if(loginOrSignup === 'signup-show'){
			userSubmitButton.value = 'Sign up';
		}
		userForm.style.display = '';
	}

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
			answersArray = allQuestions[questionNumber]['choices'];

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
	previousButton.value = 'Previous button';
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
		})
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