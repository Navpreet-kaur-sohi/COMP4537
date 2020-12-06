let ct = 1;

//getting token
function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}

/**
 * posting a quiz
 * {Description : getting required fields from fe and then posting the quiz}
 */
postQuiz = () => {
  let qname = $("#name").val();
  let qdesc =$("#desc").val();
  let a1 = $("#a1").val();
  let a2 = $("#a2").val();
  let a3 = $("#a3").val();
  let a4 = $("#a4").val();

  let affinity = {a: a1, b: a2, c: a3, d: a4};
  let answers = {};
  let question = []

  //qsn
  $('.question').each(function() {
  
    question.push($(this).val());
  });

  //options
  let option1 = []
  $('.option1').each(function() {
    
    option1.push($(this).val());
  });

  let option2 = []
  $('.option2').each(function() {
    
    option2.push($(this).val());
  });

  let option3 = []
  $('.option3').each(function() {

    option3.push($(this).val());
  });

  let option4 = []
  $('.option4').each(function() {
  
    option4.push($(this).val());
  });

  // crearing dic containing questions
  let questions = {}
  for(let i = 0;i<ct;i++){
    answers = [
      {text: option1[i], affinityId: "a"},
      {text: option2[i], affinityId: "b"},
      {text: option3[i], affinityId: "c"},
      {text: option4[i], affinityId: "d"}
    ];
    text = question[i]
    questions[i ] = {"answers":answers,"text":text}
  }

  // data fro fetch request
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

 let height = 1150;
 /**
  * adding new link
  * {description : this method is for adding a new question }
  */
new_link = () =>
        {
            ct++;
            height = height+500;
            console.log(ct)
            let div1 = document.createElement('div');
            div1.id = ct;
            // link to delete extended form elements
            let delLink = '<div style="text-align:right;margin-right:65px"><a href="javascript:delIt('+ ct +')">Del</a></div>';
            div1.innerHTML = document.getElementById('1').innerHTML + delLink;
            document.getElementById('qus_holder').appendChild(div1);
            console.log(height +"px");
            document.getElementById('c').style.height = height +"px";
        }

 /**
  * adding new link
  * {description :  deleting the columns if accidentally entered}
  */        
delIt = (eleId)=>
        {
            d = document;
            let ele = d.getElementById(eleId);
            let parentEle = d.getElementById('qus_holder');
            parentEle.removeChild(ele);
        }