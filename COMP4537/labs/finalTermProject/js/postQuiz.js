let submitBtn = $("#formSubmit");

submitBtn.click((e)=>{
    e.preventDefault();
    let quiz = {};
    quiz.title = $("#quizName").val();
    quiz.description = $("#quizDesc").val();
    quiz.questions = $(".Question").children();
    quiz.questions.each(function( index ) {
        console.log(  $( this ).text() + ": " + $( this ).children().first().html() );
      })
});