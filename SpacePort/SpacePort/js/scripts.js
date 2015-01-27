//Build out a SpacePort Application

//* Use a Bootstrap template for your design

//* Ships should be able to land (Create)

//* You should have a table or set of divs that show the ships currently docked (Read)

//* Each ship should have an edit and delete button (Update/Delete)

//* Have at least 3 properties on your Ship for name, type, and an image

//* The edit button should launch a modal (Bootstrap/jQuery)

//* Your JavaScript code should NOT be on the Global Scope and instead on a separate object

//* Augment the Array.prototype to add a .remove() function that only requires an index to remove an item from an array rather than both an index and a count like .splice()

//* Stretch Goal 1: Make your types selectable via a dropdown box instead of simply allowing your user to type in anything they want

//* Stretch Goal 2: Make one of your ship types disallow the user from clicking your delete option

// Ship types
// medic, transport, supply, battle

// Ship colors
// red, orange, yellow, green, blue, purple, white, black


// Main spacePort object
var spacePort = {};

// Makes the .remove() function
Array.prototype.remove = function (index) {
    return this.splice(index, 1);
}

// storage for ships
spacePort.storage = [];


// Ship object constructor
spacePort.ship = function (name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
}

// Creates new ship objects and stores them in spacePort.storage array
spacePort.store = function () {
    var nameChoice = $(".form1").val();
    var e = document.getElementById("drop");
    var ee = document.getElementById("drop2");
    var typeChoice = e.options[e.selectedIndex].text;
    var colorChoice = ee.options[ee.selectedIndex].text.toLowerCase();
    if (nameChoice !== "") {
        var tempShip = new spacePort.ship(nameChoice, typeChoice, colorChoice);
        spacePort.storage.push(tempShip);
        spacePort.showShips();
    } else {
        alert("You forgot to name your Space Invader!");
    }

}

// Removes ship from spacePort.storage
spacePort.remove = function (i) {
    spacePort.storage.remove(i)
    spacePort.showShips();
}

// Makes default ships and sends them to spacePort.storage
spacePort.default = function () {
    var temp1 = new spacePort.ship("Frank", "Medic", "green");
    var temp2 = new spacePort.ship("Larsen", "Transport", "white");
    var temp3 = new spacePort.ship("Gertrude", "Battle", "blue");
    spacePort.storage.push(temp1, temp2, temp3);
    spacePort.showShips();
}

// Pushes ships to page
spacePort.showShips = function () {
    $("#shipDock").empty();
    $("#shipDock").append("<div class='dock row clearfix'>")
    for (var i = 0; i < spacePort.storage.length; i++) {
        $(".dock").append("<div class='col-md-4 dockDiv' id='dock" + i + "' >");
        $("#dock" + i).append("<div id='" + spacePort.storage[i].color + "' class='ship" + i + "'>");
        var idStr = i;
        if (spacePort.storage[i].type === "Medic") {
            $(".ship" + i).after("<button type='button' class='ed btn btn-default' data-toggle='modal' id='edit" + i + "' data-target='#myModal' onclick='spacePort.send(" + idStr + ")' >Edit</button><input type='button' onclick='spacePort.remove(" + i + ")' id='delete' class='ed btn btn-default' value='Delete' disabled>");

        } else {
            $(".ship" + i).after("<button type='button' class='ed btn btn-default' data-toggle='modal' id='edit" + i + "' data-target='#myModal' onclick='spacePort.send(" + idStr + ")' >Edit</button><input type='button' onclick='spacePort.remove(" + i + ")' id='delete' class='ed btn btn-default' value='Delete'>");
        }
    }
}
spacePort.currentShipIndex; // Index for the ship that's being edited
spacePort.selectedShip; // Ship object that's being edited

// Recieves index from editing Save Changes button
spacePort.send = function (index) {
    spacePort.currentShipIndex = index;
}

// Edits the ship upon "Save Changes" click
spacePort.edit = function () {
    spacePort.selectedShip = spacePort.storage[spacePort.currentShipIndex];

    var nameChoice = $(".edit-name").val();
    var e = document.getElementById("edit-type");
    var ee = document.getElementById("edit-color");
    var typeChoice = e.options[e.selectedIndex].text;
    var colorChoice = ee.options[ee.selectedIndex].text.toLowerCase();

    //var nameChoice = $("#edit-name").val();
    //var editedType = $("#edit-type");
    //var editedColor = $("#edit-color");

    //// Stuck here! 

    //console.log(editedType);
    //var typeChoice = editedType.options[editedType.selectedIndex].text;
    //var colorChoice = editedColor.options[editedColor.selectedIndex].text.toLowerCase();
    spacePort.selectedShip.name = nameChoice;
    spacePort.selectedShip.type = typeChoice;
    spacePort.selectedShip.color = colorChoice;
    spacePort.storage.splice(spacePort.currentShipIndex, 1, spacePort.selectedShip);
    spacePort.showShips();
}

// Default ships
spacePort.default();
