//#0
// Write a function that makes an AJAX GET call to a firebase location of your choice 
// (the firebase should have some data). The function should have a parameter called callback. 
// In the onload and onerror methods of the request ask the callback to run and pass
// it the data that came back from the get call 
// Example: callback(this.response) 
// Call the function and pass it a parameter of alert. It should look something like this: 
// myAJAX(alert); 

var ajax = {};
ajax.url = 'https://rockwell-ajaxtest.firebaseio.com/.json'

ajax.makeCall = function (callback) {
    var request = new XMLHttpRequest();
    request.open('GET', ajax.url, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            callback(data.name);
        }
    }
    request.onerror = function () {
        callback(data.name);
    }
}

ajax.makeCall(alert);

//#1
// Create a function that takes a string as a parameter and then writes the 
// value of that parameter out to a div of your choice. 
// Call the AJAX function you wrote for 0 and pass in your new divWriter function as the parameter, i.e.: 
// myAJAX(divWriter); 

ajax.displayString = function (string) {
    var div = document.getElementById("main-div");
    var par = document.createElement("p");
    par.className = 'par';
    div.appendChild(par);
    var text = document.createTextNode(string);
    par.appendChild(text);
}

ajax.makeCall(ajax.displayString);

//#2
// Call your ajax function again, but pass in an anonymous function that runs both alert and divWriter
// as a callback to the AJAX function. Don't forget to add a parameter to the anonymous function. 

ajax.makeCall(function (data) {
    alert(data);
    ajax.displayString(data);
});

//#3
// Modify your AJAX call to take 2 parameters, call them success and error. Run the success callback
// in the portion of the code that runs if the call was successful. 
// Run the error callback where there was an error. 
// Call your AJAX and Pass in alert on the error and divWriter as the success callback. 

ajax.makeCall_2 = function (success, error) {
    var request = new XMLHttpRequest();
    request.open('GET', ajax.url, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response)
            success(data.name);
        }
    }
    request.onerror = function () {
        error(data.name);
    }
}

ajax.makeCall_2(ajax.displayString, alert);

//#4
// Call your AJAX pass in an anonymous function that outputs errors to the console.
// Write the response to a div if the call is successful

ajax.makeCall_2(ajax.displayString, function (data) {
    console.log(data);
});




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                 PRACTICE                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//var allUserData = [];

//function logStuff(userData) {
//    if (typeof userData === "string") {
//        console.log(userData);
//    } else if (typeof userData === "object") {
//        for (var item in userData) {
//            console.log(item + ": " + userData[item]);
//        }
//    }
//}

//function getInput(options, callback) {
//    allUserData.push(options);

//    if (typeof callback === "function") {

//        callback(options);
//    }

//}

//var data = {
//    name: "Chase",
//    age: "24",
//    gender: "male"
//}

//var strData = "Hello World";
//getInput(data, logStuff);
//getInput(strData, logStuff);

//var clientData = {
//    id: 094545,
//    fullName: "Not Set",
//    setUserName: function (firstName, lastName) {
//        this.fullName = firstName + " " + lastName;
//    }
//}



//getUserInput("Chase", "Kitteridge", clientData.setUserName, clientData);
//console.log(clientData.fullName);
//console.log(window.fullName);

//var client = {
//    id: "1234",
//    fullName: "not set",
//    setName: function (firstName, lastName) {
//        console.log(firstName + " " + lastName);
//    }
//}

//function getClientInput(firstName, lastName, callback, callbackObj) {
//    callback.call(callbackObj, firstName, lastName);
//}

//getClientInput("Finn", "Thehuman", client.setName, client);

//function genericPoemMaker(name, gender) {
//    console.log(name + "is finer than fine wine.");
//    console.log("Altruistic and noble for the modern time.");
//    console.log("Always admirably adorned with the latest style.")
//    console.log("A " + gender + " of unfortunate tragedies who still manages a perpetual smile.");
//}

//function greeter(customerName, sex) {
//    var salutation = sex && sex === "Man" ? "Mr." : "Ms.";
//    console.log("Greetings, " + salutation + customerName);
//}

//function getUserInput(firstName, lastName, gender, callback) {
//    var fullName = firstName + " " + lastName;

//    if (typeof callback === "function") {
//        callback(fullName, gender);
//    }
//}

//getUserInput("Chase", "Kitteridge", "Man", greeter);
//getUserInput("Chase", "Kitteridge", "Female", greeter);