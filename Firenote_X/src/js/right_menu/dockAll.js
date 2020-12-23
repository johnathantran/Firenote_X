import { storeSync } from '../submodules/storeSync.js'

// hide all notes
export function dockAll() {

    // recreate saved notes on page load
    let allIdx = [];
    for (let i = 1; i <= max_notes; i++) {
      allIdx.push(i.toString());
    }
  
    chrome.storage.sync.get(allIdx, function(result) {
      console.log(result);

      // check if all elements are hidden
      let allHidden = true;
      for (let i = 1; i <= max_notes; i++) {
        
        if (result[i] == undefined) { continue; }
  
        let dict = JSON.parse(result[i]);
        if (dict['hidden'] == false) {
          allHidden = false;
          break;
        }
      }
  
      for (let i = 1; i <= max_notes; i++) {
   
        if (result[i] == undefined) { continue; }
        let dict = JSON.parse(result[i]);
        let divToHide = document.querySelector('#mydiv' + i.toString());
  
        // reveal all notes if they are all hidden
        if (allHidden == true) {
          
          dict['hidden'] = false;
          divToHide.style.display = "block";
          document.querySelector('#headerItem' + i).style.color = "rgb(95, 95, 95)";

          // change notes dock colors
          if (document.getElementById('toggleDarkMode').style.color == '#fcd488') {
            document.querySelector('#headerItem' + i).style.color = "white";
          }
        }
        // else hide the notes that are showing
        else {
          dict['hidden'] = true;
          divToHide.style.display = "none";
          document.querySelector('#headerItem' + i).style.color = "silver";
        }
        storeSync(i,dict);
      }
    });
  }
  
  