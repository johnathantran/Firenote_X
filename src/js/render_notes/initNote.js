import { bindNoteEvents } from "./bindNoteEvents.js"
import { renderExistingNotes } from './renderExistingNotes.js'
import { createNewNote } from './createNewNote.js'


class NoteClass {

  constructor(noteContainer, storageQuery, idx, isMemo) {
 
    this.note = noteContainer;
    this.storageQuery = storageQuery;
    this.idx = idx;
    this.isMemo = isMemo;
    this.header = noteContainer.childNodes[0];
    this.editHeaderBtn = noteContainer.childNodes[1];
    this.minBtn = noteContainer.childNodes[2];
    this.delBtn = noteContainer.childNodes[3];

    if (isMemo == false) {
      this.taskInput = noteContainer.childNodes[4];
      this.addBtn = noteContainer.childNodes[5];
      this.undoBtn = noteContainer.childNodes[6];
      this.todoList = noteContainer.childNodes[7];
    }
    else {
      this.memoInput = noteContainer.childNodes[4];
      this.characterCount = noteContainer.childNodes[5];
      this.memoBtn = noteContainer.childNodes[6];
    }
  }
}


// creates notes when the page is loaded (note exists), or when the Add Note button is clicked (note does not exist yet)
export function initNote(noteTemplate) {
    console.log("creating note");
    
    var idx = noteTemplate.idx.toString();
  
    chrome.storage.sync.get([idx], function(storageQuery) {
  
      var noteContainer = document.createElement('div');
      noteContainer.id = "mydiv" + idx;
      document.body.appendChild(noteContainer);
      noteContainer.classList.add('drag');
  
      noteContainer.innerHTML += '<input class="dragHeader" maxlength="30" readOnly="true" id="mydiv' + idx + 'header" value="Note ' + idx +'">';
      noteContainer.innerHTML += '<img src="/src/images/edit.png" class="editHeader" id="edit">';
      noteContainer.innerHTML += '<img src="/src/images/minimize.png" class="minimize" id="minimize">';
      noteContainer.innerHTML += '<img src="/src/images/exit.png" class="deleteNote" id="exit"></img>';
  
      if (noteTemplate.isMemo == true) {
        noteContainer.innerHTML += '<textarea placeholder="Type a memo here..." maxlength="600" class="memo" rows="8" spellcheck="false" id="memo' + idx +'" style="display:inline-block;"></textarea>';
        noteContainer.innerHTML += '<p class="memoCounter" id="memoCounter' + idx + '">Max 600 characters</p>';
        noteContainer.innerHTML += '<button class="saveMemo">Save Memo</button>';
      }
      else {
        noteContainer.innerHTML += '<input maxlength="250" class="task" placeholder="Add an item" id="task' + idx + '" style="display:inline-block;"><img src="/src/images/add.png" id="add" class="add">';
        noteContainer.innerHTML += '<img class="undo" id="undo' + idx + '" src="/src/images/undo.png">';
        noteContainer.innerHTML += '<div class="todoLists" id="todos' + idx + '"></div>';
      }

      var note = new NoteClass(noteContainer, storageQuery, idx, noteTemplate.isMemo);
      
      if (noteTemplate.exists == true) {
        renderExistingNotes(note);
        bindNoteEventsOnLoad();
      }
      else {
        createNewNote(note);
        bindNoteEvents(note);
      } 
    });
};


// adds event listeners when page loads
var attachedListeners = false;
function bindNoteEventsOnLoad() {
  
  var all_notes = (document.querySelectorAll('.drag'));
  var allNotesDict = {};

  for (var i=0; i< all_notes.length; i++) {
    allNotesDict[getIdx(all_notes[i])] = all_notes[i];
  }
  console.log(allNotesDict);
  
  chrome.storage.sync.get(['haveListeners'], function(result) {
    
    if (attachedListeners == true) { return; }

    var all_idx = [];
    for (var i = 1; i <= max_notes; i++) { all_idx.push(i.toString()) };
    
    chrome.storage.sync.get(all_idx, function(noteObj) {
  
      for (var idx=1; idx <= max_notes; idx++) {
        idx = idx.toString();

        // check if a note exists with the given key/index
        try {
          var parsedNoteObj = JSON.parse(noteObj[idx]);
          var note = new NoteClass(allNotesDict[idx], parsedNoteObj, idx, parsedNoteObj['isMemo']);
          console.log(note);
          bindNoteEvents(note);
        }
        catch (err) {
          console.log(err);
          continue;
        }
      }
      console.log("Adding listeners...");
      storeSync('haveListeners',true);
      attachedListeners = true;
    });
  
    /*
    chrome.browserAction.onClicked.addListener(function() {
      chrome.tabs.create({'url':"chrome://newtab"});
    });
    */
   
  });
}