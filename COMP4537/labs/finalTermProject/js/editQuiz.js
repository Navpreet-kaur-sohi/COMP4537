/**
 * Check if user is still logged in
 */

if(!localStorage.getItem("token") || !localStorage.getItem("userId") ){
    alert("Logged out");
    window.location.href = "../views/login.html";
}

/**
 * garbbing user token
 */
const token = `JWT ${localStorage.getItem("token")}`

/**
 * grabbing user id
 */
const userId = localStorage.getItem("userId");


/**
 * quiz id
 */
const quiz = JSON.parse(localStorage.getItem("quiz"));

let questionCount = 0;

/**
 * container holding question
 */
const container = $("#qus_holder");

/**
 * populate
 * @param {*} quiz 
 */
let populateMyQuiz = (quiz)=>{
    $("#quizName").val(quiz.title);
    $("#quizDesc").val(quiz.description);

    let affinities = quiz.affinities;

    $("#affinityA").val(affinities.a);
    $("#affinityB").val(affinities.b);
    $("#affinityC").val(affinities.c);
    $("#affinityD").val(affinities.d);
    
}

/**
 * populating questions
 * @param {*} questions 
 */
let populateQuestions = (questions)=> {
    let qIndex = 0;
    questionCount = questions.length;

    questions.forEach((question)=>{
        let answers = question.answers;
        let questionView = $(`
        <div class = "Question" id="q${question.id}">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Question</label>
                            <input type="text" class="form-control"  aria-describedby="emailHelp" value="${question.text}" id="qText${question.id}">
                            
                        </div>
                        <div class="form-group row">
                        <label for="exampleInputPassword1">A
                        <input type="text" class="form-control" value="${answers[0].text}" id="qAnswerA${question.id}">
                    </label>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">B
                        <input type="text" class="form-control" value="${answers[1].text}" id="qAnswerB${question.id}">
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">C
                        <input type="text" class="form-control" value="${answers[2].text}" id="qAnswerC${question.id}">
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">D
                        <input type="text" class="form-control" value="${answers[3].text}" id="qAnswerD${question.id}">
                    </div>
                    <br/>
                </div>
        `);
        let editButton = $('<a href="#" class="btn btn-primary check">Edit</a>').click(()=>{editQuestion(question)});
        let deleteButton = $('<a href="#" class="btn btn-primary check">Delete</a>').click(()=>{deleteQuestion(question)});
        questionView.append(editButton).append(deleteButton);
        container.append(questionView);
    })
}

/**
 * adding new link
 * {description : this method is for adding a new question }
 */
new_link = () =>
       {
        let questionView = $(`
        <div class = "Question" id="${++questionCount}">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Question</label>
                            <input type="text" class="form-control"  aria-describedby="emailHelp" id="newText${questionCount}">
                            
                        </div>
                        <div class="form-group row">
                        <label for="exampleInputPassword1">A
                        <input type="text" class="form-control" id="newAnswerA${questionCount}">
                    </label>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">B
                        <input type="text" class="form-control" id="newAnswerB${questionCount}">
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">C
                        <input type="text" class="form-control" id="newAnswerC${questionCount}">
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputPassword1">D
                        <input type="text" class="form-control" id="newAnswerD${questionCount}">
                    </div>
                    <br/>
                </div>
        `);
        let qNum = questionCount;
        let saveButton = $('<a href="#" class="btn btn-primary check">Save New Question</a>').click(()=>{saveQuestion(qNum)});
        questionView.append(saveButton);

        container.append(questionView);
       }

       
    
editQuestion = (question)=>
{
    let myH = new Headers();
    myH.append("Content-Type", "application/json");
    myH.append("Authorization", token);

    let q = {
        text: question.text,
        answers: []
    }

    q.text = $(`#qText${question.id}`).val();
    q.answers = [
        {text: $(`#qAnswerA${question.id}`).val(), affinityId: "a"},
        {text: $(`#qAnswerB${question.id}`).val(), affinityId: "b"},
        {text: $(`#qAnswerC${question.id}`).val(), affinityId: "c"},
        {text: $(`#qAnswerD${question.id}`).val(), affinityId: "d"},
    ];

    let ro = {
    method: 'PUT',
    headers: myH,
    body: JSON.stringify(q),
    redirect: 'follow'
    };

    fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quiz.id}/questions/${question.id}`, ro)
    .then((response) => {
        if(response.status != 200) throw response.json();
        return response.json()
    })
    .then((result) => {
        alert(result.message);
    })
    .catch(error => error.then(msg => console.log(msg)));
}

deleteQuestion = (question)=>
{
    let myH = new Headers();
    myH.append("Content-Type", "application/json");
    myH.append("Authorization", token);

    let ro = {
    method: 'DELETE',
    headers: myH,
    redirect: 'follow'
    };

    fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quiz.id}/questions/${question.id}`, ro)
    .then((response) => {
        if(response.status != 200) throw response.json();
        return response.json()
    })
    .then((result) => {
        alert(result.message);
        window.location.reload();
    })
    .catch(error => error.then(msg => console.log(msg)));
}

saveQuestion = (qId)=>{
    let myH = new Headers();
    myH.append("Content-Type", "application/json");
    myH.append("Authorization", token);

    let q = {};

    q.text = $(`#newText${qId}`).val();
    q.answers = [
        {text: $(`#newAnswerA${qId}`).val(), affinityId: "a"},
        {text: $(`#newAnswerB${qId}`).val(), affinityId: "b"},
        {text: $(`#newAnswerC${qId}`).val(), affinityId: "c"},
        {text: $(`#newAnswerD${qId}`).val(), affinityId: "d"},
    ];

    let ro = {
    method: 'POST',
    headers: myH,
    body: JSON.stringify(q),
    redirect: 'follow'
    };

    fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quiz.id}/questions/create`, ro)
    .then((response) => {
        if(response.status != 200) throw response.json();
        return response.json()
    })
    .then((result) => {
        console.log(result);
        window.location.reload();
    })
    .catch(error => error.then(msg => console.log(msg)));
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
fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quiz.id}/questions`, requestOptions)
.then((response) => {
    console.log(response.status);
    if(response.status != 200) throw response.json();
    return response.json()
})
.then((result) => {
    console.log("questions", result);
    console.log("quiz", quiz)
    populateMyQuiz(quiz);
    populateQuestions(result);
})
.catch(error => error.then(msg => console.log(msg)));

//Stuff to update the quiz when user submits
$("#submit").click((e)=>{
    e.preventDefault();

    //Populate this with all the updated values for the quiz
    let quizValues = {
        title: $("#quizName").val(),
        description: $("#quizDesc").val(),
        affinities: {
            a: $("#affinityA").val(),
            b: $("#affinityB").val(),
            c: $("#affinityC").val(),
            d: $("#affinityD").val(),
        }
    }

    console.log(quizValues);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(quizValues),
    redirect: 'follow'
    };

    //Popualte Questions
    fetch(`https://agile-tundra-39359.herokuapp.com/api/v1/quiz/${quiz.id}`, requestOptions)
    .then((response) => {
        console.log(response.status);
        if(response.status != 200) throw response.json();
        return response.json()
    })
    .then((result) => {
        console.log(result);
        window.location.href = "../views/myquiz.html";
    })
    .catch(error => error.then(msg => alert(msg.message)));
});

$("#cancel").click((e)=>{
    e.preventDefault();
    window.location.href = "../views/Profile.html"
})
