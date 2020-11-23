import { initNote } from './initNote.js'

export function loadNotes() {

    // check if user has enabled dark mode
    chrome.storage.sync.get(['firenote_dark'], function(result) {
  
      if (result['firenote_dark'] == true) {
        document.body.classList.toggle("dark-mode");
        var dark = assignColorMode("dark");
        dark_enabled.innerHTML = "enabled";
      }

      // recreate saved notes on page load
      var all_idx = [];
      for (var i = 1; i <= max_notes; i++) {
        all_idx.push(i.toString());
      }
  
      try {
        chrome.storage.sync.get(all_idx, function(noteObj) {
  
          for (var idx=1; idx <= max_notes; idx++) { // 20 for now
            idx = idx.toString();
            
            // check if a note exists with the given key/index
            try {
              console.log(noteObj[idx]);
              var parsedNoteObj = JSON.parse(noteObj[idx]);
              
              var isMemo = parsedNoteObj['isMemo'];
              var noteTemplate = {
                exists: true,
                idx: idx,
                isMemo: isMemo,
              }
              initNote(noteTemplate);    
              if (isMemo == false) {
                show(idx);
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

  