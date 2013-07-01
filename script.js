var allQuestions = [
	{question: "Who was the first president of the USA?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 1},
	{question: "Who was the sixteenth president of the USA?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 0},
	{question: "Who was the third president of the USA?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 2},
	{question: "Who was the main character of <i>The Jeffersons</i>?", choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "George Jefferson"], correctAnswer: 3}
],
		userScore = 0,
		displayQuestion = document.getElementsByClassName('question')[0],
		displayAnswers = document.getElementsByTagName('li'),
		questionNumber = 0,
		numberQuestions = allQuestions.length,
		numberAnswers = 0,
		selectedAnswer,
		nextQuestionButton = document.getElementsByClassName('next-question')[0];

setQuestion(allQuestions, questionNumber);
setAnswers();

/*if(questionNumber < numberQuestions - 1){*/
	nextQuestionButton.addEventListener('click', function(){
		compareAnswers(selectedAnswer);
		questionNumber++;
		setQuestion();
		setAnswers();
		selectedAnswer.removeAttribute('checked');
	});
/*} else {
	nextQuestionButton.removeEventListener('click', a);
}*/

function setQuestion(){
	displayQuestion.innerHTML = allQuestions[questionNumber]['question'];
}

function setAnswers(){
	numberAnswers = allQuestions[questionNumber]['choices'].length;
	for(var i = 0; i < numberAnswers; i++){
		displayAnswers[i].getElementsByTagName('label')[0].innerHTML = allQuestions[questionNumber]['choices'][i];
		displayAnswers[i].getElementsByTagName('input')[0].removeAttribute('disabled');
		displayAnswers[i].getElementsByTagName('input')[0].checked = false;
	}
}

function compareAnswers(){
	var correctAnswer = allQuestions[questionNumber]['correctAnswer'];
	for(var j = 0; j < numberAnswers; j++){
		if(displayAnswers[j].getElementsByTagName('input')[0].checked){
			selectedAnswer = displayAnswers[j].getElementsByTagName('input')[0];
		}
	}

	if(correctAnswer == selectedAnswer.getAttribute('value')) {
		userScore++;
		console.log('user score: ' + userScore);
	}
}

function displayScore(){

}