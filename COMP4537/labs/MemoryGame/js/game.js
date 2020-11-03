
let gameStart = false;
let answer;
let level = 1;
let totalScore = 0;
let scoreYouGot = 0;
let round = 1;
let  rows = 2;
let columns = 2;
let userChoice = 0;
let rowswitch = true;
let failed = false;
let name;

/**
 * generating a randoom number array
 */
function randomNumberGenerator(){
    let ranArray = []
    var min ;
    var max;
    if(rowswitch){
            min = rows;
            max = columns;
    }
    else{
        min = columns;
        max = rows;
    }
     
    while(ranArray.length != (min)){
        let ranNum = Math.floor(Math.random() * Math.floor(max*min));
        if(!(ranArray.indexOf(ranNum)>-1)){
                ranArray.push(ranNum);
            }
    }
    console.log(ranArray);
    return ranArray;
}

/**
 * showung the blocks
 */
async function showBlocks(){

    answer = randomNumberGenerator();
    let blocks = document.getElementsByClassName('box');
    for(let i = 0; i < answer.length; i++){
        blocks[answer[i]].children[1].style.backgroundColor = '#37A8E8';
        flip(answer[i]);
    }
    setTimeout( () => {
        for(let i = 0; i < answer.length; i++){
            flip(answer[i]);
        }
    }, 2000)
    await setTimeout( () => {
        rotation();
    }, 3500)

    setTimeout(enableChoose, 3600);
    
}

/**
 * locating the boxes
 */
function boxLocate(){
    let board = document.getElementById("game-board");
    for(let i = 0;i<rows;i++){
        for(let j = 0;j<columns;j++){
            let box = document.createElement("div"); 
            box.classList.add("box");
            let front = document.createElement("div"); 
            front.classList.add("front");
            let back = document.createElement("div"); 
            back.classList.add("back");
            box.appendChild(front);
            box.appendChild(back);
            board.appendChild(box);
        }
    }
    
}

/**
 * flipping the tiles
 * @param {*} index 
 */
function flip(index){
    let blocks = document.getElementsByClassName('box');
    if(blocks[index].classList.contains("is-flipped")){
        blocks[index].classList.remove("is-flipped");
    } else {
        blocks[index].classList.add("is-flipped");
    }
}

/**
 * choosing the tiles
 * @param {*} index 
 */
function choose(index){
    if(gameStart){
        let boxes = document.getElementsByClassName('box');
        boxes[index].removeAttribute("onclick")
        if(answer.indexOf(index) > -1){
            totalScore++;
            scoreYouGot++;
        } else {
            totalScore--;
            failed = true;
            if(rows >3 && columns >3){
            set_difficulty();}
        }

        if(totalScore <= 0){
            alert('Sorry, you lost');
            negative_score();
        }

        document.getElementById('score').textContent = totalScore;
        flip(index);
        userChoice++;

    if(rowswitch){
            inc = rows;
    }
    else{
        inc = columns;
    }
        if(userChoice == answer.length){
            userChoice = 0;
            disableChoose();
            setTimeout(nextGame,1000);
        }
    }
}

/**
 * adding rotation to the tiles
 */
function rotation(){
    let board = document.getElementById("game-board");
    board.classList.add("rotation");
}

/**
 * launching a new game
 */
function newGame(){

    gameStart = true;
    reset()
    score = 0;
    level = 1;
    rows=2;
    columns=2;
    let gameBoard = document.getElementById('game-board');
    gameBoard.classList.remove('rotation');
    gameBoard.style.gridTemplateColumns = "repeat("+(rows)+",50px)"; 
    gameBoard.style.gridTemplateRows = "repeat("+(columns)+",50px)";

    var child = gameBoard.lastElementChild;  
    while (child) { 
        gameBoard.removeChild(child); 
        child = gameBoard.lastElementChild; 
    }
    

    boxLocate();

    setTimeout(showBlocks,500);
    setTimeout(rotation,5000);
    
}

