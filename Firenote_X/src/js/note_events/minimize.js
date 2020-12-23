import { getNote } from '../submodules/getNote.js'
import { getElm } from '../submodules/getElement.js'
import { storeSync } from '../submodules/storeSync.js'

// minimize a note leaving only the header

export function minimize() {

    console.log("test");
    
    let note = getNote(getElm());
    let idx = note.idx;
    let minimized;
    console.log("minimizing");
    console.log(note);
    let elmToCheckHideStatus;
    
    if (note.isMemo == false) {
      elmToCheckHideStatus = note.taskInput;
      console.log("todo");
    }
    else { 
      elmToCheckHideStatus = note.memoInput;
      console.log("memo");
    }
    console.log(elmToCheckHideStatus);
    let display = 'inline-block';
    if (elmToCheckHideStatus.style.display == 'inline-block') {
      display = 'none';
    }

    if (note.isMemo == true) {
      minimized = setMemoDisplay(note, display);
    }
    else {
      minimized = setTodoListDisplay(note, display);
    }
    
    chrome.storage.sync.get([idx.toString()], function(result) {
      let dict = JSON.parse(result[idx]);
      dict['minimized'] = minimized;
      storeSync(idx,dict);
    });
    
  }

function setTodoListDisplay(note,display) {
  note.taskInput.style.display = display;
  note.addBtn.style.display = display;
  note.undoBtn.style.display = display;
  note.todoList.style.display = display;

  if (display == 'inline-block') {
    return false;
  }
  else {
    return true;
  }
}

function setMemoDisplay(note,display) {
  note.memoInput.style.display = display;
  note.characterCount.style.display = display;
  note.memoBtn.style.display = display;

  if (display == 'inline-block') {
    return false;
  }
  else {
    return true;
  }
}
