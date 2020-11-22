export function createModals() {

    // quick guide modal
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    // quick guide modal - folders
    var modal2 = document.getElementById("myModal2");
    var prevBtn = document.getElementById("guideBtn2");
    var nextBtn = document.getElementById("guideBtn1");
    span = document.getElementsByClassName("close")[1];

    nextBtn.onclick = function() {
        modal.style.display = "none";
        modal2.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal2.style.display = "none";
    }
    // Go to previous modal when this button is clicked
    prevBtn.onclick = function() {
        modal.style.display = "block";
        modal2.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";
        }
    }
}
