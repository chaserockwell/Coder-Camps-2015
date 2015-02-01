// Master Array
var people = [];

// Chirps Array
var chirps = [];

// Profile Array
var profile = [];

//Remove Friend <p>
function removeFriendRow(index) {
    $("#friend-render" + index).remove();
}

// Person Constructor
function Person(name, handle, city, url) {
    this.name = name;
    this.handle = handle;
    this.city = city;
    this.url = url;
    this.chirps = [];
};

// Chirps Constructor
function Chirp(chirps, username) {
    this.chirps = chirps;
    this.date = moment();
    this.username = username;
};

// Profile Constructor
function Profile(name, handle, city, url) {
    this.name = name;
    this.handle = handle;
    this.city = city;
    this.url = url;
}

/* ID Names - Inputs
 * Post yor chirp = chirps-input
 * Post Button = post-button
 * Friends Area = friend-render
 * Friends Delete = 
 * Button My Chirps = myChirps-button
 * Chirp Display DIV = chirp-display
 * Edit Pencil =
 */

///////////////////////////////////////////////////////////////////////

//XMLHttpRequest shorten function
//var xhr = function (verb, url, data, callback, extra) {
//    console.log("hitn the XHR");

//URL Maker
var urlMaker = function (base) {
    var url = "https://" + base + ".firebaseio.com/"
    for (var i = 1; i < arguments.length; i++) {
        url += arguments[i] + "/"
    }
    return url + ".json";
}

var retrieveProfile = function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://chirptime.firebaseio.com/profile/.json', true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was successful');
            var name = data.name;
            var handle = data.handle;
            var city = data.city;
            var url = data.url;
            profile = new Profile(name, handle, city, url)

            var newName = '<a href="#" id="profile-name"><i class="glyphicon glyphicon-comment"></i>&nbsp;&nbsp;' + profile.name + '</a>';
            var newHandle = '<a href="#" id="profile-handle"><i class="glyphicon glyphicon-user"></i>&nbsp;&nbsp;' + profile.handle + '</a>';
            var newCity = '<a href="#" id="profile-city"><i class="glyphicon glyphicon-home"></i>&nbsp;&nbsp;' + profile.city + '</a>';

            $('#profile-handle').empty();
            $('#profile-name').empty();
            $('#profile-city').empty();
            $('#profile-handle').append(newHandle);
            $('#profile-name').append(newName);
            $('#profile-city').append(newCity);
        } else {
            console.log("Error" + request.response);
        }
    }
}

var retrieveFriends = function () {
    //var url = urlMaker();
    var request = new XMLHttpRequest();
    request.open('GET', 'https://chirptime.firebaseio.com/friends/.json', true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was successful');
            people = [];
            for (var i in data) {
                data[i].id = i;
                people.push(data[i]);
            }
            displayPerson();
        } else {
            console.log("Error" + request.response);
        }
    }
}
//retrieveFriends();
var pollingChirps = function (callback) {
    var timer = setInterval(callback, 5000);
}
//var currChirps = chirps.length;
//function chirpDiff() {
//    console.log(currChirps);
//    retrieveChirps(currChirps);
//}



var retrieveChirps = function () {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://chirptime.firebaseio.com/chirps/.json', true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was succesful');
            chirps = [];
            for (var i in data) {
                data[i].id = i;
                chirps.push(data[i]);
            }
            displayChirps();
        } else {
            console.log("Error" + request.response);
        }
    }

}
retrieveChirps();

function displayProfile(profile) {
    $('#profile-handle').innerHTML = "#nbsp;" + profile.handle;
    $('#profile-name').innerHTML = "#nbsp;" + profile.name;
    $('#profile-city').innerHtml = "<a href='#'><i class='glyphicon glyphicon-home'></i>#nbsp;'" + profile.city + "</a>";

}
retrieveProfile();
//Render Content to Screen(Friends)//
displayPerson = function () {

    $("#friend-render").empty();

    for (var i in people) {

        var tempObj = people[i];
        var newPerson = new Person(tempObj.name, tempObj.username, tempObj.city, tempObj.url);

        newPerson.__proto__ = { id: i };
        people.push(newPerson);

        $("#friend-render").append("<h4 class='text-center'><strong>" + tempObj.username + "</strong></h4>");
        $("#friend-render").append("<p class='text-center'>" + tempObj.name + "</p>");;
        $("#friend-render").append("<p class='text-center'>" + tempObj.city + "</p>");
        $("#friend-render").append("<a href='#'><i class='glyphicon glyphicon-trash' onclick='deleteFriend(" + i + ")'></i></a><hr>")
    }
};

