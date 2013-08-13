//var quizInfo = JSON.parse("quizInfo.json"),
var jsonObject = [
	{
		"question": "Who was the first president of the USA?", 
		"choices": ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"],
		"correctAnswer": 1
	},
	{
		"question": "Who was the sixteenth president of the USA?", 
		"choices": ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], 
		"correctAnswer": 0
	},
	{
		"question": "Who was the third president of the USA?", 
		"choices": ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], 
		"correctAnswer": 2
	},
	{
		"question": "Who was the main character of <i>The Jeffersons</i>?", 
		"choices": ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], 
		"correctAnswer": 3
	}
];
var quizInfo = JSON.parse(jsonObject);
var	userScore = 0,
		displayQuestion = document.getElementsByClassName('question')[0],
		displayAnswers = document.getElementsByTagName('li'),
		questionNumber = 0,
		numberQuestions = quizInfo.length,
		numberAnswers = 0,
		selectedAnswer,
		nextQuestionButton = document.getElementsByClassName('next-question')[0];


setQuestion();
nextQuestionButton.addEventListener('click', compareAnswers);

function setQuestion(){
	//console.log("set question: " + questionNumber);
	displayQuestion.innerHTML = quizInfo[questionNumber]['question'];
	numberAnswers = quizInfo[questionNumber]['choices'].length;
	for(var i = 0; i < numberAnswers; i++){
		displayAnswers[i].getElementsByTagName('label')[0].innerHTML = quizInfo[questionNumber]['choices'][i];
		displayAnswers[i].getElementsByTagName('input')[0].checked = false;
	}
}

function compareAnswers(){
	var correctAnswer = quizInfo[questionNumber]['correctAnswer'];
	for(var j = 0; j < numberAnswers; j++){
		if(displayAnswers[j].getElementsByTagName('input')[0].checked){
			selectedAnswer = displayAnswers[j].getElementsByTagName('input')[0];
		}
	}

	if(correctAnswer == selectedAnswer.getAttribute('value')) {
		userScore++;
	}
	selectedAnswer.removeAttribute('checked');
	setup();
}

function setup(){
	questionNumber++;
	console.log(questionNumber);
	console.log(numberQuestions);
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

	displayScore(questionParent);
}

function displayScore(questionParent){
	var scoreDisplayElement = document.createElement('h2'),
			scoreDisplayText = document.createTextNode('You scored ' + userScore + ' out of ' + numberQuestions + '!');
	questionParent.appendChild(scoreDisplayElement);
	scoreDisplayElement.appendChild(scoreDisplayText);
}