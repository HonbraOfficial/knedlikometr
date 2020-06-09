let knedlikdb = [];

let popup = false;

addRipples(".mdc-button");

document.querySelectorAll("card").forEach(function(elem) {
    elem.classList.add("mdc-card");
    elem.classList.add("mdc-card--outlined");
});

function render() {
    document.querySelector("main").innerHTML = generateHTML(knedlikdb, true) + `<new class="mdc-elevation--z8 mdc-ripple-surface" onclick="newCard();"><i class="material-icons">add</i></new>`;
    if (popup != false) {
        popup.renderHTML(generateHTML(knedlikdb), false);
    } else {
        document.querySelector("main").innerHTML += `<new class="mdc-elevation--z8 mdc-ripple-surface" onclick="openPopup();"><i class="material-icons">open_in_new</i></new>`;
    }
    addRipples(".mdc-ripple-surface", true);
}

function openPopup() {
    popup = window.open("popup.html", "Knedlíkometr", "width=500,height=500");
    render();
}

render();

function generateHTML(data, ismain) {
    let html = "",
        top = [],
        i = 0;
    data.forEach(function(json) {
        top[i] = json.count;
        i++;
    });
    top = Math.max(...top);
    i = 0;
    data.forEach(function(json) {
        if (json.count == top) {
            html += `<card class="mdc-elevation--z4 top" id="${i}">
                        <top>👑</top>`;
        } else {
            html += `<card class="mdc-elevation--z4" id="${i}">
                        <top>${Math.round((json.count / top) * 1000) / 10 + "%"}</top>`;
        }
        html += `
                <json>${JSON.stringify(json)}</json>
                <graph style="height: ${Math.round((json.count / top) * 1000) / 10 + "%"};"></graph>
                <name>${json.name}</name>
                <count>${json.count}</count>
                `;
        if (ismain) {
            html += `<controls>
                                <button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="editValue(this.parentElement.parentElement.id, -1)">remove</button>
                                <button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="editName(parseInt(this.parentElement.parentElement.id, 10))">edit</button>
                                <button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="removeCard(parseInt(this.parentElement.parentElement.id, 10))">delete</button>
                                <button class="mdc-icon-button material-icons mdc-ripple-surface" onclick="editValue(parseInt(this.parentElement.parentElement.id, 10), 1)">add</button>
                            </controls>`;
        }
        html += `
        
            </card>
        `;
        i++;
    });
    return html;
} {

}

function editValue(i, mod) {
    knedlikdb[i].count = knedlikdb[i].count + mod;
    render();
}

function editName(i) {
    var person = prompt("Enter new name", "");

    if (person == null || person == "") {
        return;
    } else {
        knedlikdb[i].name = person;
        render();
    }
}

function newCard() {
    var person = prompt("Enter new name", "");

    if (person == null || person == "") {
        return;
    } else {
        knedlikdb.push({
            "name": person,
            "count": 0
        });
        render();
    }
}

function removeCard(i) {
    knedlikdb.splice(i, 1);
    render();
}

function getData(url, then) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
            then(this.responseText);
        }
    });

    xhr.open("GET", url);

    xhr.send(data);
}

function addRipples(elem, isunbounded) {
    document.querySelectorAll(elem).forEach(function(elem) {
        var ripple = new mdc.ripple.MDCRipple(elem);
        if (isunbounded) {
            ripple.unbounded = true;
        }
    });
}