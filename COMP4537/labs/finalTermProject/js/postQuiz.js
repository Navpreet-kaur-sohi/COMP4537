

var ct = 1;

function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}

postQuiz = () => {
  var qname = $("#name").val();
  var qdesc =$("#desc").val();
  var a1 = $("#a1").val();
  var a2 = $("#a2").val();
  var a3 = $("#a3").val();
  var a4 = $("#a4").val();

  var affinity = {a1,a2,a3,a4};
  var answers = {};
  var question = []
  $('.question').each(function() {
  
    question.push($(this).val());
});
var option1 = []
$('.option1').each(function() {
  
  option1.push($(this).val());
});
console.log("sdfs",option1)

var option2 = []
$('.option2').each(function() {
  
  option2.push($(this).val());
});
console.log("sdfs",option2)
var option3 = []
$('.option3').each(function() {

  option3.push($(this).val());
});
console.log("sdfs",option3)

var option4 = []
$('.option4').each(function() {
 
  option4.push($(this).val());
});
console.log("sdfs",option4)
var questions = {}
for(var i = 0;i<ct;i++){
  answers = [option1[i],option2[i],option3[i],option4[i]]
  text = question[i]
  questions[i ] = {"answers":answers,"text":text}
}


  
  const data = {
    title:qname,
    description:qdesc,
    affinities:affinity,
    answers:answers,
    questions:questions,
}
console.log(data)

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",getToken())

let requestOptions = {
method: 'POST',
body:JSON.stringify(data),
headers: myHeaders,
redirect: 'follow'
};
fetch("https://agile-tundra-39359.herokuapp.com/api/v1/quiz/create", requestOptions)
    .then(response => response.json())
    .then(data=>{console.log(data)
    window.location.href = "../views/Profile.html"
      })
    .catch(error => console.log('error', error));

}

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