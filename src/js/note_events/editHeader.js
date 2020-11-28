import { getNote } from '../submodules/getNote.js'

// allows edit of the header of a note
export function editHeader() {
   
    let note = getNote(getElm());
    let header = note.header;
    let idx = note.idx;
    let pending = document.querySelector('#pending');

    if (header.readOnly == true) {
      header.readOnly = false;
      header.focus();
      let val = header.value;
      header.value = '';
      header.value = val;
      note.editHeaderBtn.src = "src/images/edit_active.png";
      pending.textContent = "edit pending save.";
      pending.style.opacity = "1";
    }
    else {
      note.editHeaderBtn.src = "src/images/edit.png";
      header.readOnly = true;
      header.blur();
      fade(pending);
      chrome.storage.sync.get([idx.toString()], function(result) {
        let dict = JSON.parse(result[idx]);
        dict['headerText'] = header.value;
        document.querySelector('#headerItem' + idx).textContent = header.value; // update note dock
        storeSync(idx,dict);
      });
    }
  }