/**
 * {Description : getting token}
 */
function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}

/**
 * user information
 * {Description : getting the user information and displaying over columns}
 */
getInfo = () => {
    let name = $("#name");
    let email = $("#email");
    let pass = $("#pass");
    let id = localStorage.getItem("id");
    const data = {
        id:id,
    }
    
    console.log("get data",data);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",getToken())

    let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    //fetching th einfo
    fetch("https://agile-tundra-39359.herokuapp.com/api/v1/user/"+id, requestOptions)
        .then(response => response.json())
        .then(data=>{console.log(data)
        name.val(data.name)
        email.val(data.email)
        pass.val(data.userPassword)
        })
        
        .catch(error => console.log('error', error));
};

//calling whenever the  page renders
getInfo();

/**
 * updating info
 * {Description : Updating the user information when changed}
 */
updateinfo=()=>{
  let id = localStorage.getItem("id");
  let name = $("#name").val()
  let email = $("#email").val()
  let pass = $("#pass").val()
    const data = {
      name : name,
      email : email,
      password:pass
  }

  console.log(data);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization",getToken())

  let requestOptions = {
  method: 'PUT',
  body:JSON.stringify(data),
  headers: myHeaders,
  redirect: 'follow'
  };
  fetch("https://agile-tundra-39359.herokuapp.com/api/v1/user/"+id, requestOptions)
      .then(response => response.json())
      .then(result=>console.log(result))
      .catch(error => console.log('error', error));
    getInfo();

} 

/**
 * deleting a profile
 * {Description : when user wants to delete ther account}
 */
deleteprofile = () => {
  console.log("here")
  let id = localStorage.getItem("id");
  let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",getToken())

let requestOptions = {
method: 'DELETE',
headers: myHeaders,
redirect: 'follow'
};
fetch("https://agile-tundra-39359.herokuapp.com/api/v1/user/"+id, requestOptions)
    .then(response => {response.json()
    window.location.href = "../views/login.html"}
    )
    .catch(error => console.log('error', error));

}

/**
 * {Description : redirecting to create  quiz}
 */
launchCreate = () => {
  window.location.href = "../views/createQuiz.html"
}

/**
 * {Description : redirecting to user  quiz}
 */
getUserQuiz = ()=>{
 window.location.href = "../views/myquiz.html"
}


/**
 * {Description : redirecting to all quiz}
 */
allQuiz = ()=>{
  window.location.href = "../views/QuizList.html"
}


