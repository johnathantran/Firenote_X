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
  let key = idx.toString(),
      value = JSON.stringify(
          dict
      );
  let jsonfile = {};
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