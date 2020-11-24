
import { bindNoteEvents } from '../createNewNote/bindNoteEvents.js'
// adds event listeners when page loads
attachedListeners = false;
export function bindNoteEventsOnLoad() {
  
  chrome.storage.sync.get(['haveListeners'], function(result) {
    
    if (attachedListeners == true) { return; }

    var all_notes = (document.querySelectorAll('.drag'));
    for (var i=0; i < all_notes.length; i++) {
      bindNoteEvents(all_notes[i]);
    }
    console.log("Adding listeners...");
    storeSync('haveListeners',true);
    attachedListeners = true;
    /*
    chrome.browserAction.onClicked.addListener(function() {
      chrome.tabs.create({'url':"chrome://newtab"});
    });
    */
  });
}