import { getNote } from '../../submodules/getNote.js'
import { getElm } from '../../submodules/getElement.js'
import { storeSync } from '../../submodules/storeSync.js'

// save an edit to a list item in a todo list
export function saveListItemEdit() {
    
    let pending = document.querySelector("#pending");
    let elm = getElm();
    let listItem = elm.parentNode.childNodes[3];
    let task = listItem.textContent; // get the text of the edited note
    let note = getNote(elm);
    let idx = note.idx;

    chrome.storage.sync.get([idx.toString()], function(result) {
      
      let dict = JSON.parse(result[idx]);
      let todos;
      let note_idx;

      if (listItem.style.fontWeight == 'bold') {
        todos = dict['priority'];
        note_idx = getTodoItemIndex(todos);
        todos[note_idx] = task; // set the old note to the edited note
        dict['priority'] = todos;
      }
      else if (listItem.style.textDecoration == 'line-through') {
        todos = dict['strikethrough'];
        note_idx = getTodoItemIndex(todos);
        todos[note_idx] = task;
        dict['strikethrough'] = todos;
      }
      else {
        todos = dict['todo'];
        note_idx = todos.indexOf(window.originalListItem);
        todos[note_idx] = task;
        dict['todo'] = todos;
      }
      storeSync(idx,dict);
    
      let saveButton = elm.parentNode.childNodes[2];
      saveButton.style.display = "none";
      pending.textContent = "edit saved.";
      fade(pending);
      listItem.blur();
    });
}

// match the index of the edited list item to the original list item from storage
function getTodoItemIndex(todos) {
    console.log(todos);
    let note_idx = todos.indexOf(window.originalListItem);

    for (let j=0;j<=todos.length;j++){
  
        let todo_item = todos[j];

        if (Array.isArray(todo_item) == true) {
            todo_item = todos[j][0];
        }
        console.log(todo_item);
        if (todo_item == window.originalListItem) {
            note_idx = j;
            return note_idx;
        }
    }
}
