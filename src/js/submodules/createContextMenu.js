// creates a context menu
export function createContextMenu(menu) {
    let menuVisible = false;
    const toggleMenu = command => {
      menu.style.display = command === "show" ? "block" : "none";
      menuVisible = !menuVisible;
    };
    // sets the position of the menu at mouse click
    const setPosition = ({ top, left }) => {
      menu.style.left = `${left}px`;
      menu.style.top = `${top}px`;
      toggleMenu("show");
    };
    // hides the context menu if you click outside it
    window.addEventListener("click", e => {
      if (menuVisible) toggleMenu("hide");
    });
    return setPosition;
  }