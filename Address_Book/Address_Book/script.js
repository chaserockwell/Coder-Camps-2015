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
ContactList.baseUrl = 'https://c-rockwell-contact-list.firebaseio.com/';

// Id for items to be edited
ContactList.editId = '';

// Variable used to edit the selected Contact
ContactList.currContact;
ContactList.currContactId;
ContactList.editUrl;

// Url creator helper function
ContactList.urlMaker = function (id) {
    var url = ContactList.baseUrl;
    if (id) {
        url += (id + "/");
    }
    return url + ".json";
}

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


// CREATE creates new contact from input and sends it to database
ContactList.createNew = function () {
    var fName = $('#inputFirstName').val();
    var lName = $('#inputLastName').val();
    var phone = $('#inputPhone').val();
    var city = $('#inputCity').val();
    var email = $('#inputEmail').val();
    var tempGroup = document.getElementById("inputGroup");
    var group = tempGroup.options[tempGroup.selectedIndex].text;
    if (fName === "") {
        alert("Please enter a first name");
        return false;
    } else if (lName === "") {
        alert("Please enter a last name");
        return false;
    }
    var tempContact = new ContactList.contact(fName, lName, phone, city, email, group);
    ContactList.post(tempContact);
}

// Send POST to firebase
ContactList.post = function (dataToSend) {
    var url = ContactList.urlMaker();
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log('POST was successful!');
            var id = JSON.parse(this.response);
            dataToSend.id = id;
            ContactList.storage.push(dataToSend);
            ContactList.retrieve();
        } else {
            console.log('POST was unsuccessful.');
        }
    }

    request.send(JSON.stringify(dataToSend));
}


// Display contacts to table 
ContactList.display = function () {
    var counter = 0,
        idStr;
    var table = document.getElementById("tableBody");
    table.innerHTML = "";
    for (var i in ContactList.storage) {
        idStr = i;
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
        var btns = row.insertCell(6);
        btns.innerHTML = "<button type='submit' class='btn btn-default formBtn' value='' onclick='ContactList.update(" + i + ")' data-toggle='modal' data-target='#myModal' ><span class='glyphicon glyphicon-pencil' aria-hidden='true' ></span></button>";
        btns.innerHTML += "<button type='submit' class='btn btn-default formBtn' value='' onclick='ContactList.delete(" + i + ")'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
    }

}

// READ Get contacts from Firebase
ContactList.retrieve = function () {
    var url = ContactList.urlMaker();
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.send();
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(request.response);
            console.log('GET was successful');
            ContactList.storage = [];
            for (var i in data) {
                data[i].id = i;
                ContactList.storage.push(data[i]);
            }
            ContactList.display();
        } else {
            console.log("Error");
        }
    }
}

ContactList.update = function (itemIndex) {
    currContact = ContactList.storage[itemIndex];
    currContactId = currContact.id;
    editUrl = ContactList.urlMaker(currContactId);

    $('#modalFirstName').val(currContact.firstName);
    $('#modalLastName').val(currContact.lastName);
    $('#modalPhone').val(currContact.phone);
    $('#modalCity').val(currContact.city);
    $('#modalEmail').val(currContact.email);
    $('#modalGroup').val(currContact.group);
}

ContactList.saveChanges = function () {
    var fName = $('#modalFirstName').val();
    var lName = $('#modalLastName').val();
    var phone = $('#modalPhone').val();
    var city = $('#modalCity').val();
    var email = $('#modalEmail').val();
    var tempGroup = document.getElementById("modalGroup");
    var group = tempGroup.options[tempGroup.selectedIndex].text;

    var tempContact = new ContactList.contact(fName, lName, phone, city, email, group);
    ContactList.put(tempContact);
}

// UPDATE Update contacts in Firebase
ContactList.put = function (itemToEdit) {
    
    var request = new XMLHttpRequest();
    request.open('PUT', editUrl, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log("PUT was successful!");
            ContactList.retrieve();
        } else {
            console.log("PUT was unsuccessful.");
        }
    }
    
    ContactList.retrieve();
    var pItemToEdit = JSON.stringify(itemToEdit);
    request.send(pItemToEdit);
}

// DELETE Delete contacts from Firebase
ContactList.delete = function (itemToDelete) {
    var currContact = ContactList.storage[itemToDelete];
    var currContactId = currContact.id;
    deleteUrl = ContactList.urlMaker(currContactId);
    var request = new XMLHttpRequest();
    request.open('DELETE', deleteUrl, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            console.log("DELETE was successful!");
            ContactList.retrieve();
        } else {
            console.log("DELETE was unsuccessful.");
        }
    }
    
    request.send();
}

ContactList.retrieve();