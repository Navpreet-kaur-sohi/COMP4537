let submitBtn = $("#formSubmit");
var ct = 1;
        var height = 1150;
        function new_link()
        {
            ct++;
            height = height+500;
            console.log(ct)
            var div1 = document.createElement('div');
            div1.id = ct;
            // link to delete extended form elements
            var delLink = '<div style="text-align:right;margin-right:65px"><a href="javascript:delIt('+ ct +')">Del</a></div>';
            div1.innerHTML = document.getElementById('1').innerHTML + delLink;
            document.getElementById('qus_holder').appendChild(div1);
            console.log(height +"px");
            document.getElementById('c').style.height = height +"px";
        }
        // function to delete the newly added set of elements
        function delIt(eleId)
        {
            d = document;
            var ele = d.getElementById(eleId);
            var parentEle = d.getElementById('qus_holder');
            parentEle.removeChild(ele);
        }
submitBtn.click((e)=>{
    e.preventDefault();
    let quiz = {};
    quiz.title = $("#quizName").val();
    quiz.description = $("#quizDesc").val();
    //affinities
    quiz.affinity = [$("#affinityA").val(),$("#affinityB").val(),$("#affinityC").val(),$("#affinityD").val()];
    console.log("Affinity",quiz.affinity);

    //questions
    for(int i = 1; )
    
    quiz.questions = $(".Question").children();
    quiz.questions.each(function( index ) {
    console.log(  $( this ).text() + ": " + $( this ).children().first().html() );
      })
});