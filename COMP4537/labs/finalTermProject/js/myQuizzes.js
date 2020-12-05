function getToken() {
    return "JWT" + " " + localStorage.getItem("token");
  }
const token = getToken()
const userId = localStorage.getItem("id");

const container = $("#myQuizzes");
{/* <div class="col mb-4"><div class="card"><div class="card-body"><h5 class="card-title">Card title</h5><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div> */}

let populateMyQuizzes = (quizzes)=>{
    quizzes.forEach((quiz)=>{
        let quizView = $(`<div class="col mb-4">
        <div class="card">
        <div class="card-body" id="quiz${quiz.id}">
        <h5 class="card-title">${quiz.title}</h5>
        <h5 class="card-title">${quiz.description}</h5>
        <h5 class="card-title">Attempts: ${quiz.attempts}</h5>
        <a href="#" class="btn btn-primary check" >View this quiz</a>
        </div></div></div>`);
        quizView.click(()=>{
            console.log("Quiz", quiz.id, "clicked!");
            window.location.href = `../views/editQuiz.html/?quiz=${quiz.id}`
        })
        container.append(quizView);
    })
}


let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);

let requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};
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

