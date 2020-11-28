// returns the closest ancestor which is a div in the body (aka the note container)
import { NoteClass } from '../render_notes/noteClass.js'

export function getNote(elm) {
    let noteContainer = elm.closest("body div");
    let idx = getIdx(noteContainer).toString();
    let isMemo = false;
    
    if (noteContainer.contains(document.getElementById("memo" + idx))) {
        isMemo = true;
    }

    let note = new NoteClass(noteContainer, null, idx, isMemo);
    return note;
}