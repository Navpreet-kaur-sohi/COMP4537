let submitBtn = $("#submit");

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
                <input type="radio" id = "${letter}" name="question${questionNumber}" value="${letter}">
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
  
    function showResults(){
      console.log("inside")
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let affinityA = 0;
      let affinityB = 0;
      let affinityC = 0;
      let affinityD = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).id;
  
        // if answer is correct
        if(userAnswer === 'a'){
          // add to the number of correct answers
          affinityA++;
  
         console.log(affinityA);
         
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          console.log(affinityA);
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
     
      
    }
  
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', () => {
      showResults();
    });
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