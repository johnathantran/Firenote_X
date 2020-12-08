import { fade } from '../submodules/fade.js'

export function saveFolderRename(rename) {
    let move_select = window.move_select;
    let parent = move_select.closest("div");
    console.log(parent);
    let color = parent.id.replace('folder','');
    color = color.replace(/\\/g, '');
    
    chrome.storage.sync.get(["folderNames"], function(result) {
  
      let folderNames = result['folderNames'];
      try {
        folderNames[color] = rename;
      }
      catch(err) {
        result['folderNames'] = {};
        folderNames = result['folderNames'];
        folderNames[color] = rename;
      }
  
      let contextMenuSelect = document.getElementById("option" + color);
      contextMenuSelect.innerHTML = rename;
  
      chrome.storage.sync.set({'folderNames' : folderNames}, function() {
        move_select.blur();
        move_select.readOnly = true;
        document.querySelector("#pending").textContent = "folder renamed.";
        fade(document.querySelector("#pending"));
      });
    });
  }