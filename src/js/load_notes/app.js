// workflow for creating a new list or a new memo
const { checkPreconditions } = require("./checkPreconditions");
const { initNote } = require("./initNote");

import { checkPreconditions } from './checkPreconditions.js'
import { initNote } from './initNote.js'
import { createNewNote } from './createNewNote.js'

// check preconditions for creating a new note
// arg: isMemo = either a memo (true) or a todo list (false)
var noteTemplate = checkPreconditions(isMemo);

// create a new note after preconditions are satisfied
var noteTemplate, note = initNote(noteTemplate);

// fill new note div with content
createNewNote(noteTemplate, note);

