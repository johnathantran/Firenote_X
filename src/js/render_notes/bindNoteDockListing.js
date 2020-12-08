 // add note header and event listener to Notes Dock
 export function bindNoteDockListing(noteHeader, idx) {

   let note_log = document.createElement('div');
   document.querySelector('#myNotes').appendChild(note_log);
   note_log.innerHTML += '<p class="headerList" id="headerItem' + idx + '">' + noteHeader + '</p>';
   
   let noteDockListing = document.getElementById("headerItem" + idx);

   // add a listener for the context menu for each note in the Notes Dock
   noteDockListing.addEventListener('contextmenu', e => {
      window.move_select = getElm();
      e.preventDefault();
   })
   
   return note_log;
}