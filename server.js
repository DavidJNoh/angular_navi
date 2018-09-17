var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(express.static(__dirname+'/public/dist/public'));

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/basic_mongoose'), {useNewUrlParser: true}

var CakeSchema = new mongoose.Schema({
    name: {type: String, required:true},
    url: {type: String, required:true},
    // rates: [RateSchema]
    },{timestamps: true})

mongoose.model('Nav', CakeSchema);
var Nav = mongoose.model('Nav')

app.post('/post', function(req, res){
    console.log(req.body)
    Nav.create(req.body, function(err, nav){
        if(err){
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data: nav})
        }
    })

})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

app.listen(8000, function() {
    console.log("listening on port 8000");
})