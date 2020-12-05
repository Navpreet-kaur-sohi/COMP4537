if(!localStorage.getItem("token") || !localStorage.getItem("userId") ){
    alert("Logged out");
    window.location.href = "../views/login.html";
}
const token = `JWT ${localStorage.getItem("token")}`
const userId = localStorage.getItem("userId");
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('quiz');


const container = $("#qus_holder");

let populateMyQuiz = (quiz)=>{
    $("#quizName").val(quiz.title);
    $("#quizDesc").val(quiz.description);

    let affinities = JSON.parse(quiz.affinities);

    $("#affinityA").val(affinities.a);
    $("#affinityB").val(affinities.b);
    $("#affinityC").val(affinities.c);
    $("#affinityD").val(affinities.d);
    
}

let populateQuestions = (questions)=> {
    questions.forEach((question)=>{
        let answers = JSON.parse(question.answers);
        let questionView = $(`
        <div class = "Question" id="${question.id}">
                        <p>Enter the quetion</p>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Question</label>
                            <input type="text" class="form-control"  aria-describedby="emailHelp" value="${question.text}">
                            
                        </div>
                        <div class="form-group row">
                        <label for="exampleInputPassword1">A
                        <input type="text" class="form-control" value="${answers[0].text}">
                    </label>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">B
                        <input type="text" class="form-control" value="${answers[1].text}">
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">C
                        <input type="text" class="form-control" value="${answers[2].text}">
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">D
                        <input type="text" class="form-control" value="${answers[3].text}">
                    </div>
                </div>
        `);
        container.append(questionView);
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

//Popualte Questions
fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quizId}/questions`, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    populateQuestions(result);
})
.catch(error => error.then(msg => alert(msg.message)));

//Populate Quiz info
fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quizId}`, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log(result);
    populateMyQuiz(result);
})
.catch(error => error.then(msg => alert(msg.message)));

//Stuff to update the quiz when user submits
$("#submit").click(()=>{

    let quizValues = {}; //Populate this with all the updated values for the quiz

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body = JSON.stringify(quizValues),
    redirect: 'follow'
    };

    //Popualte Questions
    fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quizId}`, requestOptions)
    .then((response) => {
        console.log(response.status);
        if(response.status != 200) throw response.json();
        return response.json()
    })
    .then((result) => {
        console.log(result);
        //Redirect back to profile
    })
    .catch(error => error.then(msg => alert(msg.message)));
});
