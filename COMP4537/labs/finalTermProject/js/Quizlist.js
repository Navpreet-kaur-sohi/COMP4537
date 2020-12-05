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

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);

let requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

// my quiz element
const container = $("#myQuizzes");

/**
 * {Description : populating the container with respective quizzes}
 * @param {*} quizzes 
 */
let populateMyQuizzes = (quizzes)=>{
    container.empty()

    //iterating through quizzes
    quizzes.forEach((quiz)=>{

        // creating the quiz
        let quizView = $(`<div class="col mb-4">
        <div class="card">
        <div class="card-body" id="${quiz.id}">
        <h5 class="card-title">${quiz.title}</h5>
        <h5 class="card-title">${quiz.description}</h5>
        <h5 class="card-title">Attempts: ${quiz.attempts}</h5>
        </div></div></div>`);
        quizView.click(()=>{
            console.log("Quiz", quiz.id, "clicked!");
            localStorage.setItem("quiz", JSON.stringify(quiz));
            window.location.href = `../views/SingleQuiz.html`
        })
        
        //appending to container
         container.append(quizView);
    })
}

let searchQuiz = () => {
    let query = $("#searchField").val();
    fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/search?search=${query}`, requestOptions)
    .then((response) => {
        if(response.status != 200) throw response.json();
        return response.json()
    })
    .then((result) => {
        populateMyQuizzes(result);
    })
    .catch(error => error.then(msg => alert(msg.message)));
}

$("#searchButton").click(searchQuiz);

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

