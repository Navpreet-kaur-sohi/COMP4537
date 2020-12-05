/**
 * get token 
 */
function getToken() {
    return "JWT" + " " + localStorage.getItem("token");
  }
 
  /**
   * declaring variables
   */
const token = getToken()

//user id
const userId = localStorage.getItem("id");

// container for quiz
const container = $("#myQuizzes");

/**
 * populate the quizzes
 * @param {*} quizzes 
 */
let populateMyQuizzes = (quizzes)=>{
    quizzes.forEach((quiz)=>{
        let quizView = $(`<div class="col mb-4">
        <div class="card">
        <div class="card-body" id="${quiz.id}">
        <h5 class="card-title">${quiz.title}</h5>
        <h5 class="card-title">${quiz.description}</h5>
        <h5 class="card-title">Attempts: ${quiz.attempts}</h5>
        <a href="#" class="btn btn-primary check" >View this quiz</a>
        <a href="#" class="btn btn-primary check" onclick = "deleteQuiz(${quiz.id})" >delete</a>
        </div></div></div>`);
       
         container.append(quizView);
    })
}

// headers for fetch
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);


let requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};
//fetching quizzes
fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/user/${userId}/quizzes`, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    populateMyQuizzes(result);
    //Populate Quizzes
})
.catch(error => error.then(msg => alert(msg.message)));

/**
 * delete a quiz by id
 */
deleteQuiz = (id) => {
    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };
        fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${id}`, requestOptions)
        .then((response) => {
            console.log(response.status);
            if(response.status != 200) throw response.json();
            window.location.href="../views/Profile.html"
            return response.json()
        })
        .then((result) => {
            console.log(result);
        })
        .catch(error => error.then(msg => alert(msg.message)));
}