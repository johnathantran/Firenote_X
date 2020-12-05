export function prioritize(move_select) {

    var parent = move_select.parentNode.parentNode.parentNode;
    var list_item = move_select.parentNode.childNodes[3];
  
    // get the index of div element
    idx = getIdx(parent);
  
    // get id of the todo item we are trying to prioritize
    var id = move_select.parentNode.childNodes[1].getAttribute('id');
  
    // determine if the todo item is crossed out or not
    var crossed = true;
    if (list_item.style.textDecoration !== 'line-through') {
      crossed = false;
    }
    // determine if the todo item is bold (already prioritized) or not
    var prioritized = true;
    if (list_item.style.fontWeight !== 'bold') {
      prioritized = false;
    }
    // regular todo item
    if ((crossed == false) && (prioritized == false)) {
      console.log("regular todo");
      chrome.storage.sync.get([idx.toString()], function(result) {
        
        dict = JSON.parse(result[idx]);
  
        var todos = dict['todo'];
        console.log(todos);
  
        var removed_item = todos.splice(id, 1);
        console.log(removed_item);
  
        console.log("Currently in todos: " + todos);
  
        dict['todo'] = todos;
        storeSync(idx,dict);
  
        // add removed item to the priority list
        var priority_list = dict['priority'];
  
        if (priority_list == undefined) {
          dict['priority'] = [removed_item];
        }
        else {
          priority_list.push(removed_item);
        }
        storeSync(idx,dict);
        console.log(dict);
        show(idx);
      });
    }
    // if prioritizing an item that was crossed off
    else if (crossed == true) {
      console.log("crossed out");
      chrome.storage.sync.get([idx.toString()], function(result) {
        console.log(result);
        console.log(result[idx]);
        dict = JSON.parse(result[idx]);
        console.log(dict);
        console.log(dict['todo'])
  
        // first remove the item from the strikethrough list
        var crossed = dict['strikethrough'];
        var removed_item = crossed.splice(id, 1);
        dict['strikethrough'] = crossed;
        storeSync(idx,dict)
  
        // add removed item back to the todos list
        // get the current list of todos for that note
        var priority_list = dict['priority'];
        var task = removed_item[0];
  
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
        show(idx);
      });
    }
    // if un-prioritizing an item
    else if (prioritized == true) {
      console.log("unprioritizing");
      chrome.storage.sync.get([idx.toString()], function(result) {
  
        dict = JSON.parse(result[idx]);
  
        // first remove the item from the priority list
        var priority_list = dict['priority'];
        var removed_item = priority_list.splice(id, 1);
        dict['priority'] = priority_list;
        storeSync(idx,dict)
  
        // add removed item back to the todos list
        // get the current list of todos for that note
        var todos = dict['todo'];
        var task = removed_item[0];
        
        function flatten(arr) {
          let flatArray = [];
          function pushLoop(a) {
            let len = a.length;
            for (i=0; i < len; i++) {
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
        show(idx);
      });
    }
  }