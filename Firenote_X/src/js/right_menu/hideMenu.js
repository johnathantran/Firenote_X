// hides the menu when the 3 bar icon is clicked
export function hideMenu() {
    if (document.querySelector('#menu').style.display == "none") {
      document.querySelector('#menu').style.display = "block";
    }
    else {
      document.querySelector('#menu').style.display = "none";
    }
  }