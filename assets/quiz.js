$(document).ready(function() {
  if(!$('#quiz').length) {
    return;
  }

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
      var answerImage = '';
      if(answer.image) {
        answerImage = `
          <div style="height:180px;background-image:url(${answer.image});background-repeat:no-repeat; background-position: center; background-size:cover;">
          </div>
        `;
      }
      answerHtml = answerHtml + `
        <div class="col-sm-6" style="margin-bottom:5px;">
          <a href="#" class="btn btn-block btn-default btn-lg js-answer"
          data-answer="${i}">
            ${answerImage}
            ${answer.text}
          </a>
        </div>
      `;
    }
    var questionImage = '';
    if(question.image) {
      questionImage = `
        <div class="text-center">
          <img src="${question.image}" class="img-responsive" style="max-height:230px;margin:0px auto;" />
        </div>
        <hr />
      `;
    }

    var html = `
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">
            ${question.question}
            <div class="badge pull-left">
              ${answers.length+1}/${quiz.questions.length}
            </div>
          </h3>
        </div>
        <div class="panel-body">
          ${questionImage}
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

$(document).ready(function() {
  if(!$('#answers').length) {
    return;
  }

  var drawAnswers = function() {
    var answerHtml = '';
    for(var i = 0; i < quiz.questions.length; i++) {
      var question = quiz.questions[i];
      var questionImg = '';
      var answerImg = '';
      if(question.image) {
        questionImg = `
          <div style="height:90px;width:90px;background-image:url(${question.image});background-repeat:no-repeat; background-position: center; background-size:cover;">
          </div>
        `;
      }
      if(question.answers[question.answer-1].image) {
        questionImg = `
          <div style="height:90px;width:90px;background-image:url(${question.answers[question.answer-1].image});background-repeat:no-repeat; background-position: center; background-size:cover;">
          </div>
        `;
      }
      answerHtml = answerHtml + `
        <li class="list-group-item">
          <div class="row">
            <div class="col-sm-8">
              <strong>${question.question}</strong>
              ${questionImg}
            </div>
            <div class="col-sm-4 text-right">
              ${question.answers[question.answer-1].text}
              ${question.answerText}
              ${answerImg}
            </div>
          </div>
          <div class="clearfix"></div>
        </li>
      `;

      var html = `
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Auflösung
            </h3>
          </div>
          <ul class="list-group">
            ${answerHtml}
          </ul>
        </div>
      `;

      $('#answers').html(html);
    }
  };

  drawAnswers();
});
