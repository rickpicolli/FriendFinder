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
		scores: req.body["scores[]"]
	};
  var match = whichFriend(bestMatch)
	friends.push(bestMatch);
  res.send(match);

  //do loop twice to compare two different values, from the new user and the friends that are in my database
	for (var i = 0; i < friends.length; i++) {
    console.log(friends[i].name);
    totalDifference = 0;

      for (var j=0; j< friends[i].scores[j]; j++){

        //
        totalDifference = totalDifference + Math.abs(parseInt(friends[i].scores[j]) - parseInt(bestMatch.scores[j]));

       
        if (totalDifference <= bestMatch.friendDifference){

        //trying to atribute the new value to friends
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.scores = totalDifference;
        }
      }
    }

    // save the user's data to the database
    friends.push(bestMatch);
    res.json(bestMatch);

  });

}












// 		scoreArr.push( parseInt(req.body.scores[i]));
// 	}
// 	bestMatch.scores = scoreArr;

// 	var compareScoreArr = [];

//   //do loop twice to compare two different values, from the new user and the friends that are in my database
// 	for (var i = 0; i < friends.length; i++) {

// 		var currentComparison = 0;
//       for(var j=0; j < bestMatch.scores.length; j++){
//         currentComparison += Math.abs( bestMatch.scores[j] - friends[i].scores[j] );
//       }

//       compareScoreArr.push(currentComparison);
//     }


//     var bestMatchPosition = 0; 
//     for(var i=1; i < compareScoreArr.length; i++){
      
 
//       if(compareScoreArr[i] <= compareScoreArr[bestMatchPosition]){
//         bestMatchPosition = i;
//       }

//     }
//     var bestFriendMatch = friends[bestMatchPosition];



//     res.json(bestFriendMatch);


//     friends.push(bestMatch);

//   });

// }


// Export for use in main server.js file
module.exports = apiRoutes;
	

