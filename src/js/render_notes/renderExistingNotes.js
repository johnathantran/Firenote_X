import { bindNoteDockListing } from './bindNoteDockListing.js'
import { moveToFolder } from '../folder_system/moveToFolder.js'

export function renderExistingNotes(note) {
    console.log(note);
    var dict = JSON.parse(note.storageQuery[note.idx]);

    note.note.style.top = dict['posTop'];
    note.note.style.left = dict['posLeft'];
    //note.offsetHeight = dict['height'];
    //note.offsetWidth = dict['width'];
  
    if (dict['minimized'] == true) { renderMinimizedNote(note) };
  
    // adds the new note header to Notes Dock
    var note_header = dict['headerText'];
    note.header.value = note_header;
    let note_log = bindNoteDockListing(note_header, note.idx)

    // add the new note to the appropriate folder
    assignColorRenames(dict, note_log);
    console.log(note.note);

    if (dict['hidden'] == true) {
        note.note.style.display = 'none';
        document.querySelector('#headerItem' + note.idx).style.color = 'silver';
    }
    if (dict['isMemo'] == true) {
        console.log(dict['memo']);
        note.memoInput.value = dict['memo'];
        let textEntered = note.memoInput.value;
        note.characterCount.textContent = (600 - textEntered.length) + " characters left";
        // set the textarea to the saved height
        note.memoInput.style.height = dict['boxHeight'] + "px"; 
    }
  }
  
  function renderMinimizedNote(note) {
    try {
      note.taskInput.style.display = 'none';
      note.addBtn.style.display = 'none';
      note.undoBtn.style.display = 'none';
      note.todoList.style.display = 'none';
    }
    catch(err){
      note.memoInput.style.display = 'none';
      note.characterCount.style.display = 'none';
      note.memoBtn.style.display = 'none';
    };
  }

  // add the new note to the appropriate folder
  function assignColorRenames(dict, note_log) {
    
    let color = dict['folderColor'];
  
    // Yellow is the default color option
    if ((color !== "Yellow") && (color !== undefined)) {

        moveToFolder(color, note_log.childNodes[0]);
  
        chrome.storage.sync.get(['folderNames'], function(result) {
        try {
            let folderNames = result['folderNames'];
            let newFolderName = color;
            if (folderNames[color] !== undefined) {
                newFolderName = folderNames[color];
            }
            document.getElementById("input" + color).value = newFolderName;
            document.getElementById("option" + color).innerHTML = newFolderName;
        }
        catch(err) {}
        });
    }
  }
  