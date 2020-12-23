import { getIdx } from '../submodules/getIndex.js'
import { storeSync } from '../submodules/storeSync.js'

// hide all notes in a folder
export function hideFolder() {

    let move_select = window.move_select;
    console.log(move_select);
    let parent = move_select.closest("div");
    console.log(parent);
    let color = parent.id.replace('folder','');
    let target = document.getElementById("content" + color);
    let allDivs = document.querySelectorAll(".drag");
    let allIndexes = [];
  
    for (let j = 0; j < target.childNodes.length; j++) {
      let idx = getIdx(target.childNodes[j]);
      allIndexes.push(idx);
    }

    chrome.storage.sync.get(allIndexes, function(result) {
  
      console.log(target.childNodes)
      for (let i=0; i < target.childNodes.length; i++) {
        
        console.log(target.childNodes[i]);
        let idx = getIdx(target.childNodes[i]).toString();
        let dict = JSON.parse(result[idx]);
        let divToHide = document.querySelector('#mydiv' + idx);
        let header_item = document.getElementById("headerItem" + idx);
        
        // check if the note is currently hidden or not
        if (dict['hidden'] == true) {
          console.log("showing...");
          
          divToHide.style.display = "block";
          
          // bring all the other notes behind the selected note
          for (let j=0; j < allDivs.length; j++) {
            allDivs[j].style.zIndex = "1";
          }
          divToHide.style.zIndex = "2";
          
          // if dark
          header_item.style.color = "black";
          if (document.getElementById("darkEnabled").innerHTML == "enabled") {
            header_item.style.color = "white";
          }
          dict['hidden'] = false;
        }
        else {
          console.log("hiding...");

          // reset notes zIndexes
          for (let j=0; j < allDivs.length; j++) {
            allDivs[j].style.zIndex = "1";
          }
          divToHide.style.display = "none";
          header_item.style.color = "silver";
          dict['hidden'] = true;
        }
        storeSync(idx,dict); 
      }
    });
  }
  