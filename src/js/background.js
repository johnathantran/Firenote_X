// load page imports

// adding event listeners
import { bindCollapsible, bindDockContextMenu, bindMenuItems } from './load_page_UI/bindUI.js'
import { createModals } from './load_page_UI/createModals.js'
import { displayDevMsg } from './load_page_UI/displayDevMsg.js'
import { createTodoListContextMenu, createFolderContextMenu } from './load_page_UI/bindFolderContextMenu.js'

$(document).ready(function() {
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

    console.log("end load page");
});

// adding note event listeners
//import { bindHeaderContextMenu } from './load_notes/bindNoteEvents.js'
//bindHeaderContextMenu(note);

// load previously created notes on the page
import { queryNoteData } from './render_notes/queryNoteData.js'
queryNoteData();