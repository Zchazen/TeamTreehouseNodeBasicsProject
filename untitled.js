var http = require("http");
//print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " in Javascript.";
  console.log(message);
}

//print out error message
function printError(error) {
  console.log(error.message);

}

function get(username) {
    var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
    var body = "";
    response.on("data", function(chunk) {
      body += chunk;
    });
    response.on("end", function() { 
      if(response.statusCode === 200) {
      try {
      var profile = JSON.parse(body);
      printMessage(username, profile.badges.length, profile.points.Javascript)
     //});
  } catch(error) {
    //parse error
    printError(error);
  }
  } else {
    //statuscode error
    printError({"message": "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
  }

  //connection error
  request.on("error", printError);
});
});
}

//export function get to the other module
module.exports.get = get;

//console.log(response.statusCode});
//SOLUTION NOTES
//conect to API URL (http://teamtreehouse.com/username.json);
//read the data
//parse date: read from string to way we can process in the app
//print the data
                                                                                         
