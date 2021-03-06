// DEPENDENCIES
import { getBytesInUse } from './submodules/getBytesInUse.js'
import { bindCollapsible, bindDockContextMenu, bindMenuItems } from './load_page_UI/bindUI.js'
import { createModals } from './load_page_UI/createModals.js'
import { displayDevMsg } from './load_page_UI/displayDevMsg.js'
import { createTodoListContextMenu, createFolderContextMenu } from './load_page_UI/assignContextMenus.js'

// GLOBAL VARIABLES
// defines selected right-clicked item for context menus
window.move_select;

// stores list items before edit
window.originalListItem;

// selected color codes for folder system
window.color_dict = {"Orange":"#ffdfba", "Pink":"#ffedf8", "Blue":"#d0ebfc", "Green":"#ceffeb", "Yellow":"#fcfacf"};

// max allowed notes on screen
window.max_notes = 15;

// indicates if dark mode is enabled
window.dark_enabled = document.getElementById("darkEnabled");

window.onload = function(){

    // check user storage limits
    getBytesInUse();

    // bind collapsible UI menus
    bindCollapsible();

    // bind note dock context menu for Move Folder function
    bindDockContextMenu();

    // bind right side menu items
    bindMenuItems();

    // bind modal buttons
    createModals();

    // bind display dev messages button
    displayDevMsg();

    // add event listeners for 2 context menus
    createTodoListContextMenu();
    createFolderContextMenu();

    console.log("page loaded");
};

// load previously created notes on the page and bind note events
import { queryNoteData } from './render_notes/queryNoteData.js'
queryNoteData();