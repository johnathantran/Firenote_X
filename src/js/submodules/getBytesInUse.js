// check user storage
export function getBytesInUse() {
    chrome.storage.sync.getBytesInUse(function(result){
        console.log("Bytes in use: " + result + " out of 102,400 quota bytes")
    });
}