import { initNote } from './initNote.js'
import { assignColorMode } from '../submodules/assignColorMode.js'
import { showList } from '../note_events/todo_list/showList.js'

export function queryNoteData() {

    // check if user has enabled dark mode
    chrome.storage.sync.get(['firenote_dark'], function(result) {
  
      if (result['firenote_dark'] == true) {
        document.body.classList.toggle("dark-mode");
        assignColorMode("dark");
        dark_enabled.innerHTML = "enabled";
      }

      // recreate saved notes on page load
      var all_idx = [];
      for (let i = 1; i <= max_notes; i++) {
        all_idx.push(i.toString());
      }
  
      try {
        chrome.storage.sync.get(all_idx, function(noteObj) {
  
          for (let idx=1; idx <= max_notes; idx++) {
            idx = idx.toString();
            
            // check if a note exists with the given key/index
            try {
              console.log(noteObj[idx]);
              let parsedNoteObj = JSON.parse(noteObj[idx]);
              let isMemo = parsedNoteObj['isMemo'];
              let noteTemplate = {
                exists: true,
                idx: idx,
                isMemo: isMemo,
              }
              initNote(noteTemplate);    
              if (isMemo == false) {
                showList(idx);
              }
            }
            catch (err) {
              console.log(err);
              continue;
            }
          }
        });
      }
      catch(err) {
        console.log(err);
      }
    });
};

  