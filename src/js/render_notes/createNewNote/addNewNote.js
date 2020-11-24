// workflow for creating a new list or a new memo
import { initNote } from '../initNote.js'

export function addNewNote(isMemo) {

    if (checkExceedMaxNotes()) { return };
  
    try {
      chrome.storage.sync.get(getAllExistingNoteIndexes(), function(result) {
        
        var firstAvailableNoteIndex = getFirstAvailableNoteIndex(result, isMemo);
        console.log(firstAvailableNoteIndex);

        var noteTemplate = {
            exists: false,
            idx: firstAvailableNoteIndex.toString(),
            isMemo: isMemo,
        };
        initNote(noteTemplate);  
      });
    }
    catch(err) {
      console.log(err);
    }
}


function getAllExistingNoteIndexes() {
  var all_idx = [];
  var header_list = document.querySelectorAll(".dragHeader");

  for (var j = 1; j <= header_list.length + 1; j++) {
    all_idx.push(j.toString());
  }
  console.log(all_idx);
  return all_idx;
}


function checkExceedMaxNotes() {

    var basic = true; // basic vs premium version of firenote app
    var header_list = document.querySelectorAll(".dragHeader");

    if ((header_list.length >= max_notes) && (basic == true)) {
      alert("You have reached the maximum " + max_notes + " note limit. Please delete a note to add more. (I am working on a premium version to allow more notes and other cool features!)");
      return false;
    }
    if (header_list.length >= max_notes) {
      alert("You have reached the maximum note limit! Please delete a note to add more.");
      return true;
    }
}

function getFirstAvailableNoteIndex(result) {

    var existing_notes = [];
    var first_empty_slot = 1;
    var slot_found = false;
    var header_list = document.querySelectorAll(".dragHeader");
    
    for (var j=1; j <= header_list.length + 1; j++) {
      j = j.toString();

      try {
        var noteFromStorage = JSON.parse(result[j]);
        console.log(noteFromStorage);
      }
      catch(err){
        console.log(err);
        noteFromStorage = null;
      }

      // if the note exists at that index
      if ((noteFromStorage !== null) && (noteFromStorage !== "[]")) {
        continue;
        existing_notes.push(j);
      }
      // break on first instance that an available slot is found
      else if ((noteFromStorage == undefined) || (noteFromStorage == null)) {
        console.log("breaking at " + j);

        if (slot_found == false) {
          first_empty_slot = j;
          slot_found = true;
        }
      };
    }

    console.log(j + noteFromStorage);
    return first_empty_slot;
}


