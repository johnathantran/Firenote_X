// returns the index of the note
export function getIdx(elm) {
    // if there are more than 10 notes, get last 2 chars
    let idx = elm.id.slice(-2);
    if (isNaN(idx) == true) {
      idx = elm.id.slice(-1);
    }
    return idx;
  }