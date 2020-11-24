// move note to folder
var moveToFolder = function(color, move_select) {
  
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

module.exports = {
    moveToFolder: moveToFolder,
}