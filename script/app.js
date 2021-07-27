var wall = document.getElementById("wall");
var settings = document.getElementById("settings");

// Add new note
function openNoteEditor() {
    var div = document.createElement("div");
    div.className = "noteEditor";
    div.style.left = "20px";
    div.style.top = "100px";
    div.style.position = "absolute";
    div.style.height = "320px";
    div.style.width = "320px";
    div.style.border = "2px solid #000000";
    div.innerHTML =
        `<div class="crabNote">
            <button class="deleteButton" onclick="deleteNote(this)"><span class="material-icons">close</span></button>
        </div>
        <div class="editorButtons">
            <input class="noteButton" type="color" name="notecolor" onchange="changeNoteColor(this)">
            <button class="noteButton" onclick="addHeading(this)">Lisää otsikko</button>
            <button class="noteButton" onclick="addText(this)">Lisää tekstiä</button>
            <button class="noteButton" onclick="addToDo(this)">Lisää to-do</button>
        </div>
        <div class="newNote"></div>`;
    // jQuery UI draggable and resizable
    $(div).draggable({
        containment: wall,
        stack: ".noteEditor"
    }).resizable({
        containment: wall,
        minWidth: 320,
        minHeight: 200
    });
    wall.appendChild(div);
}
// Delete specific note
function deleteNote(e) {
    e.parentNode.parentNode.remove();
}
// Delete specific feature
function removeFeature(e) {
    e.parentNode.remove();
}
// Add heading
function addHeading(e) {
    var heading = document.createElement("div");
    heading.className = "heading";
    heading.innerHTML =
        `<input class="headingInput" type="text" placeholder="Otsikko">
        <button class="deleteButton" onclick="removeFeature(this)"><span class="material-icons">close</span></button>`;
    var note = e.parentNode.parentNode.querySelector(".newNote");
    note.appendChild(heading);
}
// Add text
function addText(e) {
    var text = document.createElement("div");
    text.className = "text";
    text.innerHTML =
        `<textarea class="textInput" type="text">
        </textarea>
        <button class="deleteButton" onclick="removeFeature(this)"><span class="material-icons">close</span></button>`;
    var note = e.parentNode.parentNode.querySelector(".newNote");
    note.appendChild(text);
}
// Add to-do list
function addToDo(e) {
    var checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    checkbox.innerHTML =
        `<input class="checkboxBox" type="checkbox">
        <input class="checkboxInput" type="text">
        <button class="deleteButton" onclick="removeFeature(this)"><span class="material-icons">close</span></button>`;
    var note = e.parentNode.parentNode.querySelector(".newNote");
    note.appendChild(checkbox);
}
// Change background color of selected note
function changeNoteColor(e) {
    var color = e.value;
    e.parentNode.parentNode.style.backgroundColor = color;
}
// Settings
function openSettings() {
    settings.style.left = "20px";
    settings.style.bottom = "80px";
    settings.style.position = "absolute";
    settings.style.zIndex = "4";
    settings.innerHTML =
        `<div class="settingsContent">
            <h2>Asetukset</h2><button class="closeButton" onclick="closeSettings(this)"><span class="material-icons">close</span></button>
            <label for="backgroundcolor">Vaihda taustaväri</label>
            <div class="settingsColor">  
                <input type="radio" id="light" name="backgroundcolor" value="light" onchange="addBackgroundColor(this)">
                <label for="light">Vaalea</label><br>  
                <input type="radio" id="dark" name="backgroundcolor" value="dark" onchange="addBackgroundColor(this)">
                <label for="dark">Tumma</label><br>
                <input type="radio" id="rainbow" name="backgroundcolor" value="rainbow" onchange="addBackgroundColor(this)">
                <label for="rainbow">Sateenkaari</label>
            </div>
            <button class="settingsButton" onclick="askBeforeDelete()">Tyhjennä</button>
        </div>`;
    // Toggle between hide and show with settings button
    if (settings.style.display === "none") {
            settings.style.display = "block";
    } else {
        settings.style.display = "none";
    }
}
// Close settings
function closeSettings(e) {
    settings.style.display = "none";
}
// Ask before deleteing all notes
function askBeforeDelete() {
    var popup = document.createElement("div");
    popup.className = "confirmPopup";
    popup.style.left = "0px";
    popup.style.bottom = "0px";
    popup.style.position = "absolute";
    popup.style.zIndex = "5";
    popup.innerHTML =
        `<h2>Halutako varmasti poistaa kaikki muistiinpanot?</h2>
        <p>Tätä toimintoa ei voi perua</p>
        <button class="settingsButton" onclick="deleteAllNotes()">Kyllä</button>
        <button class="settingsButton" onclick="removeFeature(this)">Peruuta</button>`;
    // Popup window opens on top of the settings window
    settings.appendChild(popup);
}
// Delete all notes
function deleteAllNotes() {
    var allNotes = document.getElementsByClassName("noteEditor");
    for (var i = allNotes.length-1; i >= 0; i--) {
        allNotes[i].remove();
    }
    // Close popup window
    document.querySelector(".confirmPopup").remove();
}
// Change background (body) color
function addBackgroundColor(e) {
    switch(e.value) {
        case "light":
            document.body.style.backgroundImage = "linear-gradient(#ffffff, #ffffff)";
            break;
        case "dark":
            document.body.style.backgroundImage = "linear-gradient(#3a3a3a, #515151)";
            break;
        case "rainbow":
            document.body.style.backgroundImage = "linear-gradient(to bottom right,red,orange,yellow,green,blue,indigo,violet)";
            break;
        }
}
// Show date at the bottom
function date() {
    var date = new Date();
    // Day, starts with sunday
    var weekdays = ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
    var weekday = weekdays[date.getDay()];
    var day = weekday + " " + date.getDate() + ". ";
    // Month
    var months = ["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"]
    var month = months[date.getMonth()];
    // Year
    var year = " " + date.getFullYear();
    // Time
    var hours = date.getHours();
    var minutes = date.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes; // If minutes less than 9, add 0 --> 09
    var time = " klo " + hours + ":" + minutes;
    // Whole date
    document.getElementById("date").innerHTML = day + month + year + "<br>" + time;
}
function setDate() {
    setInterval( function() {
         date();
     }, 1000);
}
window.onload = setDate;