import { getNote } from '../submodules/getNote.js'
import { getElm } from '../submodules/getElement.js'
import { storeSync } from '../submodules/storeSync.js'

// minimize a note leaving only the header
export function minimize() {
    
    let note = getNote(getElm());
    let idx = note.idx;
    let UIToHide = [];
    let elmToCheckHideStatus;

    if (note.isMemo == false) {
        UIToHide.push(note.taskInput, note.addBtn, note.undoBtn, note.todoList);
        elmToCheckHideStatus = note.taskInput;
    } else {
        UIToHide.push(note.memoInput, note.characterCount, note.memoBtn);
        elmToCheckHideStatus = note.memoInput;
    };
   
    chrome.storage.sync.get([idx.toString()], function(result) {
   
      let dict = JSON.parse(result[idx]);

      if (elmToCheckHideStatus.style.display == 'inline-block') {
        console.log("hiding");
        dict['minimized'] = true;
        try {
            for (let i=0; i < UIToHide.length; i++) {
                UIToHide[i].style.display = 'none';
            }
        }
        catch(err) { console.log(err) }; 
      }
      else {
        console.log("showing");
        dict['minimized'] = false; 
        try {
            for (let i=0; i < UIToHide.length; i++) {
                UIToHide[i].style.display = 'inline-block';
            }
        }
        catch(err) { console.log(err) };
      };
      storeSync(idx,dict);
    });
  }
  
  