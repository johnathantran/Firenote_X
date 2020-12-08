// hides a note from view by clicking on it in the Notes Dock
export function hideNote() {

    let elm = getElm(); 
    let idx = getIdx(elm);

    chrome.storage.sync.get([idx.toString()], function(result) {
   
      let dict = JSON.parse(result[idx]);
      let divToHide = document.querySelector('#mydiv' + idx);
      let allDivs = document.querySelectorAll(".drag");
  
      if (divToHide.style.display == "none") {
        console.log("Showing Note" + idx);
        divToHide.style.display = "block";
        
        // bring all the other notes behind the selected note
        for (let j=0; j<allDivs.length; j++) {
          allDivs[j].style.zIndex = "1";
        }
        divToHide.style.zIndex = "2";
        elm.style.color = "black";
  
        // check if dark mode was enabled by user
        if (dark_enabled == "enabled") {
          elm.style.color = "white";
        } 
        dict['hidden'] = false;
      }
      else {
        console.log("Hiding Note " + idx);
        // reset notes zIndexes
        for (let j=0; j<allDivs.length; j++) {
          allDivs[j].style.zIndex = "1";
        }
        divToHide.style.display = "none";
        elm.style.color = "silver";
        dict['hidden'] = true;
      }
      console.log(dict);
      storeSync(idx,dict);
      return;
    });
  }