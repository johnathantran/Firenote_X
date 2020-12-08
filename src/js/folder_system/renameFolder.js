// renames a folder from the Notes Dock
export function renameFolder() {
    
    let move_select = window.move_select;
    let parent = move_select.closest('div');
    move_select = parent.querySelector('.folderHeader');

    if (move_select.readOnly == true) {
      move_select.readOnly = false;
      move_select.focus();
      let val = move_select.value;
      move_select.value = '';
      move_select.value = val;
  
      let pending = document.querySelector("#pending");
      pending.textContent = "type in the new name of your folder. press Enter to save the new name.";
      pending.style.opacity = "1";
    }
  }
  