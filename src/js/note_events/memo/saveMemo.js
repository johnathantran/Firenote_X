import { getNote } from '../../submodules/getNote.js'

// save memo to storage
export function saveMemo(box_height) {
    
    let note = getNote(getElm());

    console.log(box_height); // how many pixels tall the textarea is
    
    let memo_text = note.memoInput;
    let memoBtn = note.memoBtn;
    let idx = note.idx;
    console.log(memo_text.value);

    let pending = document.querySelector("#pending");
    pending.textContent = "edit saved.";
    pending.style.opacity = "1";
    fade(pending);
    memoBtn.style.display = "none"; //show the save button
    console.log(idx);
  
    chrome.storage.sync.get([idx.toString()], function(result) {
  
      let dict = JSON.parse(result[idx]);
      console.log(dict);
      //memo_text_new = memo_text.value.replace(/\r\n|\r|\n/g,"</br>");
      dict['memo'] = memo_text.value;
      dict['boxHeight'] = box_height;
      console.log(dict)
      storeSync(idx,dict);
    });
  }