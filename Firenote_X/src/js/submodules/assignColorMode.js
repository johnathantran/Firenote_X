// assigns either dark or light color modes
export function assignColorMode(mode) {

    let sheet = (function() {
      // Create the <style> tag
      var style = document.createElement("style");
      // WebKit hack
      style.appendChild(document.createTextNode(""));
      // Add the <style> element to the page
      document.head.appendChild(style);
      return style.sheet;
    })();
  
    if (mode == "dark") {
        var dark = true;
        sheet.insertRule("\
        .collapsible, .clear {\
        background-color: #363640;\
        color: #fcd488;\
        }",0);
        sheet.insertRule("\
        .bar {\
        background-color: white;\
        }",0);
        // change the folder header item colors
        sheet.insertRule("\
        .folderHeader {\
        color: #f0efed;\
        }",0);
    }
    else {
      var dark = false;
      sheet.insertRule("\
      .collapsible, .clear {\
       background-color: white;\
       color: gray;\
      }",0);
      // change the menu bar colors
      sheet.insertRule("\
      .bar {\
       background-color: gray;\
      }",0);
      // change the folder header item colors
      sheet.insertRule("\
      .folderHeader {\
       color: gray;\
      }",0);
    }
    return dark;
  }