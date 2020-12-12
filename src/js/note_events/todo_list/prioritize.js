import { getNote } from '../../submodules/getNote.js'
import { showList } from './showList.js';
import { storeSync } from '../../submodules/storeSync.js'

export function prioritize(elm) {

    let note = getNote(elm.parentNode);
    let list_item = elm.parentNode.childNodes[3];
    let idx = note.idx;
  
    // get id of the todo item we are trying to prioritize
    let id = elm.parentNode.childNodes[1].getAttribute('id');

    let crossed = true;
    if (list_item.style.textDecoration !== 'line-through') {
      crossed = false;
    }
    let prioritized = true;
    if (list_item.style.fontWeight !== 'bold') {
      prioritized = false;
    }

    if ((crossed == false) && (prioritized == false)) {
      console.log("regular todo");
      chrome.storage.sync.get([idx.toString()], function(result) {
        
        let dict = JSON.parse(result[idx]);
        let todos = dict['todo'];
        let targetItem = todos.splice(id, 1);
        dict['todo'] = todos;
        storeSync(idx,dict);
  
        // add removed item to the priority list
        let priority_list = dict['priority'];

        if (priority_list == undefined) {
          dict['priority'] = [targetItem];
        }
        else {
          priority_list.push(targetItem);
        }
        storeSync(idx,dict);
        showList(idx);
      });
    }
    // if prioritizing an item that was crossed off
    else if (crossed == true) {

      chrome.storage.sync.get([idx.toString()], function(result) {
 
        let dict = JSON.parse(result[idx]);
     
        // first remove the item from the strikethrough list
        let crossed = dict['strikethrough'];
        let targetItem = crossed.splice(id, 1);
        dict['strikethrough'] = crossed;
        storeSync(idx,dict)
  
        // add removed item back to the todos list
        let priority_list = dict['priority'];
        let task = targetItem[0];
  
        // if there is an actual list
        if (priority_list !== null) {

          // add the new task to the list of priorities for that note
          if (priority_list[priority_list.length - 1] != task) {
              priority_list.push(task);
          }
        }
        else {
          priority_list = [task];
        }
        storeSync(idx,dict)
        showList(idx);
      });
    }
    // if un-prioritizing an item
    else if (prioritized == true) {
      console.log("unprioritizing");
      chrome.storage.sync.get([idx.toString()], function(result) {
  
        let dict = JSON.parse(result[idx]);
  
        // first remove the item from the priority list
        let priority_list = dict['priority'];
        let targetItem = priority_list.splice(id, 1);
        dict['priority'] = priority_list;
        storeSync(idx,dict)
  
        // add removed item back to the todos list
        let todos = dict['todo'];
        let task = targetItem[0];
        
        function flatten(arr) {
          let flatArray = [];

          function pushLoop(a) {
            let len = a.length;
            for (let i=0; i < len; i++) {
              if (a[i] && a[i].constructor == Array) {
                pushLoop(a[i]);
              } else {
                flatArray.push(a[i]);
              }
            }
          }
          pushLoop(arr);
          return flatArray;
        }

        task = flatten(targetItem);
        if (Array.isArray(task) == true) { task = task[0]; }
        
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