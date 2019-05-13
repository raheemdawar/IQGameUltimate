
let questionNumber = 0;
let score = 0;
let totalRight = 0;
let totalWrong = 0;
function submitresult() {

    var request = $.ajax({
        url: "/quiz/saveresult",
        type: "GET",
        data: { 'name': quizName, 'correct': score }

    });

    request.done(function (msg) {

    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}
//generate question html
function generateQuestion() {
	if (questionNumber < STORE.length) {
		return `<div class="card mb-4 box-shadow question-${questionNumber}">
<div class="card-header">
<h4 class="my-0 font-weight-normal">
${STORE[questionNumber].question}
</h4>
</div>
<div class="card-body">
<form class="mb-3">
<div class="form-check">
<input class="form-check-input" type="radio" name="answer" id="answer1" value="${STORE[questionNumber].answers[0]}" required>
<label class="form-check-label" for="answer1">
${STORE[questionNumber].answers[0]}
</label>
</div>
<div class="form-check">
<input class="form-check-input" type="radio" name="answer" id="answer2" value="${STORE[questionNumber].answers[1]}" required>
<label class="form-check-label" for="answer2">
${STORE[questionNumber].answers[1]}
</label>
</div>
<div class="form-check disabled">
<input class="form-check-input" type="radio" name="answer" id="answer3" value="${STORE[questionNumber].answers[2]}" required>
<label class="form-check-label" for="answer3">
${STORE[questionNumber].answers[2]}
</label>
</div>
<div class="form-check disabled">
<input class="form-check-input" type="radio" name="answer" id="answer4" value="${STORE[questionNumber].answers[3]}" required>
<label class="form-check-label" for="answer4">
${STORE[questionNumber].answers[3]}
</label>
</div>
</form>
<button type="button" type="submit" class="btn btn-lg btn-outline-primary submit-answer submitButton">Submit Answer</button>
</div>
</div>`
	} else {
		renderResults();
		restartQuiz();
		$('.question-number').text(10)
	}
}
//increment question number
function changeQuestionNumber() {
	//if (questionNumber < STORE.length) {
	questionNumber++;
	//}
	$('.question-number').text(questionNumber + 1);
}

//increment score
function changeScore() {
	score++;
}
//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz() {
	$('.question-body').hide();
	$('.quizStart').on('click', '.startButton', function (event) {
		$('.quizStart').remove();
		$('.question-body').show();
		$('.question-number').text(1);
	});
}
// render question in DOM
function renderQuestion() {
	$('.question-body').html(generateQuestion());
}
//user selects answer on submit run user feedback
function userSelectAnswer() {
	$('.submitButton').on('click', function (event) {
		event.preventDefault();
		let selected = $('input:checked');
		let answer = selected.val();
		let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
		if (answer === correctAnswer) {
			selected.parent().addClass('correct');
			ifAnswerIsCorrect();
		} else {
			selected.parent().addClass('wrong');
			ifAnswerIsWrong();
		}
	});
}
function ifAnswerIsCorrect() {
	userAnswerFeedbackCorrect();
	totalRight++;
	$('.total-right').text(totalRight);
}
function ifAnswerIsWrong() {
	userAnswerFeedbackWrong();
	totalWrong++;
	$('.total-wrong').text(totalWrong);
}
//user feedback for correct answer
function userAnswerFeedbackCorrect() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	$('.question-body').html(`<div class="card mb-4 box-shadow">
<div class="card-header">
<h4 class="my-0 font-weight-normal">
You got it right!
</h4>
</div>
<div class="card-body">
<p>The correct answer is <span>"${correctAnswer}"</span></p>
<button type="button" class="btn btn-lg btn-outline-primary next-button">Next Question</button></div>
</div>
</div>`);
}
//user feedback for wrong answer
function userAnswerFeedbackWrong() {
	let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
	// let iconImage = `${STORE[questionNumber].icon}`;
	$('.question-body').html(`<div class="card mb-4 box-shadow">
<div class="card-header">
<h4 class="my-0 font-weight-normal">
You got it wrong!
</h4>
</div>
<div class="card-body">
<p>The correct answer is <span>"${correctAnswer}"</span></p>
<button type="button" class="btn btn-lg btn-outline-primary next-button">Next Question</button></div>
</div>
</div>`);
}
//when quiz is over this is the html for the page
function renderResults() {
	if (score >= 8) {
		$('.question-body').html(`<div class="results correctFeedback"><h3>You're on fire!</h3><p>You got ${score} / 10</p><p>You're ready to plan your backpacking trip!</p><button type="button" class="btn btn-lg btn-outline-primary restart-quiz">Restart Quiz</button></div>`);
	} else if (score < 8 && score >= 5) {
		$('.question-body').html(`<div class="results correctFeedback"><h3>Almost there!</h3><p>You got ${score} / 10</p><p>Bone up on your backpacking knowledge a little more and you'll be ready to go!</p><button type="button" class="btn btn-lg btn-outline-primary restart-quiz">Restart Quiz</button></div>`);
    } else {
        
        $('.question-body').html(`<div class="results correctFeedback"><h3>You might want to stick with car camping</h3><p>You got ${score} / 10</p><p>With more camping and outdoor experience you'll be able to pass this quiz in no time</p><button  type="button" class="btn btn-lg btn-outline-primary restart-quiz">Restart Quiz</button></div>`);
        submitresult();
    }
}
//what happens when the user clicks next
function renderNextQuestion() {
	$('.container').on('click', '.next-button', function (event) {
		changeQuestionNumber();
		renderQuestion();
		userSelectAnswer();
	});
}
//restart quiz function - reloads page to start quiz over
function restartQuiz() {
	$('.container').on('click', '.restart-quiz', function (event) {
		location.reload();
	});
}
//run quiz functions
function createQuiz() {
	startQuiz();
	renderQuestion();
	userSelectAnswer();
	renderNextQuestion();
}
$(createQuiz);

