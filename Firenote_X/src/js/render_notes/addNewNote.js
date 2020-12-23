// workflow for creating a new list or a new memo
import { initNote } from './initNote.js'

export function addNewNote(isMemo) {

    if (checkExceedMaxNotes()) { return };
  
    try {
      chrome.storage.sync.get(getAllExistingNoteIndexes(), function(result) {
        
        let firstAvailableNoteIndex = getFirstAvailableNoteIndex(result, isMemo);
        console.log(firstAvailableNoteIndex);

        let noteTemplate = {
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
  let header_list = document.querySelectorAll(".dragHeader");

  for (let j = 1; j <= header_list.length + 1; j++) {
    all_idx.push(j.toString());
  }
  console.log(all_idx);
  return all_idx;
}


function checkExceedMaxNotes() {

    var basic = true; // basic vs premium version of firenote app
    let header_list = document.querySelectorAll(".dragHeader");

    if ((header_list.length >= window.max_notes) && (basic == true)) {
      alert("You have reached the maximum " + window.max_notes + " note limit. Please delete a note to add more. (I am working on a premium version to allow more notes and other cool features!)");
      return false;
    }
    if (header_list.length >= window.max_notes) {
      alert("You have reached the maximum note limit! Please delete a note to add more.");
      return true;
    }
}

function getFirstAvailableNoteIndex(result) {

    let existing_notes = [];
    var first_empty_slot = 1;
    var slot_found = false;
    let header_list = document.querySelectorAll(".dragHeader");
    
    for (let j=1; j <= header_list.length + 1; j++) {
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
    return first_empty_slot;
}


