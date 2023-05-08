const mysql = require('mysql2');

var connection = mysql.createConnection({
   port: 3306,
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'node_curd'
});

connection.connect((err) => {
   if(!err) {
      console.log("Connected");
   } else {
      console.log(err);
   }
});

module.exports = connection;
