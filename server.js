var express = require("express");
var path = require("path");

var app = express();

// THIS IS WHERE WE DO DB/MODEL STUFF
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/full_MEAN-demo");

var friendSchema = new mongoose.Schema({
	name: String
});

var Friend = mongoose.model("Friend", friendSchema);

// THIS IS OUR STATIC CONTENT YIPEE FOR NO EJS
app.use(express.static(path.join(__dirname, "./client")));


// This is our controller
var controller = {
	getFriends: function(req, res) {
		console.log("in the controller getFriends method about to ask the model");
		Friend.find({}, function(err, data) {
			console.log("came back from the model");
			if(err) {
				console.log("NOOOOO");
			} else {
				console.log("HELL YEAH", data);
				res.json(data);
			}
		})
	}
}

// This is our routes
app.get('/friends', function(req, res) {
	console.log("in the get /friends route");
	controller.getFriends(req, res);
})

// listen
app.listen(8000, function() {
	console.log("got it");
})