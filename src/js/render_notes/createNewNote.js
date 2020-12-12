import { bindNoteDockListing } from './bindNoteDockListing.js'
import { storeSync } from '../submodules/storeSync.js'

export function createNewNote(note) {

    var idx = note.idx;
    var note_header = "Note " + idx;
  
    // spawn note in center of screen
    note.note.style.top = ($(window).scrollTop() + $(window).height() / 2) + "px";
    note.note.style.left = ($(window).scrollTop() + $(window).width() / 2) - (note.note.offsetWidth / 2) + "px";
  
    // create new note in local storage as empty list
    var dict = {
    'todo': null, // list of todo items
    'headerText': note_header, 
    'minimized': false, 
    'posTop': note.note.style.top, 
    'posLeft': note.note.style.left,
    'hidden': false,
    'isMemo': note.isMemo,
    'memo': null,
    };
    console.log("Creating item: " + idx);
  
    storeSync(idx,dict);
  
    // adds the new note header to Notes Dock
    bindNoteDockListing(note_header, idx);

    // check if the note is hidden
    if (dict['hidden'] == true) {
        note.style.display = 'none';
        document.querySelector('#headerItem' + idx).style.color = 'silver';
    }
  }