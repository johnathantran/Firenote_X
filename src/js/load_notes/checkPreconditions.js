import { initNote } from './initNote.js'

export function checkPreconditions(memo) {
    console.log("adding note");
    
    var existing_notes = [];
    var first_empty_slot = 1;
  
    // detect which notes are currently on the screen
    var header_list = document.querySelectorAll(".dragHeader");
    var notes_on_screen = [];
    console.log(header_list);
  
    // 10 note limit
    var basic = true; // basic vs premium version of firenote app
    if ((header_list.length >= max_notes) && (basic == true)) {
      alert("You have reached the maximum " + max_notes + " note limit. Please delete a note to add more. (I am working on a premium version to allow more notes and other cool features!)");
      return;
    }
    if (header_list.length >= 20) {
      alert("You have reached the maximum 20 note limit! Please delete a note to add more.");
      return;
    }
    
    for (j = 0; j < header_list.length; j++) {
      var idx = getIdx(header_list[j]);
      console.log(idx);
      notes_on_screen.push(idx);
    }
    console.log(notes_on_screen);
  
    var slot_found = false;
    var all_idx = [];
    for (var j = 1; j <= header_list.length + 1; j++) {
      all_idx.push(j.toString());
    }
    console.log(all_idx);
  
    try {
      chrome.storage.sync.get(all_idx, function(result) {
  
        console.log(result);
  
        for (j=1; j <= header_list.length + 1; j++) {
          j = j.toString();
  
          try {
            var note_check = JSON.parse(result[j]);
            console.log(note_check);
          }
          catch(err){
            console.log(err);
            note_check = null;
          }
          // check if a note exists with the given key/index
          if (notes_on_screen.includes(j) == true) {
            existing_notes.push(j);
          }
          // if the note exists at that index (may not be on screen)
          else if ((note_check !== null) && (note_check !== "[]")) {
            existing_notes.push(j);
          }
          // break on first instance that an available slot is found
          else if ((note_check == undefined) || (note_check == null)) {
            console.log("breaking at " + j);
  
            if (slot_found == false) {
              first_empty_slot = j;
              slot_found = true;
            }
          };
        }
        console.log(j + note_check);
        console.log(first_empty_slot);
        console.log(existing_notes);
        idx = first_empty_slot.toString();

        var noteTemplate = {
          exists: false,
          idx: idx,
          isMemo: memo,
        };
        
        console.log(noteTemplate);
        return noteTemplate;
        
      });
    }
    catch(err) {
      console.log(err);
    }
  }