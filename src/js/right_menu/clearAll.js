// clears all notes from screen and from storage
export function clearAll() {
    let r = confirm("This will remove all of your notes and delete them from your cache. Are you sure you want to proceed?");
    if (r == true) {
  
      for (let j = 1; j <= max_notes; j++) {
        try {
          console.log("removing");
          console.log(document.querySelector('#mydiv' + j));
          document.querySelector('#mydiv' + j).remove();
          document.querySelector("#headerItem" + j.toString()).remove();
        }
        catch(err) {
          console.log(err);
        }
      }
      chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
      });
    }
  }
  