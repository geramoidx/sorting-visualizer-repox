var slider = document.getElementById("myRange");
var generateNewArrayBtn = document.getElementById("newArray");
var bubbleSortBtn = document.getElementById("bubbleSort");
var heapSortBtn = document.getElementById("heapSort");
var mergeSortBtn = document.getElementById("mergeSort");
var quickSortBtn = document.getElementById("quickSort");
var IsHeapSorting = false;
var IsBubbleSorted = false;

class NavigatorObject {
  constructor() {
    let navigator = document.getElementById("navigator");

    this.context = navigator.getContext("2d");

    this._width = 350;
    //canvas.style.margin = "auto";
    this._height = 250;

    navigator.width = this._width;
    navigator.height = this._height;
    navigator.style.backgroundColor = "#fff";
    navigator.style.opacity = 0.8;

    // this.SortSpeed = 10;
    // console.log("created navigator");
  }

  clear() {
    this.getCtx.clearRect(0, 0, this._width, this._height);
  }

  get getCtx() {
    return this.context;
  }
}
