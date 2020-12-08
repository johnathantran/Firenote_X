// move note to folder
export function moveToFolder(color, loadedItem) {

    let move_select = window.move_select;
    console.log(move_select);
    let target = document.getElementById("content" + color);
    let idx;

    try {
      // if rendering the notes on page load
      if (move_select == undefined) {
        move_select = loadedItem;
      }
      // if accessing context menu from the note itself
      if (move_select.className == "dragHeader") {
        idx = getIdx(move_select.parentNode);
        move_select = document.getElementById("headerItem" + idx);
      }
      document.getElementById(move_select.id).remove();
      idx = getIdx(move_select);
    }
    catch(err) {
      console.log("Page loading in note folder assignment");
    }
    
    // if the folder hasn't been created yet, reveal the folder
    try {
      if (target.innerHTML == "") {
        document.getElementById("folder" + color).style.display = "block";   
      }
    }
    catch(err) {}
    
    if (color == "Yellow") {
      // move the note out of the folder
      document.querySelector('#myNotes').appendChild(move_select);
    }
    else {
      target.appendChild(move_select);
    }
    
    chrome.storage.sync.get([idx.toString()], function(result) {
      let dict = JSON.parse(result[idx]);
      dict['folderColor'] = color;
      storeSync(idx,dict);
    });
    
    let targetNote = document.getElementById("mydiv" + idx);
    
    try {
      targetNote.style.backgroundColor = color_dict[color];
      document.getElementById("mydiv" + idx + "header").style.backgroundColor = color_dict[color];
      document.getElementById("memo" + idx).style.backgroundColor = color_dict[color];
    }
    catch(err) {}
}