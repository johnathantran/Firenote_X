// allows a list item to be edited
export function editListItem() {
  
  let elm = getElm();
  let pending = document.querySelector("#pending");
  pending.textContent = "edit pending save. click save icon to sync changes.";
  pending.style.opacity = "1";
  window.originalListItem = elm.textContent; // original note content
  console.log(window.originalListItem);
  
  let shown_save_count = 0;
  let displayed;

  // check for existing save buttons (pending edits)
  let spanList = document.querySelectorAll(".span");
  for (let j = 0; j < spanList.length; j++) {

    let save_button = spanList[j].parentNode.childNodes[2];

    if (save_button.style.display == 'inline-block') {
      displayed = save_button;
      shown_save_count++;
    };
  };

  // if there are no pending edits, show the save button
  let save_button = elm.parentNode.childNodes[2];

  if (shown_save_count < 1) {
    save_button.style.display = "inline-block"; //show the save button
    elm.setAttribute("contentEditable", true);
    elm.focus();
    shown_save_count++;
  }
  // if you click on the same pending edit, will not prompt the pending message
  else if ((shown_save_count == 1) && (displayed == save_button)) {
    save_button.style.display = "inline-block"; //show the save button
    elm.setAttribute("contentEditable", true);
    elm.focus();
  }
  else {
    window.originalListItem = [window.originalListItem[0]];
    pending.textContent = "you have unsaved pending edits. save before adding new edit.";
    pending.style.opacity = "1";
  };
}
