export function renderExistingNotes(note) {
   
    var dict = JSON.parse(note.storageQuery[note.idx]);

    note.note.style.top = dict['posTop'];
    note.note.style.left = dict['posLeft'];
    //note.offsetHeight = dict['height'];
    //note.offsetWidth = dict['width'];
    
  
    // check if the note is minimized
    if (dict['minimized'] == true) { renderMinimizedNote(note) };
  
    // adds the new note header to Notes Dock
    var note_log = renderDockHeader(note, dict, note.idx);
  
    // add the new note to the appropriate folder
    assignColorRenames(dict, note_log);
  
    // check if the note is hidden
    if (dict['hidden'] == true) {
        note.style.display = 'none';
        document.querySelector('#headerItem' + note.idx).style.color = 'silver';
    }
  
    // if note is a memo, query saved text
    // instead of if memo == true
    if (dict['isMemo'] == true) {
        note.memoInput.value = dict['memo'];
        var textEntered = note.memoInput.value;
        note.characterCount.textContent = (600 - textEntered.length) + " characters left";
        // set the textarea to the saved height
        note.memoInput.style.height = dict['boxHeight'] + "px"; 
    }
  }
  
  
  function renderMinimizedNote(note) {
    note.memoInput.style.display = 'none';
    note.characterCount.style.display = 'none';
    note.memoBtn.style.display = 'none';
    try {
        note.todoList.style.display = 'none';
    }
    catch(err){};
  }
  

  function renderDockHeader(note, dict, idx) {
    var note_header = dict['headerText'];
    note.header.value = note_header;
    var note_log = document.createElement('div');
    document.querySelector('#myNotes').appendChild(note_log);
    note_log.innerHTML += '<p class="headerList" id="headerItem' + note.idx + '">' + note_header + '</p>';
    return note_log;
  }
  

  //add the new note to the appropriate folder
  function assignColorRenames(dict, note_log) {
    
    var color = dict['folderColor'];
  
    // Yellow is the default color option
    if ((color !== "Yellow") && (color !== undefined)) {
  
        moveToFolder(color,note_log.childNodes[0]);
  
        chrome.storage.sync.get(['folderNames'], function(result) {
        try {
            var folderNames = result['folderNames'];
            var newFolderName = color;
            if (folderNames[color] !== undefined) {
                var newFolderName = folderNames[color];
            }
            document.getElementById("input" + color).value = newFolderName;
            document.getElementById("option" + color).innerHTML = newFolderName;
        }
        catch(err) {}
        });
    }
  }
  