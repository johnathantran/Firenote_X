import { getIdx } from '../submodules/getIndex.js'

// deletes all notes in a chosen folder
export function deleteFolder() {
    let move_select = window.move_select;
    let parent = move_select.closest('div');
    move_select = parent.querySelector('.folderHeader');

    let r = confirm("Are you sure you want to delete the folder " + move_select.value + "?");
    if (r== false) { return; }
    
    let color = parent.id.replace('folder','');
    let target = document.getElementById("content" + color);
    let notes_to_delete = [];
  
    for (let i=0; i < target.childNodes.length; i++) {
      let idx = getIdx(target.childNodes[i]);
      notes_to_delete.push(idx);
    }
  
    // remove all notes within the folder
    for (let i=0; i < notes_to_delete.length; i++) {
      let idx = notes_to_delete[i];
      document.getElementById('mydiv' + idx).remove();
      document.querySelector("#headerItem" + idx.toString()).remove();
      chrome.storage.sync.remove(idx.toString());
      chrome.storage.sync.remove(color);

      // for debugging purposes (removes all folder names):
      //chrome.storage.sync.remove("folderNames");
    }
    document.getElementById('folder' + color).style.display = "none";
  }
  