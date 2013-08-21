var allQuestions = [
	{question: "Who was the first president of the USA?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 1},
	{question: "Who was the sixteenth president of the USA?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 0},
	{question: "Who was the third president of the USA?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 2},
	{question: "Who was the main character of <i>The Jeffersons</i>?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 3}
],
		userScore = [],
		displayQuestion = document.getElementsByClassName('question')[0],
		displayAnswers = document.getElementsByTagName('li'),
		questionNumber = 0,
		numberQuestions = allQuestions.length,
		numberAnswers = 0,
		selectedAnswer,
		nextQuestionButton = document.getElementsByClassName('next-question')[0],
		previousQuestionButton = document.getElementsByClassName('previous-question')[0];

document.getElementsByClassName("content")[0].removeChild(previousQuestionButton);
setQuestion();
nextQuestionButton.addEventListener('click', validateAnswer);
previousQuestionButton.addEventListener('click', previousQuestion);

function setQuestion(){
	//console.log("set question: " + questionNumber);
	displayQuestion.innerHTML = allQuestions[questionNumber]['question'];
	numberAnswers = allQuestions[questionNumber]['choices'].length;
	for(var i = 0; i < numberAnswers; i++){
		displayAnswers[i].getElementsByTagName('label')[0].innerHTML = allQuestions[questionNumber]['choices'][i];
		displayAnswers[i].getElementsByTagName('input')[0].checked = false;
	}
}

function validateAnswer(){
	for(var i = 0; i < numberAnswers; i++){
		if(displayAnswers[i].getElementsByTagName('input')[0].checked){
			compareAnswers();
			return true;
		}
	}
	alert("Please choose an answer.");
}

function previousQuestion(){
	if(questionNumber === 0){
		document.getElementsByClassName("content")[0].removeChild(previousQuestionButton);
	} 
		
	questionNumber--;
	userScore.pop();
	console.log("previous: " + questionNumber + "/" + numberQuestions + " " + userScore);
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
		document.getElementsByClassName("content")[0].appendChild(previousQuestionButton);
	}
	console.log("next: " + questionNumber + "/" + numberQuestions + " " + userScore);
	if(questionNumber < numberQuestions){
		setQuestion();
	} else {
		removeQuestion();
	}
}

function removeQuestion(){
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