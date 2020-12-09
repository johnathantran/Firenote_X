import { bindNoteEvents } from "./bindNoteEvents.js"
import { renderExistingNotes } from './renderExistingNotes.js'
import { createNewNote } from './createNewNote.js'
import { NoteClass } from './noteClass.js'

// creates notes when the page is loaded (note exists), or when the Add Note button is clicked (note does not exist yet)
export function initNote(noteTemplate) {
    
    let idx = noteTemplate.idx.toString();
  
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

      let note = new NoteClass(noteContainer, storageQuery, idx, noteTemplate.isMemo);
      
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
  
  var existingNotes = (document.querySelectorAll('.drag'));
  var idxToNoteMap = {};

  for (let i=0; i< existingNotes.length; i++) {
    idxToNoteMap[getIdx(existingNotes[i])] = existingNotes[i];
  }
  
  chrome.storage.sync.get(['haveListeners'], function(result) {
    
    if (attachedListeners == true) { return; }

    let existingIndexes = [];
    for (let i = 1; i <= max_notes; i++) { existingIndexes.push(i.toString()) };
    
    chrome.storage.sync.get(existingIndexes, function(noteObj) {
      
      for (let idx in idxToNoteMap) {
        try {
          let parsedNoteObj = JSON.parse(noteObj[idx]);
          let note = new NoteClass(idxToNoteMap[idx], parsedNoteObj, idx, parsedNoteObj['isMemo']);
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