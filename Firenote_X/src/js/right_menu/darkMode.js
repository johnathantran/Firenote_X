import { assignColorMode } from '../submodules/assignColorMode.js'

// enable dark mode CSS changes
export function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");
  
    chrome.storage.sync.get(['firenote_dark'], function(result) {
      // check if dark mode was enabled by user
      if (result['firenote_dark'] == true) {
        var dark = assignColorMode("light");
        document.getElementById("darkEnabled").innerHTML = "disabled";
      }
      else {
        var dark = assignColorMode("dark");
        document.getElementById("darkEnabled").innerHTML = "enabled";
      }
      chrome.storage.sync.set({'firenote_dark' : dark}, function() {
        console.log('Color mode set');
      });
    });
  }