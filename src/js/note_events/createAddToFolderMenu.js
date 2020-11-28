// create a context menu to move a note to a certain folder by right-clicking
// the note dock listing
export function createAddToFolderMenu(note) {
    let setPositionAddToFolderMenu = createContextMenu(document.querySelector(".folderAddMenu"));
    let noteDockListing = document.querySelector('#headerItem' + note.idx);
    noteDockListing.addEventListener("contextmenu", e => {
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPositionAddToFolderMenu(origin);
        return false;
    });
}