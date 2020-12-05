/**
 * getting token
 */
function getToken() {
    return "JWT" + " " + localStorage.getItem("token");
  }

// storing token
const token = getToken()

// user id
const userId = localStorage.getItem("id");

// my quiz element
const container = $("#myQuizzes");

/**
 * {Description : populating the container with respective quizzes}
 * @param {*} quizzes 
 */
let populateMyQuizzes = (quizzes)=>{

    //iterating through quizzes
    quizzes.forEach((quiz)=>{

        // creating the quiz
        let quizView = $(`<div class="col mb-4">
        <div class="card">
        <div class="card-body" id="${quiz.id}">
        <h5 class="card-title">${quiz.title}</h5>
        <h5 class="card-title">${quiz.description}</h5>
        <h5 class="card-title">Attempts: ${quiz.attempts}</h5>
        <a href="#" class="btn btn-primary check" onclick="viewdetail()" >View this quiz</a>
        </div></div></div>`);
        
        //appending to container
         container.append(quizView);
    })
}

//headers for fetch 
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);

//request options
let requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

//fetching the quizzes usings endpoint
fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quizzes`, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    //populating the quiz
    populateMyQuizzes(result);
})
.catch(error => error.then(msg => alert(msg.message)));

/**
 * {Description : redirecting to single Quiz page}
 */
viewdetail = () => {
    window.location.href = "../views/singleQuiz.html"
}