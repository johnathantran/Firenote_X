import { getNote } from '../../submodules/getNote.js'
import { showList } from './showList.js'

// add a new todo list item to an existing list
export function add(elm) {

    let note = getNote(elm);
    let idx = note.idx;
    let todoList = new Array;

    if (note.taskInput.value == "") {
      return;
    }
    var task = note.taskInput.value;
  
    // get the current list of todos for that note
    chrome.storage.sync.get([idx], function(result) {
      let dict = JSON.parse(result[idx]);
      let loadedTodoList = dict['todo'];
      console.log(loadedTodoList);
  
      // if there is an actual list
      if (loadedTodoList !== null) {
  
        // add the new task to the list of todos for that note
        todoList = loadedTodoList;
        console.log(todoList);
        if (todoList[todoList.length - 1] != task) {
            todoList.push(task);
        }
      }
      else {
        todoList = [task];
        console.log(todoList);
      }
      dict['todo'] = (todoList);
      console.log(dict['todo']);
      storeSync(idx,dict);
      console.log(dict);
      showList(idx);
  
      note.taskInput.value = "";
    });
  }