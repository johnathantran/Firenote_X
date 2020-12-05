import { bindTodoListEvents } from './bindTodoListEvents.js'

export function showList(idx) {

    chrome.storage.sync.get([idx.toString()], function(result) {
  
      let dict = JSON.parse(result[idx]);
      let todos_list = dict['todo'];
      let crossed_list = dict['strikethrough'];
      let priority_list = dict['priority'];
  
      //console.log("Currently in the priority list: " + priority_list);
      //console.log("Currently in this todo list:" + todos_list + "!");
      //console.log("Currently in the crossed list: " + crossed_list);
  
      let html = '<ul>';
      // if list of priorities is found, show on screen
      if (priority_list !== undefined) {
        for(let i=0; i<priority_list.length; i++) {
          html += '<li class="lists">';
          html += '<img class="check" src="src/images/check.png">';
          html += '<img class="crossoff" src="src/images/crossoff.png" id="' + i  + '">';
          html += '<img src="src/images/save.png" style="display:none;" class="save"></img>';
          html += '<span style="font-weight:bold; color:black;" type="text" class="span">' + priority_list[i] + '</span>';   
        }
      }
      // if the list of todos is found, shown on screen
      if ((todos_list !== null) && (todos_list !== undefined) && (todos_list.toString() !== "")) {
        
        // build list of uncrossed todo list items
        for(let i=0; i<todos_list.length; i++) {
            html += '<li class="lists">';
            html += '<img class="check" src="src/images/check.png">';
            html += '<img class="crossoff" src="src/images/crossoff.png" id="' + i  + '">';
            html += '<img src="src/images/save.png" style="display:none;" class="save"></img>';
            html += '<span type="text" class="span">' + todos_list[i] + '</span>';     
        };
      }
      if (crossed_list !== undefined) {
        // build list of crossed todo list items
        for(let i=0; i<crossed_list.length; i++) {
          html += '<li class="lists">';
          html += '<img class="check" src="src/images/check.png">';
          html += '<img class="crossoff" src="src/images/crossoff.png" id="' + i  + '">';
          html += '<img src="src/images/save.png" style="display:none;" class="save"></img>';
          html += '<span style="text-decoration:line-through; color:silver;" class="span">' + crossed_list[i] + '</span>';
        }
      }
      html += '</ul>';
      document.getElementById('todos' + idx).innerHTML = html;
  
      // save note's width and height
      /*
      dict = JSON.parse(localStorage.getItem(idx));
      dict['width'] = document.querySelector('#mydiv' + idx).offsetWidth + "px";
      dict['height'] = document.querySelector('#mydiv' + idx).offsetHeight + "px";
      localStorage.setItem(idx,JSON.stringify(dict));
      */
      bindTodoListEvents();
    });
  }
  