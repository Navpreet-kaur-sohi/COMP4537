if(!localStorage.getItem("token") || !localStorage.getItem("userId") ){
    alert("Logged out");
    window.location.href = "../views/login.html";
}
const token = `JWT ${localStorage.getItem("token")}`
const userId = localStorage.getItem("userId");

const container = $("#myQuizzes");

let populateMyQuizzes = (quizzes)=>{
    quizzes.forEach((quiz)=>{
        let quizView = $(`<div id="quiz${quiz.id}">
        <p>${quiz.title}</p>
        <p>${quiz.description}</p>
        <p>Attempts: ${quiz.attempts}</p>
        </div>`);
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
fetch(`http://localhost:4000/api/v1/user/${userId}/quizzes`, requestOptions)
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

