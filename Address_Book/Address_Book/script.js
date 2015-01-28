// Build a new application using Firebase.
// Come up with an Theme for your application that will need Create, Read, and Delete.
// For example: Contact List Application(Name, Phone, Address, Email),
// Roster of Hogwarts Students (Name, House, Year).  Feel free to be creative.

// Your app needs to be able to POST to Firebase. (Create)

// GET data from Firebase and display it on view (Read)

// Stretch

// Be able to DELETE data from Firebase

// Only do a full GET on page load but keep data in sync 

// Be able to UPDATE your data (for example: edit contacts)

// Main object that holds everything
var ContactList = {};

// Local storage for contacts
ContactList.storage = [];

// Variable for Firebase url
ContactList.url = 'https://c-rockwell-contact-list.firebaseio.com/';

// Object Construcor for contacts
ContactList.contact = function (firstName, lastName, phone, city, email, group) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.phone = phone,
    this.city = city,
    this.email = email,
    this.group = group,
    this.id = null
}



ContactList.createNew = function () {
    var fName = $('#inputFirstName').val();
    var lName = $('#inputLastName').val();
    var phone = $('#inputPhone').val();
    var city = $('#inputCity').val();
    var email = $('#inputEmail').val();
    var tempGroup = document.getElementById("inputGroup")
    var group = tempGroup.options[tempGroup.selectedIndex].text;
    if (fName === "") {
        alert("Please enter a first name");
        return false;
    } else if (lName === "") {
        alert("Please enter a last name");
        return false;
    }

    var tempContact = new ContactList.contact(fName, lName, phone, city, email, group);

    var request = new XMLHttpRequest();
    request.open('POST', ContactList.url + ".json", true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var id = JSON.parse(this.response);
            tempContact.id = id;
            ContactList.storage.push(tempContact);
            ContactList.display();
        }
    }
    request.send(JSON.stringify(tempContact));

}

// Display contacts to table ///////////////////////// Experiment
ContactList.display = function () {
    var table = document.getElementById("tableBody");
    table.innerHTML = "";
    for (var i in ContactList.storage) {
        var row = table.insertRow(i);
        var name1 = row.insertCell(0);
        name1.innerHTML = ContactList.storage[i].firstName;
        var name2 = row.insertCell(1);
        name2.innerHTML = ContactList.storage[i].lastName;
        var phone = row.insertCell(2);
        phone.innerHTML = ContactList.storage[i].phone;
        var email = row.insertCell(3);
        email.innerHTML = ContactList.storage[i].email;
        var city = row.insertCell(4);
        city.innerHTML = ContactList.storage[i].city;
        var group = row.insertCell(5);
        group.innerHTML = ContactList.storage[i].group;
    }
}




// Get contacts from Firebase
ContactList.retrieve = function () {
    var request = new XMLHttpRequest();
    request.open('GET', ContactList.url + ".json", true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            for (var i in data) {
                data[i].id = i;
                ContactList.storage.push(data[i]);
            }
            console.log(ContactList.storage[0].id);
            ContactList.display();
        } else {
            console.log("Error");
        }
    }
}

ContactList.retrieve();