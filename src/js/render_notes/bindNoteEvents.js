export function bindNoteEvents(note) {

  var idx = note.idx;
  var header = note.header;
  var editHeaderBtn = note.editHeaderBtn;
  var minBtn = note.minBtn;
  var delBtn = note.delBtn;
  var noteDockListing = document.querySelector('#headerItem' + idx);
  var noteEvents = {

    // context menu for the note header
    createFolderMoveMenu: () => {
      var setPositionMoveToFolderMenu = createContextMenu(document.querySelector(".folderAddMenu"));
      header.addEventListener("contextmenu", e => {
  
        move_select = document.getElementById("headerItem" + idx);
        e.preventDefault();
        const origin = {
          left: e.pageX,
          top: e.pageY
        };
        setPositionMoveToFolderMenu(origin);
        return false;
      });
    },

    // context menu for the note listing in the Notes Dock
    createAddToFolderMenu: () => {
      var setPositionAddToFolderMenu = createContextMenu(document.querySelector(".folderAddMenu"));
      noteDockListing.addEventListener("contextmenu", e => {
        move_select = getElm();
        console.log(move_select);
        e.preventDefault();
        const origin = {
          left: e.pageX,
          top: e.pageY
        };
        setPositionAddToFolderMenu(origin);
        return false;
      });
    },

    dragElement: () => {
      header.addEventListener('mousedown', function() {
        console.log("clicked");
        dragElement();
      });
    },

    editHeader: () => {
      editHeaderBtn.addEventListener('click', function() {
        console.log("clicked");
        editHeader();
      });
    },

    minimize: () => {
      minBtn.addEventListener('click', function() {
        console.log("clicked");
        minimize();
      });
    },

    deleteNote: () => { 
      delBtn.addEventListener('click', function() {
        console.log("clicked");
        deleteNote();
      });
    },

    bindEnterKeyHeaderEdit: () => {
      header.addEventListener('keyup', function (e) {
        console.log("typing");
        if (e.keyCode == 13) {
          event.preventDefault();
          editHeaderBtn.click();
        }
      });
    },

    hideNote: () => {
      noteDockListing.addEventListener('click', function() {
        hideNote();
      });
    }
  };
  noteEvents.createFolderMoveMenu();
  noteEvents.createAddToFolderMenu();
  noteEvents.dragElement();
  noteEvents.editHeader();
  noteEvents.minimize();
  noteEvents.deleteNote();
  noteEvents.bindEnterKeyHeaderEdit();
  noteEvents.hideNote();
  
  if (note.isMemo == true) { bindMemoEvents(note) }
  else { bindTodoListEvents(note) };
}


function bindMemoEvents(note) {

  var memoText = note.memoInput;
  var memoBtn = note.memoBtn;
  var memoEvents = {

      autosizeMemoInput: () => {
        var box_height;
        memoText.addEventListener('input', function (event) {
          box_height = autoExpand(event.target);
        });
      },

      saveMemo: () => {
        memoBtn.addEventListener('click', function() {
          console.log("Memo saved");
          saveMemo(getIdx(note), box_height);
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


function bindTodoListEvents(note) {

  var todoListEvents = {
    bindEnterKey: () => {
      note.taskInput.addEventListener('keyup', function (e) {
        if (e.keyCode == 13) {
          event.preventDefault();
          addBtn.click();
        }
      });
    },
    add: () => {
      note.addBtn.addEventListener('click', function() { add() });
    },
    undo: () => {
      note.undoBtn.addEventListener('click', function() { undo() });
    },
  };
  todoListEvents.bindEnterKey();
  todoListEvents.add();
  todoListEvents.undo();
};