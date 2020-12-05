import { getNote } from '../../submodules/getNote.js'

// recovers the most recent deleted todo list item
export function undo(elm) {
    let note = getNote(elm);
  
    chrome.storage.sync.get([note.idx.toString()], function(result) {

      dict = JSON.parse(result[note.idx]);
      console.log(dict['removed']);
      if (dict['removed'] == undefined) {
        dict['removed'] = "";
        let pending = document.getElementById('pending');
        pending.textContent = "no item found to undo.";
        pending.style.opacity = "1";
      }
      note.taskInput.value = dict['removed'];
      note.addBtn.click();
    });
  }