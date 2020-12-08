/*
version 2.1

SECTIONS IN THIS CODE:

I. GLOBAL VARIABLES
II. DOCUMENT LOAD AND EVENT HANDLERS
III. RIGHT SIDE MENU FUNCTIONS
IV. NOTE DOCK FUNCTIONS
V. MAIN FIRENOTE FUNCTIONS
VI. NOTE HEADER BAR FUNCTIONS
VII. MEMO FUNCTIONS
VIII. TODO LIST FUNCTIONS
IX. HELPER FUNCTIONS
*/ 

// *****************************************************************************************************************
// *****************************************************************************************************************
// I. GLOBAL VARIABLES
// *****************************************************************************************************************
// *****************************************************************************************************************


// check user storage:
chrome.storage.sync.getBytesInUse(function(result){
  console.log("Bytes in use: " + result + " out of 102,400 quota bytes")
});

// note colors used
var color_dict = {"Orange":"#ffdfba", "Pink":"#ffedf8", "Blue":"#d0ebfc", "Green":"#ceffeb", "Yellow":"#fcfacf"};
// max allowed notes on screen
const max_notes = 15;
// indicates if dark mode is enabled
var dark_enabled = document.getElementById("darkEnabled");


// *****************************************************************************************************************
// *****************************************************************************************************************
// PART IV. NOTE DOCK FUNCTIONS
// *****************************************************************************************************************
// *****************************************************************************************************************

// move note to folder
function moveToFolder(color, move_select) {
  
  var target = document.getElementById("content" + color);
  document.getElementById(move_select.id).remove();

  // if the folder hasn't been created yet, reveal the folder
  try {
    if (target.innerHTML == "") {
      document.getElementById("folder" + color).style.display = "block";
    }
  }
  catch(err) {}

  var idx = getIdx(move_select);

  chrome.storage.sync.get([idx.toString()], function(result) {
    dict = JSON.parse(result[idx]);

    // assign the note's folder to the selected color
    dict['folderColor'] = color;
    storeSync(idx,dict);
  });
  
  // adds the new note header to Notes Dock
  if (color == "Yellow") {
    // move the note out of the folder
    document.querySelector('#myNotes').appendChild(move_select);
  }
  else {
    target.appendChild(move_select);
  }
  var idx = getIdx(move_select);
  var targetNote = document.getElementById("mydiv" + idx);
  
  try {
    targetNote.style.backgroundColor = color_dict[color];
    document.getElementById("mydiv" + idx + "header").style.backgroundColor = color_dict[color];
    document.getElementById("memo" + idx).style.backgroundColor = color_dict[color];
  }
  catch(err) {}
}


// ***********************************************************************************************
// hide all notes in a folder
// ***********************************************************************************************
function hideFolder(move_select) {

  var color = move_select.id.replace('input','');
  color = color.replace('folder','');
  var target = document.getElementById("content" + color);
  var all_divs = document.querySelectorAll(".drag");
  var all_idx = [];
  var dark = false;

  for (j = 0; j < target.childNodes.length; j++) {
    var idx = getIdx(target.childNodes[j]);
    all_idx.push(idx);
  }
  console.log(all_idx);
  chrome.storage.sync.get(all_idx, function(result) {

    console.log(target.childNodes)
    for (i=0; i < target.childNodes.length; i++) {
      
      console.log(target.childNodes[i]);
      var idx = getIdx(target.childNodes[i]).toString();
      var dict = JSON.parse(result[idx]);
      var div_to_hide = document.querySelector('#mydiv' + idx);
      var header_item = document.getElementById("headerItem" + idx);
      

      // check if the note is currently hidden or not
      if (dict['hidden'] == true) {
        console.log("showing...");
        
        div_to_hide.style.display = "block";
        
        // bring all the other notes behind the selected note
        for (j=0; j < all_divs.length; j++) {
          all_divs[j].style.zIndex = "1";
        }
        div_to_hide.style.zIndex = "2";
        
        // if dark
        header_item.style.color = "black";
        if (document.getElementById("darkEnabled").innerHTML == "enabled") {
          header_item.style.color = "white";
        }
        dict['hidden'] = false;
      }
      else {
        console.log("hiding...");
        // reset notes zIndexes
        for (j=0; j < all_divs.length; j++) {
          all_divs[j].style.zIndex = "1";
        }
        div_to_hide.style.display = "none";
        header_item.style.color = "silver";
        dict['hidden'] = true;
      }
      storeSync(idx,dict); 
    }
  });
}


