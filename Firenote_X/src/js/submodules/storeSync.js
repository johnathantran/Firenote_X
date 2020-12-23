// stores item into Google Chrome sync
export function storeSync(idx,dict) {
    let key = idx.toString(),
        value = JSON.stringify(
            dict
        );
    let jsonfile = {};
    jsonfile[key] = value;
    chrome.storage.sync.set(jsonfile, function () {
        console.log('Saved:', key);
        //console.log('Saved', key, value);
    });
  }