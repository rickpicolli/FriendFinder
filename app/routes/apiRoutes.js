var bodyParser = require('body-parser');
var path = require('path');

var friends = require("../data/friends.js");

function apiRoutes(app) {

app.get("api/friends", function(req, res) {
	res.json(friends);
});

app.post("/api/friends", function (req, res) {
	var bestMatch = {
		name: req.body.name,
		photo: req.body.photo,
		scores: []
	};
	var scoreArr = [];
	for (var i = 0; i < req.body.scores.length; i++) {
		scoreArr.push( parseInt(req.body.scores[i]));
	}
	bestMatch.scores = scoreArr;

	var compareScoreArr = [];
	for (var i = 0; i < friends.length; i++) {

		var currentComparison = 0;
      for(var j=0; j < bestMatch.scores.length; j++){
        currentComparison += Math.abs( bestMatch.scores[j] - friends[i].scores[j] );
      }

      // Push each comparison between friends to array
      compareScoreArr.push(currentComparison);
    }

    // Determine the best match using the postion of best match in the friendsData array
    var bestMatchPosition = 0; // assume its the first person to start
    for(var i=1; i < compareScoreArr.length; i++){
      
      // Lower number in comparison difference means better match
      if(compareScoreArr[i] <= compareScoreArr[bestMatchPosition]){
        bestMatchPosition = i;
      }

    }

    // ***NOTE*** If the 2 friends have the same comparison, then the NEWEST entry in the friendsData array is chosen
    var bestFriendMatch = friends[bestMatchPosition];



    // Reply with a JSON object of the best match
    res.json(bestFriendMatch);



    // Push the new friend to the friends data array for storage
    friends.push(bestMatch);

  });

}


// Export for use in main server.js file
module.exports = apiRoutes;
	

