
function populate(){
    let t = "";
let posts_array = JSON.parse(localStorage.getItem('list'));
console.log(posts_array);

for (let i = 0; i < posts_array.length; i++){
      var tr = "<tr>";
      tr += "<td>"+posts_array[i].score+"</td>";
      tr += "<td>"+posts_array[i].name+"</td>";
      tr += "</tr><br>";
      t += tr;
}
console.log(t);
document.getElementById("data").innerHTML += t;
}