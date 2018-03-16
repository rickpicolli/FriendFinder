// var bodyParser = require('body-parser');
// var path = require('path');

var friends = require("../data/friends.js");


function apiRoutes(app) {

app.get("/api/friends", function(req, res) {
  res.json(friends);
});

app.post("/api/friends", function (req, res) {
 

  var newFriend = {
    name: req.body.name,
    photo: req.body.photo,
    scores: req.body.scores
  };
  var bestMatch = {}
  //res.send(match);
  var total = 10000;
  //do loop twice to compare two different values, from the new user and the friends that are in my database
  for (var i = 0; i < friends.length; i++) {
    console.log(friends[i].name);
    totalDifference = 0;

      for (var j=0; j< friends[i].scores[j]; j++){

        //
        totalDifference = totalDifference + Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriend.scores[j]));

       
        if (totalDifference <  total){
          total = totalDifference;
        //trying to atribute the new value to friends
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.scores = totalDifference;
        }
      }
    }

    // save the user's data to the database
    friends.push(newFriend);

  
    res.json(bestMatch);

  });


}

// Export for use in main server.js file
module.exports = apiRoutes;
  