//Delete Friends AJAX CALL//
function deleteFriend(itemIndexClicked) {
    var currFriend = people[itemIndexClicked];
    currEditId = currFriend.id;

    var customUrl = "https://chirptime.firebaseio.com/friends/" + currEditId + "/.json";

    var myrequest = new XMLHttpRequest();
    myrequest.open("DELETE", customUrl, true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var firebaseData = JSON.parse(this.response);
            console.log("DELETE was a success", firebaseData);
            removeFriendRow(currEditId);
            retrieveFriends();
        } else {
            console.log("there was a problem");
        }
    };
    myrequest.send();

};


//Delete Chirps AJAX CALL//
function deleteChirp(itemIndexClicked) {
    var currChirp = chirps[itemIndexClicked];
    currEditId = currChirp.id;

    var customUrl = "https://chirptime.firebaseio.com/chirps/" + currEditId + "/.json";

    var myrequest = new XMLHttpRequest();
    myrequest.open("DELETE", customUrl, true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var firebaseData = JSON.parse(this.response);
            console.log("DELETE was a success", firebaseData);
            removeFriendRow(currEditId);
            retrieveChirps();
        } else {
            console.log("there was a problem");
        }
    };
    myrequest.send();

};

// EDIT - user clicked edit
function editProfile() {

    var currInfo = profile;

    $("#nickname-input").val(profile.handle);
    $("#user-input").val(profile.name);
    $("#city-input").val(profile.city);

    console.log(currInfo);//test
}

$("#update-profile").click(function () { //update button
    xhrUpdate();
});

function xhrUpdate() {

    var nickname = $("#nickname-input").val();
    var user = $("#user-input").val();
    var city = $("#city-input").val();
    var updatedProfile = new Profile(user, nickname, city, null);

    var customUrl = "https://chirptime.firebaseio.com/profile/" + ".json"

    var myrequest = new XMLHttpRequest();
    myrequest.open("PUT", customUrl, true);
    myrequest.onload = function () {
        if (this.status >= 200 && this.status < 400) { // success
            console.log("PUT was a success", this.response);
            retrieveProfile();
        } else { // problem
            console.log("there was a problem");
        }
    };
    var jsonToSend = JSON.stringify(updatedProfile); // covert to string
    myrequest.send(jsonToSend); // send to firebase
}





//Render Content to Screen(Chirps)//
displayChirps = function () {

    $("#chirp-display").empty();
    chirps.reverse();
    for (var i in chirps) {

        var tempChirp = chirps[i];
        var tempTime = moment(tempChirp.date).fromNow();
        console.log(tempTime);

        var newChirp = new Chirp(tempChirp.chirps, tempChirp.username);

        newChirp.__proto__ = { id: i };

        chirps.push(newChirp);

        $("#chirp-display").append("<p><strong><h4 class='chirp-h4' ><a href='#' id='chirp-display' data-toggle='modal' data-target='#myModal2' class='panel-body' onclick='retrieveFriendChirps(" + i + ")'>" + tempChirp.username + "</a></h4></strong></p>")
        $("#chirp-display").append("<p><em><h4 class='chirpP'>" + tempChirp.chirps + "</h4></em></p>")
        $("#chirp-display").append("<p><h6>" + tempTime + "</h6><a href='#'><i class='glyphicon glyphicon-trash pull-right' onclick='deleteChirp(" + i + ")'></i></a></p></br><hr>")
    }
}




