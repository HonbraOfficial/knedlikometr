// initial setup
let knedlikdb = [],
    popup = false;
render();

// refresh cards
function render() {
    // insert cards and the add button
    document.querySelector("main").innerHTML = generateHTML(knedlikdb, true) + `<new class="mdc-elevation--z8 mdc-ripple-surface" onclick="newCard();"><i class="material-icons">add</i></new>`;

    // if popup exists
    if (popup != false) {
        // push custom HTML there
        popup.renderHTML(generateHTML(knedlikdb), false);
    } else {
        // else add popup button
        document.querySelector("main").innerHTML += `<new class="mdc-elevation--z8 mdc-ripple-surface" onclick="openPopup();"><i class="material-icons">open_in_new</i></new>`;
    }

    // add MDC ripples
    addRipples(".mdc-ripple-surface", true);
}

// open popup
function openPopup() {
    popup = window.open("popup.html", "Knedlíkometr", "width=500,height=500");
    window.setTimeout(render, 500);
}

// generate HTML from JSON
function generateHTML(data, ismain) {
    // set values
    let html = "",
        top = [],
        i = 0;

    // figure out the top value
    data.forEach(function(json) {
        top[i] = json.count;
        i++;
    });
    top = Math.max(...top);

    // generate HTML
    i = 0;
    data.forEach(function(json) {
        // if this person is the top
        if (json.count == top) {
            // add the crown
            html += `<card class="mdc-elevation--z4 top" id="${i}"><top>👑</top>`;
        } else {
            // else calculate %
            html += `<card class="mdc-elevation--z4" id="${i}"><top>${Math.round((json.count / top) * 1000) / 10 + "%"}</top>`;
        }

        // generate HTML from data
        html += `<graph style="height: ${Math.round((json.count / top) * 1000) / 10 + "%"};"></graph><name>${json.name}</name><count>${json.count}<label>`;

        // plural language
        if (json.count < 5 &&  json.count > 1) {
            html += " knedlíky";
        } else if (json.count == 1) {
            html += " knedlík";
        } else {
            html += " knedlíků";
        }

        // close off tags
        html += `</label></count>`;

        // if it's for main window
        if (ismain) {
            // add the controls
            html += `<controls><button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="editValue(this.parentElement.parentElement.id, -1)">remove</button><button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="editName(parseInt(this.parentElement.parentElement.id, 10))">edit</button><button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="removeCard(parseInt(this.parentElement.parentElement.id, 10))">delete</button><button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="editValue(parseInt(this.parentElement.parentElement.id, 10), 1)">add</button></controls>`;
        }

        // close off tags
        html += `</card>`;
        i++;
    });

    // return generated HTML
    return html;
}

// edit JSON value
function editValue(i, mod) {
    // edit the value
    knedlikdb[i].count = knedlikdb[i].count + mod;

    // if the edited value is under 0
    if (knedlikdb[i].count < 0) {
        // set the value to 0
        knedlikdb[i].count = 0;
    }

    // refresh
    render();
}

// edit JSON name
function editName(i) {
    // ask for the name
    var person = prompt("Enter new name", "");

    // if the answer is blank
    if (person == null || person == "") {
        // return
        return;
    } else {
        // else edit the value
        knedlikdb[i].name = person;

        // refresh
        render();
    }
}

// create new card
function newCard() {
    // ask for the name
    var person = prompt("Enter new name", "");

    // if the answer is blank
    if (person == null || person == "") {
        // return
        return;
    } else {
        // else add the value
        knedlikdb.push({
            "name": person,
            "count": 0
        });

        // refresh
        render();
    }
}

// remove card
function removeCard(i) {
    // remove card from database
    knedlikdb.splice(i, 1);

    // refresh
    render();
}

// add MDC ripples to element
function addRipples(elem, isunbounded) {
    // get the elements and execute a function for each of them
    document.querySelectorAll(elem).forEach(function(elem) {
        // add ripple
        var ripple = new mdc.ripple.MDCRipple(elem);

        // if is unbounded
        if (isunbounded) {
            // set unbounded
            ripple.unbounded = true;
        }
    });
}