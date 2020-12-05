const host = "https://agile-tundra-39359.herokuapp.com/api/v1/"
let quiz = JSON.parse(localStorage.getItem("quiz"));
if(!quiz){
  alert("Quiz not found");
  window.location.href = "../views/QuizList.html";
}

$("#title").text(quiz.title);
$("#desc").text(quiz.description);

let myQuestions = null;

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const quizContainer = document.getElementById('quiz');


buildQuiz = ()=>{
  // variable to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // variable to store the list of possible answers
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter].text}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.text} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  quizContainer.innerHTML = output.join('');
}

showResults = ()=>{

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');
  console.log(quiz);
  let affinities = quiz.affinities;
  let scores = {};
  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    console.log("User answer", userAnswer, currentQuestion);
    scores[currentQuestion.answers[userAnswer].affinityId] = scores[currentQuestion.answers[userAnswer].affinityId] ? scores[currentQuestion.answers[userAnswer].affinityId] + 1 : 1;
  });
  console.log("scores", scores);

  let affinityIds = Object.keys(affinities);
  let top = 0;
  let topText = "";
  for(let i = 0; i < affinityIds.length; i++){
    if(scores[affinityIds[i]] > top){
      top = scores[affinityIds[i]];
      topText = affinities[affinityIds[i]];
    }
  }
  alert(`You are: ${topText}`)
}

populate = ()=>{
  const submitButton = $('#submit');
  submitButton.click(showResults);

  fetch(host + "/quiz/" + quiz.id + "/questions", requestOptions)
  .then((response) => {
    if (response.status == 409) throw response.json()
    return response.json()

  })
  .then((result) => {
    console.log(result)
    myQuestions = result;
    buildQuiz();
  })
  .catch(error => console.log(error));
}

populate();


// const myQuestions = [
//   {
//     question: "Who invented JavaScript?",
//     answers: {
//       a: "Hello",
//       b: "Sheryl Sandberg",
//       c: "Brendan Eich",
//       d: "Hello"
//     }
//   },
//   {
//     question: "Which one of these is a JavaScript package manager?",
//     answers: {
//       a: "Node.js",
//       b: "TypeScript",
//       c: "npm",
//       d: "hello"
//     }
//   },
//   {
//     question: "Which tool can you use to ensure code quality?",
//     answers: {
//       a: "Angular",
//       b: "jQuery",
//       c: "RequireJS",
//       d: "ESLint"
//     }
//   }
// ];



// Kick things off




  // var ct = 1;
  // function new_link(length)
  // {
  //     for(var i = 1;i<length;i++){
  //     ct++;
  //     var div1 = document.createElement('div');
  //     div1.id = ct;
  //    // <div class="col mb-4"><div class="card"><div class="card-body"><h5 class="card-title">Card title</h5><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>

  //     // link to delete extended form elements
  //     //div1.innerHTML = document.getElementById('1').innerHTML ;
  //     div1.innerHTML = ('<div class="col mb-4"><div class="card"><div class="card-body"><h5 class="card-title">Card title</h5><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>');
  //     document.getElementById('1').appendChild(div1);
  //     }
  // }
  // new_link(5);

// let myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", token);

// let requestOptions = {
// method: 'GET',
// headers: myHeaders,
// redirect: 'follow'
// };
// fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quizzes`, requestOptions)
// .then((response) => {
//     console.log(response.status);
//     if(response.status != 200) throw response.json();
//     return response.json()
// })
// .then((result) => {
//     console.log(result);
//     populateMyQuizzes(result);
// })
// .catch(error => error.then(msg => alert(msg.message)));