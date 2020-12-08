import { createContextMenu } from '../submodules/createContextMenu.js'
import { prioritize } from '../note_events/todo_list/prioritize.js'
import { moveItem } from '../note_events/todo_list/moveItem.js'

// context menu for todo list items
export function createTodoListContextMenu() {
 
    const move_down = document.querySelector(".movedown");
    const move_up = document.querySelector(".moveup");
    const priority_btn = document.querySelector(".priority");
    
    // runs this function when a menu item is clicked
    move_up.addEventListener("click", e => {
        moveItem(move_select, "up");
    });
    // runs this function when a menu item is clicked
    move_down.addEventListener("click", e => {
        moveItem(move_select, "down");
    });
    // runs this function when a menu item is clicked
    priority_btn.addEventListener("click", e => {
        prioritize(move_select, "prioritize");
    });
}


export function createFolderContextMenu() {
    
    // create context menu for hiding and renaming folder
    var setPosition = createContextMenu(document.querySelector(".folderDelMenu"));
    var folder_list = ["folderOrange","folderPink","folderBlue","folderGreen"];

    for (var i=0; i < folder_list.length; i++) {
    document.getElementById(folder_list[i]).addEventListener("contextmenu", e => {
        move_select = getElm();
        e.preventDefault();
        const origin = {
        left: e.pageX,
        top: e.pageY
        };
        setPosition(origin);
        return false;
    });
    }
    // add event listeners for folder action context menus
    document.querySelector(".hideFolder").addEventListener("click", e => {
        hideFolder(move_select);
    });
    document.querySelector(".renameFolder").addEventListener("click", e => {
        renameFolder(move_select);
    });
    document.querySelector(".deleteFolder").addEventListener("click", e => {
        deleteFolder(move_select);
    });

    let folder_headers = document.getElementsByClassName("folderHeader");
    for (i=0; i < folder_headers.length; i++) {

        folder_headers[i].addEventListener('keyup', function (e) {

            if (e.keyCode == 13) {
            event.preventDefault();
            saveRename(getElm().value);
            }
        });
    }
}