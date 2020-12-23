// returns target element
export function getElm(e) {
    e = e || window.event;
    e = e.target || e.srcElement;
    console.log("Element is: " + e);
    return e;
};