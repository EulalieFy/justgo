var express = require('express');
var mongo=require('mongodb')
var exphbs  = require('express-handlebars');
var Handlebars=require('handlebars');
var path = require("path");
//const cities = require('cities.json');
var ObjectId = require('mongodb').ObjectId; 

const bodyParser = require("body-parser");
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var url = "mongodb://localhost:27017/";

mongo.MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("justgo");


app.get('/', function(req, res) {
    dbo.collection("roadtrips").find({}).toArray( function(err, result) {
        if (err) throw err;
        console.log(result);
        res.render('home',{roadtrips: result})
        })
    console.log("Working!!")
});



app.post('/', function(request, res){

    console.log(request.body.length);
    console.log(typeof request.body.length);
   
    /*dbo.collection("roadtrips").aggregate([
        {$project: {diff: {$abs: {$subtract: [parseInt(request.body.length), "$total_length"]}}}},
        {$sort: {diff: 1}},
        {$limit: 3}
    ]).toArray( function(err, result) {
        if (err) throw err;
        console.log(result);
        res.render('home',{roadtrips: result})
        }) */
    
    dbo.collection("roadtrips").find({country:request.body.country }).toArray( function(err, result) {
        if (err) throw err;

        console.log(result);
        res.render('home',{roadtrips: result})
        }) 
});




app.get('/:id', function(req, res) {
   
   console.log(req.params.id)

   dbo.collection("roadtrips").findOne(ObjectId(req.params.id),function(err, result) {
        if (err) throw err;
        console.log(result);
        res.render('example',{roadtrips: result})
        })
  })
 
});


app.listen(3333, function () {
    console.log('Express app listening on port 3333');
  });

