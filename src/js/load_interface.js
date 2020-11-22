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

// add event listeners to all menu item buttons
export function bindMenuItems() {

    console.log("binding menu items");
    var menuItemFunctions = {
        'hideMenu':hideMenu(this),
        'toggleDarkMode':toggleDarkMode(),
        //'clearAll':clearAll(),
        'dockAll':dockAll(),
        'addNote':addNote(false),
        'addMemo':addNote(true)
    };

    var menuButton = document.getElementById(Object.keys(menuItemFunctions)[0]);
    console.log(menuButton);
    menuButton.addEventListener('click', function() {
        console.log("adding event listener")
        menuItemFunctions['hideMenu'];
    });
    /*
    for (const key in menuItemFunctions) {
     
        var menuButton = document.getElementById(key);
        console.log(menuButton);

        menuButton.addEventListener('click', function() {
            console.log("adding event listener to: " + key)
            menuItemFunctions[key];
        });
    };
    */
    // add folder buttons
    var el = document.getElementsByClassName('circle');
    for (i = 0; i < el.length; i++) {
        el[i].addEventListener('click', function() {
            
            createFolder();
        });
    };
};

/*
module.exports = {
    bindCollapsible: bindCollapsible,
    bindDockContextMenu: bindDockContextMenu,
}
*/
