import { getNote } from '../../submodules/getNote.js'
import { showList } from './showList.js';
import { storeSync } from '../../submodules/storeSync.js'

// move an item up or down a todo list
export function moveItem(elm, direction) {

    let note = getNote(elm);
    let idx = note.idx;
    let isCrossed = false;
    let targetItem = elm.innerHTML;
    if (elm.style.textDecoration == 'line-through') {
        isCrossed = true;
    }
  
    chrome.storage.sync.get([idx.toString()], function(result) {
      let dict = JSON.parse(result[idx]);
      let todos = dict['todo'];

      if (elm.style.fontWeight == 'bold') {
        todos = [].concat.apply([], dict['priority']);
      }
      if (isCrossed == true) {
        todos = [].concat.apply([], dict['strikethrough']);
      }
  
      let startIdx = todos.indexOf(targetItem);
      let endIdx;

      if (direction == "down") {
        endIdx = startIdx + 1;
        if (endIdx >= todos.length) { return; }
      }
      else {
        endIdx = startIdx - 1;
        if (endIdx < 0) { return; }
      }
  
      // moves the item to the new index
      function arraymove(arr, fromIndex, toIndex) {
        let element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      }
      arraymove(todos, startIdx, endIdx);
  
      if (isCrossed == true) {
        dict['strikethrough'] = todos;
      }
      else if (elm.style.fontWeight == 'bold'){
        dict['priority'] = todos;
      }
      else {
        dict['todo'] = todos;
      }
      storeSync(idx,dict);
      showList(idx);
    });
  }
  