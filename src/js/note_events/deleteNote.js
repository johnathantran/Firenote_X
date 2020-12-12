import { getNote } from '../submodules/getNote.js'
import { getElm } from '../submodules/getElement.js'

// deletes a note from UI and from storage
export function deleteNote() {

    let elm = getElm();
    console.log(elm);
    let note = getNote(elm);
    console.log(note);
    let idx = note.idx;
    var header = note.header.value;

    var r = confirm("Are you sure you want to delete " + header + "?");
    if (r== false) { return };

    note.note.remove();
    document.querySelector("#headerItem" + idx.toString()).remove();
    chrome.storage.sync.remove(idx.toString());
}