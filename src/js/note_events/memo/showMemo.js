export function showMemo(idx) {
    chrome.storage.sync.get([idx.toString()], function(result) {
      console.log(result);
      dict = JSON.parse(result[idx]);
      console.log(dict);
      console.log(dict['memo']);
    });
  }
  