var friendChirps = [];
//// Friend modal feed
var retrieveFriendChirps = function (itemIndexClicked) {
    var currUser = chirps[itemIndexClicked];
    var currUserName = currUser.username;

    var request = new XMLHttpRequest();
    request.open('GET', 'https://chirptime.firebaseio.com/chirps/.json', true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was succesful');
            friendChirps = [];
            for (var i in data) {
                data[i].id = i;
                if (currUserName === data[i].username) {
                    friendChirps.push(data[i]);
                }
            }
            displayFriendChirps();
        } else {
            console.log("Error" + request.response);
        }
    }

}
retrieveFriends();
// Display friend's chirps in modal
displayFriendChirps = function () {

    $("#modal-chirp").empty();
    friendChirps.reverse();
    for (var i in friendChirps) {

        var tempChirp = friendChirps[i];
        var newChirp = new Chirp(tempChirp.chirps, tempChirp.username);

        newChirp.__proto__ = { id: i };

        friendChirps.push(newChirp);

        $("#modal-chirp").append("<p><strong><h4><a href='#' id='chirp-display' data-toggle='modal' data-target='#myModal2' class='panel-body' onclick='retrieveFriendChirps(" + i + ")'>" + tempChirp.username + "</a></h4></strong></p>")
        $("#modal-chirp").append("<p><em><h4 class='chirpP'>" + tempChirp.chirps + "</h4></em></p>")
        $("#modal-chirp").append("<p><h6>" + moment(tempChirp.date).fromNow() + "</h6></p></br><hr>")
        
        
        $('#friend-handle').empty();
        $('#friend-name').empty();
        $('#friend-city').empty();
        for (var i in people) {
            if (tempChirp.username === people[i].username) {
                var person = people[i];
                $('#friend-handle').append('<strong>' + person.username + '</strong>');
                $('#friend-name').append(person.name);
                $('#friend-city').append(person.city);
            } 
        }
        
        
       
    }



}


/////////////////////////////////
//          POST XHR           //
////////////////////////////////

function onKeyPress(e) {
    if (typeof e === "undefined" && window.event) {
        e = window.event;
    }
    if (e.keyCode == 13) {
        createChirp();
    }
}

createChirp = function () {
    var chirpValue = $('#chirp-input').val();
    //var date = moment().format("MMMM Do YYYY, h:mm a");
    var handle = profile.handle;
    var newChirp = new Chirp(chirpValue, handle);
    console.log(newChirp.date);
    postChirp(newChirp);
    $('#chirp-input').val('');
}

postChirp = function (dataToSend) {
    var request = new XMLHttpRequest();
    var url = 'https://chirptime.firebaseio.com/chirps.json'
    request.open('POST', url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log('POST was successful!');
            var id = JSON.parse(this.response);
            dataToSend.id = id;
            chirps.push(dataToSend);
            pollingChirps(retrieveChirps);
        } else {
            console.log('POST was unsuccessful.');
        }
    }

    request.send(JSON.stringify(dataToSend));
    //retrieveChirps();
}












/* ID Names - Inputs
 * Post yor chirp = chirps-input
 * Post Button = post-button
 * Friends Area = friend-render
 * Friends Delete = 
 * Button My Chirps = myChirps-button
 * Chirp Display DIV = chirp-display
 * Edit Pencil =
 */






































//var chaseChirps = urlMaker(baseUrl, "chase", chirps);

//function getFromFb() {
//    xhr("GET", urlMaker(baseUrl), null, fbData)

//};
//function fbData(callData) {
//    console.log(callData);
//};


//getFromFb(fbData);

//function postToFb(data) {
//    xhr("POST", urlMaker(baseUrl, chirps), data);
//}

//$("#submitForm").submit(function (event) {
//    event.preventDefault();

//    console.log("fff");
//    var chirpSubmit = $("#textBox").val();

//    var chirper = new Chirp("helo world", "123");

//    var tempChirp = ctHolder.chirpTimeArray.push(chirper);

//    postToFb(chirper);

//    console.log("it works");

//})

//$("#clicker").click(function () {
//    event.preventDefault();

//    console.log("fff");
//    var chirpSubmit = $("#textBox").val();

//    var chirper = new Chirp("he!!!!!lo world", "123");

//    var tempChirp = ctHolder.chirpTimeArray.push(chirper);

//    postToFb(chirper);

//    console.log("it works");

//});

////Global Object
//var ctHolder = {};

////Global Variable
//ctHolder.chirpTimeArray = [];

////Person object Constructor 
//function ChirpObj(name, userName, city) {
//    this.name = name;
//    this.userName = userName;
//    this.city = city;
//}

//function Chirp(chirp, date) {
//    this.chirp = chirp;
//    this.date = new Date();
//}

//var request = new XMLHttpRequest();
//request.open(verb, url, true);
//request.onload = function () {
//    if (this.status >= 200 && this.status < 400) {
//        if (callback && typeof (callback) === "function")
//            callback(JSON.parse(this.response));
//    } else {
//        console.log("Error " + this.status + ":" + this.response);
//    }
//};
//request.onerror = function () {
//    console.log("Communication error");
//};
//if (data) {
//    request.send(JSON.stringify(data));
//} else {
//    request.send();
//}
//}

////Base URL
//var baseUrl = "chirptime";

//var chirps = "chirps";

//var user;