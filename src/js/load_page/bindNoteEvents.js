import { bindMenuItems } from "./bindUI";

var header = note.childNodes[0];
var editHeaderBtn = note.childNodes[1];
var minBtn = note.childNodes[2];
var delBtn = note.childNodes[3];

export function bindHeaderContextMenu(note) {

  idx = getIdx(note);

  // add context menu when you right click on the note header to move to folder
  var setPosition2 = createContextMenu(document.querySelector(".folderAddMenu"));
  header.addEventListener("contextmenu", e => {
    
    move_select = document.getElementById("headerItem" + idx);
   
    e.preventDefault();
    const origin = {
      left: e.pageX,
      top: e.pageY
    };
    setPosition2(origin);
    return false;
  });


}

export function bindHeaderItems(idx) {

  var headerItem = document.querySelector('#headerItem' + idx);

  // drag note
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
}

export function bindNote(note) {

  if (note.childNodes[4].nodeName == 'TEXTAREA') {
    bindMemoNote(note);
  } else {
    bindListNote(note);
  }
}

export function bindMemoNote(note) {

  var idx = getIdx(note);
  var memoText = note.childNodes[4];
  var memoBtn = note.childNodes[6];

  // event listener for dynamic textarea sizing
  var box_height;
  memoText.addEventListener('input', function (event) {
    box_height = autoExpand(event.target);
  });

  memoBtn.addEventListener('click', function() {
    console.log("Memo saved");
    idx = getIdx(note);
    saveMemo(idx, box_height);
  });
  
  memoText.addEventListener('click', function() {
    if (memoText.value.length < 600) {
      document.getElementById('pending').textContent = "edit pending save.";
      document.getElementById('pending').style.opacity = "1";
    }
    memoBtn.style.display = "inline-block"; // show the save button
  });
  memoText.addEventListener('keyup', countCharacters, false);

}

export function bindListNote(note) {

    var taskInput = note.childNodes[4];
    var addBtn = note.childNodes[5];
    var undoBtn = note.childNodes[6];

    taskInput.addEventListener('keyup', function (e) {
      if (e.keyCode == 13) {
        event.preventDefault();
        addBtn.click();
      }
    });
    addBtn.addEventListener('click', function() {
      console.log("clicked");
      add();
    });
    undoBtn.addEventListener('click', function() {
      undo();
    });
}



/*
export function bindHeaderContextMenu

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
*/