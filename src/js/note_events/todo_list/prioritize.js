import { getNote } from '../../submodules/getNote.js'
import { showList } from './showList.js';

export function prioritize(elm) {

    //let parent = elm.parentNode.parentNode.parentNode;
    let note = getNote(elm.parentNode);
    console.log(note);

    let list_item = elm.parentNode.childNodes[3];
  
    let idx = note.idx;
  
    // get id of the todo item we are trying to prioritize
    let id = elm.parentNode.childNodes[1].getAttribute('id');
  
    // determine if the todo item is crossed out or not
    let crossed = true;
    if (list_item.style.textDecoration !== 'line-through') {
      crossed = false;
    }
    // determine if the todo item is bold (already prioritized) or not
    let prioritized = true;
    if (list_item.style.fontWeight !== 'bold') {
      prioritized = false;
    }
    // regular todo item
    if ((crossed == false) && (prioritized == false)) {
      console.log("regular todo");
      chrome.storage.sync.get([idx.toString()], function(result) {
        
        let dict = JSON.parse(result[idx]);
  
        let todos = dict['todo'];
        console.log(todos);
  
        let removed_item = todos.splice(id, 1);
        console.log(removed_item);
  
        console.log("Currently in todos: " + todos);
  
        dict['todo'] = todos;
        storeSync(idx,dict);
  
        // add removed item to the priority list
        let priority_list = dict['priority'];
  
        if (priority_list == undefined) {
          dict['priority'] = [removed_item];
        }
        else {
          priority_list.push(removed_item);
        }
        storeSync(idx,dict);
        console.log(dict);
        showList(idx);
      });
    }
    // if prioritizing an item that was crossed off
    else if (crossed == true) {
      console.log("crossed out");
      chrome.storage.sync.get([idx.toString()], function(result) {
        console.log(result);
        console.log(result[idx]);
        let dict = JSON.parse(result[idx]);
        console.log(dict);
        console.log(dict['todo'])
  
        // first remove the item from the strikethrough list
        let crossed = dict['strikethrough'];
        let removed_item = crossed.splice(id, 1);
        dict['strikethrough'] = crossed;
        storeSync(idx,dict)
  
        // add removed item back to the todos list
        // get the current list of todos for that note
        let priority_list = dict['priority'];
        let task = removed_item[0];
  
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
        let removed_item = priority_list.splice(id, 1);
        dict['priority'] = priority_list;
        storeSync(idx,dict)
  
        // add removed item back to the todos list
        // get the current list of todos for that note
        let todos = dict['todo'];
        let task = removed_item[0];
        
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
        task = flatten(removed_item);
        if(Array.isArray(task) == true) { task = task[0]; }
        
        // if there is an actual list
        if (todos !== null) {
          // add the new task to the list of todos for that note
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