
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
                <input  name="question${questionNumber}" value="${letter} :${currentQuestion.answers[letter]}">
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<input class="question" value ="${currentQuestion.question}" >
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