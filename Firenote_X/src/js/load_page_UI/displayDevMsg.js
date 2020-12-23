export function displayDevMsg() {

    // dev messages button
    var el = document.getElementById('msgBtn');
  
    el.addEventListener('click', function() {

        var msgText = document.getElementById('msgText');
        if (msgText.style.opacity == "1") {
            document.getElementById('releaseNotes').style.display = "inline-block";
            msgText.style.opacity = "0";
        }
        else {
            document.getElementById('releaseNotes').style.display = "none";
            msgText.style.opacity = "1";
        }
    });
}