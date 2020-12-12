import { getNote } from '../../submodules/getNote.js'
import { showList } from './showList.js'
import { getElm } from '../../submodules/getElement.js'
import { storeSync } from '../../submodules/storeSync.js'

// strike through a todo list item
export function strikeThrough(elm) {

    let note = getNote(elm);
    let idx = note.idx;
    let listItemContainer = getElm();
    let id = listItemContainer.parentNode.childNodes[1].getAttribute('id');
    let listItem = listItemContainer.parentNode.childNodes[3];
    let isCrossedOut = true;
    if (listItem.style.textDecoration !== 'line-through') {
      isCrossedOut = false;
    }
  
    if (isCrossedOut == false) {
      
      chrome.storage.sync.get([idx.toString()], function(result) {
        
        let dict = JSON.parse(result[idx]);
        let todos = dict['todo'];
        let priorityList = dict['priority'];
        let targetItem;

        // remove item from the appropriate list
        if (listItem.style.fontWeight == 'bold') {
          targetItem = priorityList.splice(id, 1);
          dict['priority'] = priorityList;
        }
        else {
          targetItem = todos.splice(id, 1);
          dict['todo'] = todos;
        }
   
        storeSync(idx,dict);
  
        let strikeList = dict['strikethrough'];
        if (strikeList == undefined) {
          dict['strikethrough'] = [targetItem];
        }
        else {
          strikeList.push(targetItem);
        }

        storeSync(idx,dict);
        console.log(dict);
        showList(idx);
      });
    }
    // if reinstating an item that was crossed off
    else {
      chrome.storage.sync.get([idx.toString()], function(result) {
  
        let dict = JSON.parse(result[idx]);
        let crossed = dict['strikethrough'];
        let targetItem = crossed.splice(id, 1);
        dict['strikethrough'] = crossed;
        storeSync(idx,dict)
  
        // add removed item back to the todos list
        let todos = dict['todo'];
        let task = targetItem[0];
        if (todos !== null) {
          if (todos[todos.length - 1] != task) {
              todos.push(task);
          }
        }
        else {
          todos = [task];
        }
        storeSync(idx,dict)
        showList(idx);
      });
    }
  }
  