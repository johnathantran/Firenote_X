import { bindNoteEvents } from "./bindNoteEvents.js"
import { renderExistingNotes } from './renderExistingNotes.js'
import { createNewNote } from './createNewNote.js'

class NoteClass {

  constructor(noteContainer) {
    this.note = noteContainer;
    this.header = noteContainer.childNodes[0];
    this.editHeaderBtn = noteContainer.childNodes[1];
    this.minBtn = noteContainer.childNodes[2];
    this.delBtn = noteContainer.childNodes[3];
  }

}

class TodoClass extends NoteClass {

  constructor(noteContainer) {
    super(noteContainer);
    this.taskInput = noteContainer.childNodes[4];
    this.addBtn = noteContainer.childNodes[5];
    this.undoBtn = noteContainer.childNodes[6];
  }
}

class MemoClass extends NoteClass {

  constructor(noteContainer) {
    super(noteContainer);
    this.memoInput = noteContainer.childNodes[4];
  }
}

// creates notes when the page is loaded (note exists), or when the Add Note button is clicked (note does not exist yet)
export function initNote(noteTemplate) {
    console.log("creating note");
    
    var idx = noteTemplate.idx.toString();
  
    chrome.storage.sync.get([idx], function(result) {
  
      var noteContainer = document.createElement('div');
      noteContainer.id = "mydiv" + idx;
      document.body.appendChild(noteContainer);
      noteContainer.classList.add('drag');
  
      noteContainer.innerHTML += '<input class="dragHeader" maxlength="30" readOnly="true" id="mydiv' + idx + 'header" value="noteContainer ' + idx +'">';
      noteContainer.innerHTML += '<img src="/src/images/edit.png" class="editHeader" id="edit">';
      noteContainer.innerHTML += '<img src="/src/images/minimize.png" class="minimize" id="minimize">';
      noteContainer.innerHTML += '<img src="/src/images/exit.png" class="deleteNote" id="exit"></img>';
  
      if (noteTemplate.isMemo == true) {
        noteContainer.innerHTML += '<textarea placeholder="Type a memo here..." maxlength="600" class="memo" rows="8" spellcheck="false" id="memo' + idx +'" style="display:inline-block;"></textarea>';
        noteContainer.innerHTML += '<p class="memoCounter" id="memoCounter' + idx + '">Max 600 characters</p>';
        noteContainer.innerHTML += '<button class="saveMemo">Save Memo</button>';
        var note = new MemoClass(noteContainer);
      }
      else {
        noteContainer.innerHTML += '<input maxlength="250" class="task" placeholder="Add an item" id="task' + idx + '" style="display:inline-block;"><img src="/src/images/add.png" id="add" class="add">';
        noteContainer.innerHTML += '<img class="undo" id="undo' + idx + '" src="/src/images/undo.png">';
        noteContainer.innerHTML += '<div class="todoLists" id="todos' + idx + '"></div>';
        var note = new TodoClass(noteContainer);
      }


      if (noteTemplate.exists == true) {
        renderExistingNotes(noteContainer,result,idx);
        bindNoteEventsOnLoad();
      }
      else {
        createNewNote(noteTemplate, noteContainer);
        console.log("binding in init")
        bindNoteEvents(noteContainer);
      } 
    });
};


// adds event listeners when page loads
attachedListeners = false;
function bindNoteEventsOnLoad() {
  
  chrome.storage.sync.get(['haveListeners'], function(result) {
    
    if (attachedListeners == true) { return; }

    var all_notes = (document.querySelectorAll('.drag'));
    for (var i=0; i < all_notes.length; i++) {
      bindNoteEvents(all_notes[i]);
    }
    console.log("Adding listeners...");
    storeSync('haveListeners',true);
    attachedListeners = true;
    /*
    chrome.browserAction.onClicked.addListener(function() {
      chrome.tabs.create({'url':"chrome://newtab"});
    });
    */
  });
}