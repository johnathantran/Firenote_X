// workflow for creating a new list or a new memo
import { getAllExistingNoteIndexes } from './submodules/getAllExistingNoteIndexes.js'
export function addNewNote(isMemo) {

    if (checkExceedMaxNotes()) { return };
  
    try {
      chrome.storage.sync.get(getAllExistingNoteIndexes(), function(result) {
        
        var firstAvailableNoteIndex = getFirstAvailableNoteIndex(result, isMemo);
        console.log(firstAvailableNoteIndex);

        var noteTemplate = {
            exists: false,
            idx: firstAvailableNoteIndex.toString(),
            isMemo: isMemo,
        };

        var note = initNote(noteTemplate);
        createNewNote(noteTemplate, note)
        
      });
    }
    catch(err) {
      console.log(err);
    }
}


function checkExceedMaxNotes() {

    var basic = true; // basic vs premium version of firenote app
    var header_list = document.querySelectorAll(".dragHeader");

    if ((header_list.length >= max_notes) && (basic == true)) {
      alert("You have reached the maximum " + max_notes + " note limit. Please delete a note to add more. (I am working on a premium version to allow more notes and other cool features!)");
      return false;
    }
    if (header_list.length >= 20) {
      alert("You have reached the maximum 20 note limit! Please delete a note to add more.");
      return true;
    }
}

function getFirstAvailableNoteIndex(result) {

    var existing_notes = [];
    var first_empty_slot = 1;
    var slot_found = false;
    var header_list = document.querySelectorAll(".dragHeader");
    
    for (var j=1; j <= header_list.length + 1; j++) {
      j = j.toString();

      try {
        var noteFromStorage = JSON.parse(result[j]);
        console.log(noteFromStorage);
      }
      catch(err){
        console.log(err);
        noteFromStorage = null;
      }

      // if the note exists at that index
      if ((noteFromStorage !== null) && (noteFromStorage !== "[]")) {
        continue;
        existing_notes.push(j);
      }
      // break on first instance that an available slot is found
      else if ((noteFromStorage == undefined) || (noteFromStorage == null)) {
        console.log("breaking at " + j);

        if (slot_found == false) {
          first_empty_slot = j;
          slot_found = true;
        }
      };
    }

    console.log(j + noteFromStorage);
    return first_empty_slot;
}


// creates notes when the page is loaded (note exists), or when the Add Note button is clicked (note does not exist yet)
function initNote(noteTemplate) {
    console.log("creating note");
    
    var idx = noteTemplate.idx.toString();
    var note = document.createElement('div');
    note.id = "mydiv" + idx;
    document.body.appendChild(note);
    note.classList.add('drag');

    note.innerHTML += '<input class="dragHeader" maxlength="30" readOnly="true" id="mydiv' + idx + 'header" value="Note ' + idx +'">';
    note.innerHTML += '<img src="/src/images/edit.png" class="editHeader" id="edit">';
    note.innerHTML += '<img src="/src/images/minimize.png" class="minimize" id="minimize">';
    note.innerHTML += '<img src="/src/images/exit.png" class="deleteNote" id="exit"></img>';

    if (noteTemplate.isMemo == true) {
        note.innerHTML += '<textarea placeholder="Type a memo here..." maxlength="600" class="memo" rows="8" spellcheck="false" id="memo' + idx +'" style="display:inline-block;"></textarea>';
        note.innerHTML += '<p class="memoCounter" id="memoCounter' + idx + '">Max 600 characters</p>';
        note.innerHTML += '<button class="saveMemo">Save Memo</button>';
    }
    else {
        note.innerHTML += '<input maxlength="250" class="task" placeholder="Add an item" id="task' + idx + '" style="display:inline-block;"><img src="/src/images/add.png" id="add" class="add">';
        note.innerHTML += '<img class="undo" id="undo' + idx + '" src="/src/images/undo.png">';
        note.innerHTML += '<div class="todoLists" id="todos' + idx + '"></div>';
    }
    return (note)
};


function createNewNote(noteTemplate, note) {

    var idx = noteTemplate.idx;
    var note_header = "Note " + idx;
  
    // spawn note in center of screen
    note.style.top = ($(window).scrollTop() + $(window).height() / 2) + "px";
    note.style.left = ($(window).scrollTop() + $(window).width() / 2) - (note.offsetWidth / 2) + "px";

    // create new note in local storage as empty list
    var dict = {
    'todo': null, // list of todo items
    'headerText': note_header, 
    'minimized': false, 
    'posTop': note.style.top, 
    'posLeft': note.style.left,
    'hidden': false,
    'isMemo': noteTemplate.isMemo,
    'memo': null,
    };
    console.log("Creating item: " + idx);

    storeSync(idx,dict);

    // adds the new note header to Notes Dock
    var note_log = document.createElement('div');
    
    document.querySelector('#myNotes').appendChild(note_log);
    note_log.innerHTML += '<p class="headerList" id="headerItem' + idx + '">' + note_header + '</p>';

    // check if the note is hidden
    if (dict['hidden'] == true) {
        note.style.display = 'none';
        document.querySelector('#headerItem' + idx).style.color = 'silver';
    }
    addNoteEventHandlers(note);
}