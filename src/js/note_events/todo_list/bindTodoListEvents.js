import { strikeThrough } from './strikeThrough.js'

// adds event handlers for todo items on a note
export function bindTodoListEvents() {

    // strikethrough
    let elements = document.getElementsByClassName('check');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
        strikeThrough(getElm());
      });
    }

    // remove a todo item
    elements = document.getElementsByClassName('crossoff');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
        console.log("crossoff clicked");
        // crossed is false or true?
        remove(false);
      });
    }

    // edit a todo item
    elements = document.getElementsByClassName('span');
  
    // assign listeners to context menu for to-do list items
    const setPosition = createContextMenu(document.querySelector(".contextMenu"));
  
    for (let i = 0; i < elements.length; i++) {
  
      elements[i].addEventListener('click', function() {
        console.log("edit item clicked");  
        editNote();
        });

      // add a listener for the context menu to each element in the to-do list
      elements[i].addEventListener("contextmenu", e => {
        window.move_select = getElm();
        console.log(move_select);

        e.preventDefault();
        const origin = {
          left: e.pageX,
          top: e.pageY
        };
        setPosition(origin);
        return false;
      });
    }
    
    // save an edit
    elements = document.getElementsByClassName('save');
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
        console.log("save item clicked");  
        saveEdit();
      });
    }
  }
  