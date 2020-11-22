// creates notes when the page is loaded (note exists), or when the Add Note button is clicked (note does not exist yet)
function createNote(exists,idx,memo) {

    idx = idx.toString();
  
    //var note_header = 'Note ' + idx;
    chrome.storage.sync.get([idx], function(result) {
  
      var note = document.createElement('div');
      note.id = "mydiv" + idx;
      document.body.appendChild(note);
      note.classList.add('drag');
  
      note.innerHTML += '<input class="dragHeader" maxlength="30" readOnly="true" id="mydiv' + idx + 'header" value="Note ' + idx +'">';
      note.innerHTML += '<img src="images/edit.png" class="editHeader" id="edit">';
      note.innerHTML += '<img src="images/minimize.png" class="minimize" id="minimize">';
      note.innerHTML += '<img src="images/exit.png" class="deleteNote" id="exit"></img>';
  
      if (memo == true) {
        note.innerHTML += '<textarea placeholder="Type a memo here..." maxlength="600" class="memo" rows="8" spellcheck="false" id="memo' + idx +'" style="display:inline-block;"></textarea>';
        note.innerHTML += '<p class="memoCounter" id="memoCounter' + idx + '">Max 600 characters</p>';
        note.innerHTML += '<button class="saveMemo">Save Memo</button>';
      }
      else {
        note.innerHTML += '<input maxlength="250" class="task" placeholder="Add an item" id="task' + idx + '" style="display:inline-block;"><img src="images/add.png" id="add" class="add">';
        note.innerHTML += '<img class="undo" id="undo' + idx + '" src="images/undo.png">';
        note.innerHTML += '<div class="todoLists" id="todos' + idx + '"></div>';
      }
  
      // IF LOADING EXISTING NOTES
      if (exists == true) {
       
        dict = JSON.parse(result[idx]);
        note.style.top = dict['posTop'];
        note.style.left = dict['posLeft'];
  
        //note.offsetHeight = dict['height'];
        //note.offsetWidth = dict['width'];
        var note_header = dict['headerText'];
        note.childNodes[0].value = note_header;
  
        // check if the note is minimized
        if (dict['minimized'] == true) {
          note.childNodes[4].style.display = 'none';
          note.childNodes[5].style.display = 'none';
          note.childNodes[6].style.display = 'none';
          try {
            note.childNodes[7].style.display = 'none';
          }
          catch(err){};
        }
        // adds the new note header to Notes Dock
        var color = dict['folderColor'];
        var note_log = document.createElement('div');
        document.querySelector('#myNotes').appendChild(note_log);
        note_log.innerHTML += '<p class="headerList" id="headerItem' + idx + '">' + note_header + '</p>';
  
        // add the new note to the appropriate folder
        if ((color !== "Yellow") && (color !== undefined)) {
    
          moveToFolder(color,note_log.childNodes[0]);
  
          chrome.storage.sync.get(['folderNames'], function(result) {
            try {
              var folderNames = result['folderNames'];
              var rename = color;
              if (folderNames[color] !== undefined) {
                var rename = folderNames[color];
              }
              document.getElementById("input" + color).value = rename;
              document.getElementById("option" + color).innerHTML = rename;
            }
            catch(err) {}
          });
        }
  
        // check if the note is hidden
        if (dict['hidden'] == true) {
          note.style.display = 'none';
          document.querySelector('#headerItem' + idx).style.color = 'silver';
        }
  
        // if note is a memo, query saved text
        if (memo == true) {
          note.childNodes[4].value = dict['memo'];
          textEntered = note.childNodes[4].value;
          note.childNodes[5].textContent = (600 - textEntered.length) + " characters left";
          // set the textarea to the saved height
          note.childNodes[4].style.height = dict['boxHeight'] + "px"; 
        }
  
      addNoteEventHandlersOnLoad();
      }
      // ****************************************************************
      // IF ADDING A NEW NOTE
      // ****************************************************************
      else {
        var note_header = "Note " + idx;
        console.log(idx);
        // spawn note in center of screen
        note.style.top = ($(window).scrollTop() + $(window).height() / 2) + "px";
        note.style.left = ($(window).scrollTop() + $(window).width() / 2) - (note.offsetWidth / 2) + "px";
  
        // create new note in local storage as empty list
        var dict = {
          'todo': null, // list of todo items
          'headerText': note_header, 
          'minimized': false, 
          'posTop': note.style.top, 
          'posLeft': note.style.left,
          'hidden': false,
          'isMemo': memo,
          'memo': null,
        };
        console.log("Creating item: " + idx);
  
        storeSync(idx,dict);
  
        // adds the new note header to Notes Dock
        var note_log = document.createElement('div');
        console.log(note_log);
        document.querySelector('#myNotes').appendChild(note_log);
        note_log.innerHTML += '<p class="headerList" id="headerItem' + idx + '">' + note_header + '</p>';
  
        // check if the note is hidden
        if (dict['hidden'] == true) {
          note.style.display = 'none';
          document.querySelector('#headerItem' + idx).style.color = 'silver';
        }
        addNoteEventHandlers(note);
      } 
    });
  };