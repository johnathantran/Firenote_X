// dependencies

// adds event listeners to collapsible UI menus
export function bindCollapsible() {

    var collapsibles = [document.getElementsByClassName("collapsible"), document.getElementsByClassName("folderCollapsible")];

    for (var j = 0; j < collapsibles.length; j++) {

        var coll = collapsibles[j];

        for (var i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;

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
export function bindDockContextMenu(move_select) {
    var folderIDs = ["moveOrange", "movePink", "moveBlue", "moveGreen", "moveYellow"];
    
    for (var i = 0; i < folderIDs.length; i++) {
        var folder = document.getElementById(folderIDs[i]);

        folder.addEventListener('click',function() {
            moveToFolder(folderIDs[i].replace('move',''), moveSelect);
        });
    }
}

// add event listeners to all right side menu item buttons
export function bindMenuItems() {

    var menuFuncs = {
        hideMenu: () => {
            var el = document.getElementById('hideMenu');
            el.addEventListener('click', function() { hideMenu(this) });
        },
        toggleDarkMode: () => {
            var el = document.getElementById('toggleDarkMode');
            el.addEventListener('click', function() { toggleDarkMode() });
        },
        clearAll: () => {
            var el = document.getElementById('clearAll');
            el.addEventListener('click', function() { clearAll() });
        },
        dockAll: () => {
            var el = document.getElementById('clearAll');
            el.addEventListener('click', function() { dockAll() });
        },
        addNote: () => {
            var el = document.getElementById('addNote');
            el.addEventListener('click', function() { addNote(false) });
        },
        addMemo: () => {
            var el = document.getElementById('addMemo');
            el.addEventListener('click', function() { addNote(true) });
        },
        addFolderButtons: () => {
            var el = document.getElementsByClassName('circle');
            for (var i = 0; i < el.length; i++) {
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

/*
module.exports = {
    bindCollapsible: bindCollapsible,
    bindDockContextMenu: bindDockContextMenu,
}
*/
