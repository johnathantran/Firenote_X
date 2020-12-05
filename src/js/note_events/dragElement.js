// allows a note to be dragged
export function dragElement() {

    let idx = getIdx(getElm().parentNode);
    let elm = document.getElementById("mydiv" + idx);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    if (document.getElementById(elm.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elm.id + "header").onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      console.log(e);
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elm.style.top = (elm.offsetTop - pos2) + "px";
      elm.style.left = (elm.offsetLeft - pos1) + "px";
  
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      var elm = getElm().parentNode;
      idx = getIdx(elm);
  
      chrome.storage.sync.get([idx.toString()], function(result) {
        let dict = JSON.parse(result[idx]);
        dict['posTop'] = elm.style.top;
        dict['posLeft'] = elm.style.left;
        storeSync(idx,dict);
      });
    }
  }