$(document).ready(function() {
  var answers = [];

  var redirectToResult = function() {
    var points = 0;
    for(var i = 0; i < quiz.questions.length; i++) {
      var question = quiz.questions[i];
      if((question.answer - 1) === answers[i]) {
        points++;
      }
    }
    var url = afterQuiz[0];
    for(var i in afterQuiz) {
      if(points >= i) {
        url = afterQuiz[i];
      }
    }

    window.location.href = url;
  }

  var drawQuestion = function() {
    if(answers.length >= quiz.questions.length) {
      redirectToResult();
      return;
    }
    var question = quiz.questions[answers.length];
    var answerHtml = '';
    for(var i = 0; i < question.answers.length; i++) {
      answer = question.answers[i];
      answerHtml = answerHtml + `
        <div class="col-sm-3">
          <a href="#" class="btn btn-block btn-default btn-lg js-answer"
          data-answer="${i}">
            ${answer.text}
          </a>
        </div>
      `;
    }
    var html = `
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${question.question}</h3>
        </div>
        <div class="panel-body">
          <div class="row">
            ${answerHtml}
          </div>
        </div>
      </div>
    `;
    $('#quiz').html(html);
  };

  $('body').on('click', '.js-answer', function(e) {
    e.preventDefault();
    var answer = parseInt($(this).data('answer'));
    answers.push(answer);
    drawQuestion();
  });

  drawQuestion();
});
