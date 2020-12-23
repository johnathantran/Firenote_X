// dependencies
import { moveToFolder } from '../folder_system/moveToFolder.js'

// adds event listeners to collapsible UI menus
export function bindCollapsible() {

    let collapsibles = [document.getElementsByClassName("collapsible"), document.getElementsByClassName("folderCollapsible")];

    for (let j = 0; j < collapsibles.length; j++) {

        let coll = collapsibles[j];

        for (let i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;

            if (content !== null) {
                if (content.style.maxHeight){
                content.style.maxHeight = null;
                } else {
                content.style.maxHeight = content.scrollHeight + "px";
                };
            }
            });
        }
    }
}

// add event listeners to note dock context menu items
export function bindDockContextMenu() {
    window.color_dict = {"Orange":"#ffdfba", "Pink":"#ffedf8", "Blue":"#d0ebfc", "Green":"#ceffeb", "Yellow":"#fcfacf"};

    Object.keys(window.color_dict).forEach(function(key) {
        let folder = document.getElementById("move" + key);
        folder.addEventListener('click',function() {
            moveToFolder(key, window.move_select);
        });
    });
}

// add event listeners to right side menu items
import { addNewNote } from '../render_notes/addNewNote.js'
import { hideMenu } from '../right_menu/hideMenu.js'
import { toggleDarkMode } from '../right_menu/darkMode.js'
import { clearAll } from '../right_menu/clearAll.js'
import { dockAll } from '../right_menu/dockAll.js'

// add event listeners to all right side menu item buttons
export function bindMenuItems() {

    let menuFuncs = {
        hideMenu: () => {
            let el = document.getElementById('hideMenu');
            el.addEventListener('click', function() { hideMenu(this) });
        },
        toggleDarkMode: () => {
            let el = document.getElementById('toggleDarkMode');
            el.addEventListener('click', function() { toggleDarkMode() });
        },
        clearAll: () => {
            let el = document.getElementById('clearAll');
            el.addEventListener('click', function() { clearAll() });
        },
        dockAll: () => {
            let el = document.getElementById('dockAll');
            el.addEventListener('click', function() { dockAll() });
        },
        addNote: () => {    
            let el = document.getElementById('addNote');
            el.addEventListener('click', function() { addNewNote(false) });
        },
        addMemo: () => {
            let el = document.getElementById('addMemo');
            el.addEventListener('click', function() { addNewNote(true) });
        },
        addFolderButtons: () => {
            let el = document.getElementsByClassName('circle');
            for (let i = 0; i < el.length; i++) {
                el[i].addEventListener('click', function() {
                    createFolder();
                });
            };
        }
    };
    menuFuncs.hideMenu();
    menuFuncs.toggleDarkMode();
    menuFuncs.clearAll();
    menuFuncs.dockAll();
    menuFuncs.addNote();
    menuFuncs.addMemo();
    menuFuncs.addFolderButtons();
};