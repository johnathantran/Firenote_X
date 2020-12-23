import { getNote } from '../../submodules/getNote.js'
import { getElm } from '../../submodules/getElement.js'

// dynamically change number of characters remaining in memo
export function countCharacters(e) {    
    let note = getNote(getElm());
    let counter = (600 - (note.memoInput.value.length));
    note.characterCount.textContent = counter + " characters left";       
  }