/**
 * restart the game
 */
function restart(){
    newGame();
    console.log(level);
    console.log(score);
    document.getElementById('score').innerHTML = score;
    document.getElementById('level').innerHTML = level;
}

/**
 * setting the difficulty level of the game
 */
function set_difficulty(){
    if(failed){
        if(rowswitch){
            rows--;
        
        }else{
            columns--;
        }
    }
}

/**
 * adding sound to the game
 * @param {*} src 
 */
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

/**
 * playing the sound.
 */
function nextLevelSound(){
    let mySound = new sound("source/audio/levelupsound.mp3");
    mySound.play();
}

/**
 * advancing to the next level
 */
function nextGame(){
    console.log("rows"+rows);
    console.log("columns"+columns);
    if(rows == 7 && columns==7){
        terminate();
    }
    
   
      if(scoreYouGot > 0){
        level++;
       
        if(rowswitch){
            rows++;
            rowswitch = false;
        }else{
            columns++;
            rowswitch = true;
        }
    }  else if(scoreYouGot < level + 1) {
        if(level != 1){
            level--;
        }
    }
    document.getElementById('level').textContent = level; 
    let gameBoard = document.getElementById('game-board');
    reset();
    gameBoard.classList.remove('rotation');
    var child = gameBoard.lastElementChild;  
    while (child) { 
        gameBoard.removeChild(child); 
        child = gameBoard.lastElementChild; 
    } 
    
    gameBoard.style.gridTemplateRows = "repeat(" + (rows) + ", 50px)";
    gameBoard.style.gridTemplateColumns = "repeat(" + (columns) + ", 50px)";
    
    nextLevelSound();
    boxLocate();
    setTimeout(showBlocks,500);
    setTimeout(rotation,5000);
}

/**
 * reseting variables
 */
function reset(){
    answer = null;
    scoreYouGot = 0;
    failed = false;
    
}

/**
 * when scores get negative
 */
function negative_score(){
    document.getElementById("cred").innerHTML = "<input type = 'text' id = 'name' placeholder = 'Enter_name'/><br/><input type= 'button' value = 'Submit' onclick='Send_Data()'/><br/><span id = 'response'></span>"
        
}

/**
 * terminating the game
 */
async function terminate(){
    let r =confirm("Do you want to terminate this game?");
    if(r == true){
        document.getElementById("cred").innerHTML = "<input type = 'text' id = 'name' placeholder = 'Enter_name'/><br/><input type= 'button' value = 'Submit' onclick='Send_Data()'/><br/><span id = 'response'></span>"
        
        }    

    }

    /**
     * disabling the user from choosing tiles
     */
function disableChoose(){
    let boxes = document.getElementsByClassName('box');
    var inc ;
    if(rowswitch){
            inc = rows;
    }
    else{
        inc = columns;
    }

    for(let i = 0; i <= (rows * columns - 1); i++){
        console.log("level : " + level + "loop disable" );
        boxes[i].removeAttribute("onclick")
    }
}

/**
 * enabling the user to choose tiles
 */
function enableChoose(){
    let boxes = document.getElementsByClassName('box');
    var inc ;
    if(rowswitch){
            inc = rows;
    }
    else{
        inc = columns;
    }
    for(let i = 0; i <= ((rows * columns) -1); i++){
        console.log(i);
        boxes[i].setAttribute("onclick","choose("+i+");");
    }
    
}

/**
 * sending the data
 */
function Send_Data(){
    let x = new XMLHttpRequest();
    let name = document.getElementById("name").value;
    x.open("GET", "https://chilling-vampire-60176.herokuapp.com/?name="+name+"&score="+totalScore,true);
    x.send();
    x.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
        localStorage.setItem('list',this.responseText);
      //  console.log(localStorage.getItem('list'));
    }
    };
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
    
    document.getElementById("data").innerHTML += t;
}

/**
 * starting the game
 */
function start(){
    boxLocate();
    newGame();
    
}


