
  (function(){
    function buildQuiz(){
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
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
  
      quizContainer.innerHTML = output.join('');
    }
  
    // function showResults(){
  
    //   // gather answer containers from our quiz
    //   const answerContainers = quizContainer.querySelectorAll('.answers');
  
    //   // keep track of user's answers
    //   let numCorrect = 0;
  
    //   // for each question...
    //   myQuestions.forEach( (currentQuestion, questionNumber) => {
  
    //     // find selected answer
    //     const answerContainer = answerContainers[questionNumber];
    //     const selector = `input[name=question${questionNumber}]:checked`;
    //     const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
    //     // if answer is correct
    //     if(userAnswer === currentQuestion.correctAnswer){
    //       // add to the number of correct answers
    //       numCorrect++;
  
    //       // color the answers green
    //       answerContainers[questionNumber].style.color = 'lightgreen';
    //     }
    //     // if answer is wrong or blank
    //     else{
    //       // color the answers red
    //       answerContainers[questionNumber].style.color = 'red';
    //     }
    //   });
  
    //   // show number of correct answers out of total
    //   resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    // }
  
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Who invented JavaScript?",
        answers: {
          a: "Hello",
          b: "Sheryl Sandberg",
          c: "Brendan Eich",
          d: "Hello"
        }
      },
      {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
          a: "Node.js",
          b: "TypeScript",
          c: "npm",
          d: "hello"
        }
      },
      {
        question: "Which tool can you use to ensure code quality?",
        answers: {
          a: "Angular",
          b: "jQuery",
          c: "RequireJS",
          d: "ESLint"
        }
      }
    ];


  
    // Kick things off
    buildQuiz();
  
  })();

  var ct = 1;
  function new_link(length)
  {
      for(var i = 1;i<length;i++){
      ct++;
      var div1 = document.createElement('div');
      div1.id = ct;
     // <div class="col mb-4"><div class="card"><div class="card-body"><h5 class="card-title">Card title</h5><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>

      // link to delete extended form elements
      //div1.innerHTML = document.getElementById('1').innerHTML ;
      div1.innerHTML = ('<div class="col mb-4"><div class="card"><div class="card-body"><h5 class="card-title">Card title</h5><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div>');
      document.getElementById('1').appendChild(div1);
      }
  }
  new_link(5);

  