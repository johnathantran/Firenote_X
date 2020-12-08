import { getNote } from '../../submodules/getNote.js'
import { showList } from './showList.js';

// remove an item from a todo list
export function remove(elm) {

    let note = getNote(elm);
    let idx = note.idx;
    let id = elm.getAttribute('id');
  
    chrome.storage.sync.get([idx.toString()], function(result) {
  
      let dict = JSON.parse(result[idx]);
      let todos = dict['todo'];
      let strikethroughList = dict['strikethrough'];
      let priorityList = dict['priority'];
      var list_item = elm.parentNode.childNodes[3];
      let removedItem;

      // determine if the todo item is crossed out, priority, or regular
      if (list_item.style.textDecoration == 'line-through') {
        removedItem = strikethroughList.splice(id, 1);
        dict['strikethrough'] = strikethroughList;
      }
      else if (list_item.style.fontWeight == 'bold') {
        removedItem = priorityList.splice(id, 1);
        dict['priority'] = priorityList;
      }
      else {
        removedItem = todos.splice(id, 1);
        dict['todo'] = todos;
      }
      dict['removed'] = removedItem;
      storeSync(idx,dict);
      showList(idx);
    });
  }