// ***********************************************************************************************
// rename a folder
// ***********************************************************************************************
function renameFolder(move_select) {
  console.log(move_select);

  if (move_select.readOnly == true) {
    move_select.readOnly = false;
    move_select.focus();
    var val = move_select.value; // store the value of the element
    move_select.value = ''; // clear the value of the element
    move_select.value = val; // set that value back

    var pending = document.querySelector("#pending");
    pending.textContent = "type in the new name of your folder. press Enter to save the new name.";
    pending.style.opacity = "1";
  }
}


// ***********************************************************************************************
// saves a folder rename to Chrome storage
// ***********************************************************************************************
function saveRename(rename) {
  elm = getElm();
  var color = elm.id.replace('input','');
  color = color.replace(/\\/g, '');
  
  chrome.storage.sync.get(["folderNames"], function(result) {

    var folderNames = result['folderNames'];
    try {
      folderNames[color] = rename;
    }
    catch(err) {
      result['folderNames'] = {};
      var folderNames = result['folderNames'];
      folderNames[color] = rename;
    }

    var contextMenuSelect = document.getElementById("option" + color);
    contextMenuSelect.innerHTML = rename;

    chrome.storage.sync.set({'folderNames' : folderNames}, function() {
      move_select.blur();
      move_select.readOnly = true;
      document.querySelector("#pending").textContent = "folder renamed.";
      fade(document.querySelector("#pending"));
    });
  });
}


// ***********************************************************************************************
// delete a folder
// ***********************************************************************************************
function deleteFolder(move_select) {

  var r = confirm("Are you sure you want to delete the folder " + move_select.value + "?");
  if (r== false) { return; }

  var color = move_select.id.replace('input','');
  var target = document.getElementById("content" + color);
  var notes_to_delete = [];

  for (i=0; i < target.childNodes.length; i++) {
    var idx = getIdx(target.childNodes[i]);
    notes_to_delete.push(idx);
  }

  // remove all notes within the folder
  for (i=0; i < notes_to_delete.length; i++) {
    idx = notes_to_delete[i];
    document.getElementById('mydiv' + idx).remove();
    document.querySelector("#headerItem" + idx.toString()).remove();
    chrome.storage.sync.remove(idx.toString());
    chrome.storage.sync.remove(color);
    // for debugging purposes (removes all folder names):
    //chrome.storage.sync.remove("folderNames");
  }
  document.getElementById('folder' + color).style.display = "none";
}

// *****************************************************************************************************************
// *****************************************************************************************************************
// PART IX. HELPER FUNCTIONS
// *****************************************************************************************************************
// *****************************************************************************************************************

// fade an element out
function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          //element.style.display = 'none';
          op = 0;
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.08;   
  }, 50);
}

// gets an element
function getElm(e) {
  e = e || window.event;
  e = e.target || e.srcElement;
  console.log("Element is: " + e);
  return e;
};

// stores item into Google Chrome sync
function storeSync(idx,dict) {
  var key = idx.toString(),
      value = JSON.stringify(
          dict
      );
  var jsonfile = {};
  jsonfile[key] = value;
  chrome.storage.sync.set(jsonfile, function () {
      console.log('Saved', key, value);
  });
}

// returns the index of the note
function getIdx(elm) {
  // if there are more than 10 notes, get last 2 chars
  let idx = elm.id.slice(-2);
  if (isNaN(idx) == true) {
    idx = elm.id.slice(-1);
  }
  return idx;
}