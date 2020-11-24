export function getAllExistingNoteIndexes() {
    var all_idx = [];
    var header_list = document.querySelectorAll(".dragHeader");

    for (var j = 1; j <= header_list.length + 1; j++) {
      all_idx.push(j.toString());
    }
    console.log(all_idx);
    return all_idx;
}