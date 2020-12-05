
function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}
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
    fetch("https://agile-tundra-39359.herokuapp.com/api/v1/user/"+id, requestOptions)
        .then(response => response.json())
        .then(data=>{console.log(data)
        name.val(data.name)
        email.val(data.email)
        pass.val(data.userPassword)
        })
        
        .catch(error => console.log('error', error));
};
getInfo();

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

launchCreate = () => {
  window.location.href = "../views/createQuiz.html"
}

getUserQuiz = ()=>{
 window.location.href = "../views/myquiz.html"
}