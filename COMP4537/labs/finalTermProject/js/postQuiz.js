function getToken() {
  return "JWT" + " " + localStorage.getItem("token");
}

postQuiz = () => {
  var qname = $("#name").val();
  var qdesc =$("#desc").val();
  var a1 = $("#a1").val();
  var a2 = $("#a2").val();
  var a3 = $("#a3").val();
  var a4 = $("#a4").val();
  var affinity = {a1,a2,a3,a4};
  var answers = {};
  
  const data = {
    title:qname,
    description:qdesc,
    affinities:affinity,
    answers:answers
}
console.log(data)

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization",getToken())

let requestOptions = {
method: 'POST',
body:JSON.stringify(data),
headers: myHeaders,
redirect: 'follow'
};
fetch("https://agile-tundra-39359.herokuapp.com/api/v1/quiz/create", requestOptions)
    .then(response => response.json())
    .then(data=>{console.log(data)
    window.location.href = "../views/Profile.html"
      })
    .catch(error => console.log('error', error));
}

