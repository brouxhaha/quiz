var allQuestions = [
	{question: 'Who was the first president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 1},
	{question: 'Who was the sixteenth president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 0},
	{question: 'Who was the third president of the USA?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 2},
	{question: 'Who was the main character of <i>The Jeffersons</i>?', choices: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'George Jefferson'], correctAnswer: 3}
],
		userScore = [],
		theQuiz = document.getElementsByClassName('quiz')[0],
		//displayQuestion = document.getElementsByClassName('question')[0],
		displayAnswers = document.getElementsByTagName('li'),
		questionNumber = 1,
		numberQuestions = allQuestions.length,
		numberAnswers = 0,
		selectedAnswer,
		nextQuestionButton = document.getElementsByClassName('next-question')[0],
		previousQuestionButton = document.getElementsByClassName('previous-question')[0];

createQuestion();
console.log(theQuiz);

function setQuestion(){
	/*displayQuestion.innerHTML = allQuestions[questionNumber]['question'];
	numberAnswers = allQuestions[questionNumber]['choices'].length;
	for(var i = 0; i < numberAnswers; i++){
		displayAnswers[i].getElementsByTagName('label')[0].innerHTML = allQuestions[questionNumber]['choices'][i];
		displayAnswers[i].getElementsByTagName('input')[0].checked = false;
	}*/
	createQuestion();
}

function createQuestion(){
	var theQuestionElement = document.createElement('h2'),
			theQuestionText = document.createTextNode(allQuestions[questionNumber]['question']);
	theQuestionElement.className = 'question';
	theQuiz.appendChild(theQuestionElement);
	theQuestionElement.appendChild(theQuestionText);

	createAnswers();
}

function createAnswers(){
	var orderedList = document.createElement('ol'),
			answersArray = allQuestions[questionNumber]['choices'];

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

	createButtons();
}

function createButtons() {
	var nextButton = document.createElement('input'),
			previousButton = document.createElement('input');

	nextButton.type = 'submit';
	nextButton.value = 'Next question';
	nextButton.className = 'next-question';

	previousButton.type = 'submit';
	previousButton.value = 'Previous button';
	previousButton.className = 'previous-button';

	displayButtons(nextButton, previousButton);
}

function displayButtons(next, prev) {
	console.log(questionNumber);
	theQuiz.appendChild(next);
	theQuiz.appendChild(prev);
	if(questionNumber === 1 || questionNumber === 4){
		theQuiz.removeChild(prev);
		prev.removeEventListener('click', determineQuestion);
	} else {
		theQuiz.appendChild(prev);
		prev.addEventListener('click', determineQuestion);
	}

	if(questionNumber === 4){
		theQuiz.removeChild(next);
		next.removeEventListener('click', determineQuestion);
	} else {
		theQuiz.appendChild(next);
		next.addEventListener('click', determineQuestion);
	}
}

function removeQuestionAndAnswers(){

}

function validateAnswer(){
	for(var i = 0; i < numberAnswers; i++){
		if(displayAnswers[i].getElementsByTagName('input')[0].checked){
			compareAnswers();
			return true;
		}
	}
	alert('Please choose an answer.');
}

function previousQuestion(){
	if(questionNumber === 0){
		document.getElementsByClassName('quiz')[0].removeChild(previousQuestionButton);
	} 
		
	questionNumber--;
	userScore.pop();
	console.log('previous: ' + questionNumber + '/' + numberQuestions + ' ' + userScore);
	setQuestion();
}

function compareAnswers(){
	var correctAnswer = allQuestions[questionNumber]['correctAnswer'];
	for(var j = 0; j < numberAnswers; j++){
		if(displayAnswers[j].getElementsByTagName('input')[0].checked){
			selectedAnswer = displayAnswers[j].getElementsByTagName('input')[0];
		}
	}

	if(correctAnswer == selectedAnswer.getAttribute('value')) {
		userScore.push(1);
	} else {
		userScore.push(0);
	}
	selectedAnswer.removeAttribute('checked');
	setup();
}

function setup(){
	questionNumber++;
	if(questionNumber === 1){
		document.getElementsByClassName('quiz')[0].appendChild(previousQuestionButton);
	}
	console.log('next: ' + questionNumber + '/' + numberQuestions + ' ' + userScore);
	if(questionNumber < numberQuestions){
		setQuestion();
	} else {
		completeQuiz();
	}
}

function completeQuiz(){
	var questionParent = displayQuestion.parentNode;
	var answersList = questionParent.getElementsByTagName('ol')[0];
	questionParent.removeChild(displayQuestion);
	questionParent.removeChild(answersList);
	questionParent.removeChild(nextQuestionButton);
	questionParent.removeChild(previousQuestionButton);

	displayScore(questionParent);
}

function displayScore(questionParent){
	var finalUserScore = calculateScore();
	var scoreDisplayElement = document.createElement('h2'),
			scoreDisplayText = document.createTextNode('You scored ' + finalUserScore + ' out of ' + numberQuestions + '!');
	questionParent.appendChild(scoreDisplayElement);
	scoreDisplayElement.appendChild(scoreDisplayText);
}

function calculateScore(){
	var finalScore = 0;
	for(var i = 0; i < userScore.length; i++){
		finalScore += userScore[i];
	}
	return finalScore;
}