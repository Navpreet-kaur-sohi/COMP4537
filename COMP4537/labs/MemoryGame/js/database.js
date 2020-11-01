
const mysql = require("mysql");
let http = require('http');
let url = require('url');

/**
 *  connection credentials to my sql
 */
const db = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b0621f6e110318",
  password: "f4d66a61",
  database : "heroku_1cfe38e0b57240a"
});
//mysql://b0621f6e110318:f4d66a61@us-cdbr-east-02.cleardb.com/heroku_1cfe38e0b57240a?reconnect=true

/**
 * creating a server to respond to AJAX call
 */
http.createServer(function(req,response){
  let q = url.parse(req.url, true);
  response.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
  let name = q.query["name"];
  let score = q.query["score"];
  connect();
  insert_data(name,score);
  read_data().then(result=> { response.end(result) })
  
}).listen(process.env.PORT || 8888);

/**
 * connecting to database
 */
function connect(){
  db.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Connected to MySQL");    
});

}

/**
 * inserting data into database
 * @param {*} name 
 * @param {*} score 
 */
function insert_data(name,score){
  var sql = "INSERT INTO score(name, score) values ('"+name+"',"+score+")";
    db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    
  });
}

/**
 * reading data from databse
 */
function read_data(){
  let sql_read = "SELECT DISTINCT(score),name FROM score ORDER BY score DESC LIMIT 5 ;";
  return new Promise((resolve, reject) => {
  db.query(sql_read, (err, result) => {
    console.log(result);
      resolve(JSON.stringify(result));
    });
  });
}



