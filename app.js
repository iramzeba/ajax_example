var express = require('express');
var mysql = require('mysql');
var connection = require('./model/db');
var msg = require('./server.js');
var app = express();
 var bodyParser = require('body-parser');
 var path = require('path');


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname));
app.get('/', function (req, res) {
    //res.send('hello');
    res.render('add_quote.ejs');
});
//import and export 
// console.log(msg.firstName + ' ' + msg.lastName);

// msg.getUser();
//console.log(msg.SimpleMessage);
//create
app.post('/products', function (req, res) {
     var name=req.body.name;
     var description = req.body.description;
      console.log(req.body.description);
    let sql = "INSERT INTO product  (`name`, `description`) VALUES('"+req.body.name+"','"+req.body.description+"')";
    connection.query(sql, (error, results) => {

if (error) {
    throw error;
}
res.send('Successfully created product!');
    });
});

//view
app.get('/products', function (req,res) {
    let sql = `SELECT * FROM product ` ;
    connection.query(sql, (error,results) => {
        if (error) {
            throw err;
        }
        console.log(results);
        res.send({iram:results});   
    });
        
    });
    
    //update
    app.put('/products/:id', function(req, res) {
    var name=req.body.name;
     var description = req.body.description;

        //let sql = " UPDATE product SET name = ? , description = ? WHERE id = ?";
         let sql = `UPDATE product SET name = ${req.body.name}, description = ${req.body.description} WHERE id= ${req.params.id}`;
 
         connection.query(sql, (error,results) => {

        if (error) {
                
            throw error;
        }
    
          res.status(200);
 //console.log('Rows affected:', results.affectedRows);
       res.send('Succesfully updated product!'); 
    });
  
});

//delete
app.delete('/products/:id', function(req, res) {
   let sql = `DELETE FROM  product  WHERE id= ${req.params.id}`;
   connection.query(sql, (error, results)=>{
if (error) {
    throw error;
}
    res.send('Successfully deleted product!');
});
});

app.listen(8080, function () {
    
})
module.exports = connection;