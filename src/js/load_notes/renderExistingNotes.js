export function renderExistingNotes(note,result,idx) {

    var dict = JSON.parse(result[idx]);
    note.style.top = dict['posTop'];
    note.style.left = dict['posLeft'];

    //note.offsetHeight = dict['height'];
    //note.offsetWidth = dict['width'];
    var note_header = dict['headerText'];
    note.childNodes[0].value = note_header;

    // check if the note is minimized
    if (dict['minimized'] == true) {
        note.childNodes[4].style.display = 'none';
        note.childNodes[5].style.display = 'none';
        note.childNodes[6].style.display = 'none';
        try {
            note.childNodes[7].style.display = 'none';
        }
        catch(err){};
    }
    // adds the new note header to Notes Dock
    var color = dict['folderColor'];
    var note_log = document.createElement('div');
    document.querySelector('#myNotes').appendChild(note_log);
    note_log.innerHTML += '<p class="headerList" id="headerItem' + idx + '">' + note_header + '</p>';

    // add the new note to the appropriate folder
    if ((color !== "Yellow") && (color !== undefined)) {

        moveToFolder(color,note_log.childNodes[0]);

        chrome.storage.sync.get(['folderNames'], function(result) {
        try {
            var folderNames = result['folderNames'];
            var rename = color;
            if (folderNames[color] !== undefined) {
                var rename = folderNames[color];
            }
            document.getElementById("input" + color).value = rename;
            document.getElementById("option" + color).innerHTML = rename;
        }
        catch(err) {}
        });
    }

    // check if the note is hidden
    if (dict['hidden'] == true) {
        note.style.display = 'none';
        document.querySelector('#headerItem' + idx).style.color = 'silver';
    }

    // if note is a memo, query saved text
    // instead of if memo == true
    if (dict['isMemo'] !== true) {
        note.childNodes[4].value = dict['memo'];
        var textEntered = note.childNodes[4].value;
        note.childNodes[5].textContent = (600 - textEntered.length) + " characters left";
        // set the textarea to the saved height
        note.childNodes[4].style.height = dict['boxHeight'] + "px"; 
    }

    addNoteEventHandlersOnLoad();
}