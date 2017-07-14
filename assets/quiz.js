'use strict';

window.calculatePoints = function (an) {
  var points = 0;
  for (var i = 0; i < quiz.questions.length; i++) {
    var question = quiz.questions[i];
    if (question.answer - 1 === an[i]) {
      points++;
    }
  }

  return points;
};

window.qq = function (p) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  var arr = [];
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] == p) {
      arr.push(parseInt(sParameterName[1]));
    }
  }

  return arr;
};

window.drawAnswers = function () {
  var answerHtml = '';
  var answers = qq('answers[]');
  for (var i = 0; i < quiz.questions.length; i++) {
    var question = quiz.questions[i];
    var questionImg = '';
    var answerImg = '';
    var htmlClass = '';
    if (question.image) {
      questionImg = '\n        <div style="height:90px;width:90px;background-image:url(' + question.image + ');background-repeat:no-repeat; background-position: center; background-size:cover;">\n        </div>\n      ';
    }
    if (question.answers[question.answer - 1].image) {
      questionImg = '\n        <div style="height:90px;width:90px;background-image:url(' + question.answers[question.answer - 1].image + ');background-repeat:no-repeat; background-position: center; background-size:cover;">\n        </div>\n      ';
    }
    if (answers && question.answer - 1 == answers[i]) {
      htmlClass = 'list-group-item-success';
    } else if (answers && answers.length > 0) {
      htmlClass = 'list-group-item-danger';
    }
    answerHtml = answerHtml + ('\n      <li class="list-group-item ' + htmlClass + '">\n        <div class="row">\n          <div class="col-sm-6">\n            <strong>' + question.question + '</strong>\n            ' + questionImg + '\n          </div>\n          <div class="col-sm-6 text-right">\n            ' + question.answers[question.answer - 1].text + '\n            ' + (question.answerText ? '<div class="small">' + question.answerText + '</div>' : '') + '\n            ' + answerImg + '\n          </div>\n        </div>\n        <div class="clearfix"></div>\n      </li>\n    ');
  }

  var html = '\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          Aufl\xF6sung\n        </h3>\n      </div>\n      <ul class="list-group">\n        ' + answerHtml + '\n      </ul>\n    </div>\n  ';
  $('#answers').html(html);

  if (answers) {
    $('#points').html('<br />' + calculatePoints(answers) + ' / ' + quiz.questions.length + ' Punkten');
  }
};

window.drawQuestion = function () {
  if (answers.length >= quiz.questions.length) {
    redirectToResult();
    return;
  }
  var question = quiz.questions[answers.length];
  var answerHtml = '';
  for (var i = 0; i < question.answers.length; i++) {
    answer = question.answers[i];
    var answerImage = '';
    if (answer.image) {
      answerImage = '\n        <div style="height:180px;background-image:url(' + answer.image + ');background-repeat:no-repeat; background-position: center; background-size:cover;">\n        </div>\n      ';
    }
    answerHtml = answerHtml + ('\n      <div class="col-sm-6" style="margin-bottom:5px;">\n        <a href="#" class="btn btn-block btn-default btn-lg js-answer"\n        data-answer="' + i + '">\n          ' + answerImage + '\n          ' + answer.text + '\n        </a>\n      </div>\n    ');
  }
  var questionImage = '';
  if (question.image) {
    questionImage = '\n      <div class="text-center">\n        <img src="' + question.image + '" class="img-responsive" style="max-height:230px;margin:0px auto;" />\n      </div>\n      <hr />\n    ';
  }

  var html = '\n    <div class="panel panel-default">\n      <div class="panel-heading">\n        <h3 class="panel-title">\n          ' + question.question + '\n          <div class="badge pull-left">\n            ' + (answers.length + 1) + '/' + quiz.questions.length + '\n          </div>\n        </h3>\n      </div>\n      <div class="panel-body">\n        ' + questionImage + '\n        <div class="row">\n          ' + answerHtml + '\n        </div>\n      </div>\n    </div>\n  ';
  $('#quiz').html(html);
};

window.redirectToResult = function () {
  var points = calculatePoints(answers);
  var url = afterQuiz[0];
  for (var i in afterQuiz) {
    if (points >= i) {
      url = afterQuiz[i];
    }
  }

  window.location.href = url + '?' + decodeURIComponent($.param({ answers: answers }));
};

var answers = [];

$(document).ready(function () {
  if (!$('#quiz').length) {
    return;
  }

  $('body').on('click', '.js-answer', function (e) {
    e.preventDefault();
    var answer = parseInt($(this).data('answer'));
    answers.push(answer);
    drawQuestion();
  });

  drawQuestion();
});

$(document).ready(function () {
  if (!$('#answers').length) {
    return;
  }

  drawAnswers();
});
