import { createFolderMoveMenu } from '../note_events/createFolderMoveMenu.js'
import { createAddToFolderMenu } from '../folder_system/createAddToFolderMenu.js'
import { dragElement } from '../note_events/dragElement.js'
import { editHeader } from '../note_events/editHeader.js'
import { minimize } from'../note_events/minimize.js'
import { deleteNote } from'../note_events/deleteNote.js'
import { hideNote } from'../note_events/hideNote.js'

// add event listeners for all note UI elements
export function bindNoteEvents(note) {

  let idx = note.idx;
  let header = note.header;
  let editHeaderBtn = note.editHeaderBtn;
  let minBtn = note.minBtn;
  let delBtn = note.delBtn;
  
  let noteEvents = {

    // context menu for the note header
    createFolderMoveMenu: (note) => {
      createFolderMoveMenu(note);
    },

    // context menu for the note listing in the Notes Dock
    createAddToFolderMenu: (note) => {
      createAddToFolderMenu(note);
    },

    dragElement: () => {
      header.addEventListener('mousedown', function() {
        dragElement()
      });
    },

    editHeader: () => {
      editHeaderBtn.addEventListener('click', function() {
        editHeader();
      });
    },

    minimize: () => {
      minBtn.addEventListener('click', function() {
        minimize();
      });
    },

    deleteNote: () => { 
      delBtn.addEventListener('click', function() {
        deleteNote();
      });
    },

    bindEnterKeyHeaderEdit: () => {
      header.addEventListener('keyup', function (e) {;
        if (e.keyCode == 13) {
          event.preventDefault();
          editHeaderBtn.click();
        }
      });
    },

    hideNote: (idx) => {
      let noteDockListing = document.querySelector("#headerItem" + idx.toString());
      noteDockListing.addEventListener('click', function() {
        hideNote();
      });
    }
  };
  noteEvents.createFolderMoveMenu(note);
  noteEvents.createAddToFolderMenu(note);
  noteEvents.dragElement();
  noteEvents.editHeader();
  noteEvents.minimize();
  noteEvents.deleteNote();
  noteEvents.bindEnterKeyHeaderEdit();
  noteEvents.hideNote(idx);
  
  if (note.isMemo == true) { bindMemoEvents(note) }
  else { bindTodoListEvents(note) };
}


// add event listeners to memo style notes
import { autoExpand } from '../submodules/autoExpandField.js'
import { saveMemo } from '../note_events/memo/saveMemo.js'
import { countCharacters } from'../note_events/memo/countCharacters.js'

function bindMemoEvents(note) {

  let memoText = note.memoInput;
  let memoBtn = note.memoBtn;
  let box_height;
  let memoEvents = {

      autosizeMemoInput: () => {
        memoText.addEventListener('input', function (event) {
          box_height = autoExpand(event.target);
        });
      },

      saveMemo: () => {
        memoBtn.addEventListener('click', function() {
          console.log("Memo saved");
          saveMemo(box_height);
        });
      },

      editPendingSave: () => {
        memoText.addEventListener('click', function() {
        if (memoText.value.length < 600) {
          document.getElementById('pending').textContent = "edit pending save.";
          document.getElementById('pending').style.opacity = "1";
        }
        memoBtn.style.display = "inline-block"; // show the save button
        });
      },

      countCharactersRemaining: () => {
        memoText.addEventListener('keyup', countCharacters, false);
      },
  };
  
  memoEvents.autosizeMemoInput();
  memoEvents.saveMemo();
  memoEvents.editPendingSave();
  memoEvents.countCharactersRemaining();
};


// add event listeners to todo list style notes
import { add } from '../note_events/todo_list/addToTodoList.js'
import { undo } from '../note_events/todo_list/undo.js'

function bindTodoListEvents(note) {

  let todoListEvents = {
    bindEnterKey: () => {
      note.taskInput.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
          event.preventDefault();
          note.addBtn.click();
        }
      });
    },
    add: () => {
      note.addBtn.addEventListener('click', function() { add(getElm()) });
    },
    undo: () => {
      note.undoBtn.addEventListener('click', function() { undo(getElm()) });
    },
  };
  todoListEvents.bindEnterKey();
  todoListEvents.add();
  todoListEvents.undo();
};