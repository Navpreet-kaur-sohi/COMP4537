
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


/**
 * creating a server to respond to AJAX call
 */


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
//var sql = "SELECT * FROM score;"
 db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    
  });
}
insert_data("ffd",22);
/**
 * reading data from databse
 */
function read_data(){
  let sql_read = "SELECT DISTINCT(score),name FROM score ORDER BY score DESC LIMIT 5 ;";
  return new Promise((resolve, reject) => {
  db.query(sql_read, (err, result) => {
      resolve(JSON.stringify(result));
    });
  });
}



