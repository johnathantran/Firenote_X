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
// PART IX. HELPER FUNCTIONS
// *****************************************************************************************************************
// *****************************************************************************************************************

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