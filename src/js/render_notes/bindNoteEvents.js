export function bindMemoEvents(note) {

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


export function bindTodoListEvents(note) {

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


export function bindNoteEvents(note) {

    var idx = note.idx;
    var header = note.header;
    var editHeaderBtn = note.editHeaderBtn;
    var minBtn = note.minBtn;
    var delBtn = note.delBtn;
    
    var noteEvents = {
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

    }
    console.log(note.idx);

    // add context menu when you right click on the note header to move to folder
    var setPositionMoveToFolderMenu = createContextMenu(document.querySelector(".folderAddMenu"));
    header.addEventListener("contextmenu", e => {
      console.log(idx);
      move_select = document.getElementById("headerItem" + idx);
      console.log(move_select);
      e.preventDefault();
      const origin = {
        left: e.pageX,
        top: e.pageY
      };
      setPositionMoveToFolderMenu(origin);
      return false;
    });
    
    console.log(note.isMemo);
    if (note.isMemo == true) { bindMemoEvents(note) }
    else { bindTodoListEvents(note) };
  
    var headerItem = document.querySelector('#headerItem' + idx);
  
    header.addEventListener('mousedown', function() {
      console.log("clicked");
      dragElement();
    });
    editHeaderBtn.addEventListener('click', function() {
      console.log("clicked");
      editHeader();
    });
    minBtn.addEventListener('click', function() {
      console.log("clicked");
      minimize();
    });
    delBtn.addEventListener('click', function() {
      console.log("clicked");
      deleteNote();
    });
    header.addEventListener('keyup', function (e) {
      console.log("typing");
      if (e.keyCode == 13) {
        event.preventDefault();
        editHeaderBtn.click();
      }
    });
    headerItem.addEventListener('click', function() {
      hideNote();
    });
  
    // context menu for add to folder
    var setPosition = createContextMenu(document.querySelector(".folderAddMenu"));
    headerItem.addEventListener("contextmenu", e => {
      move_select = getElm();
      console.log(move_select);
      e.preventDefault();
      const origin = {
        left: e.pageX,
        top: e.pageY
      };
      setPosition(origin);
      return false;
    });
  }