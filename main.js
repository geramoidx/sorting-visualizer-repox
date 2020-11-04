window.onload = function() {
    var slider = document.getElementById("myRange");
    var generateNewArrayBtn = document.getElementById("newArray");
    var bubbleSortBtn = document.getElementById("bubbleSort");
    var heapSortBtn = document.getElementById("heapSort");
    var mergeSortBtn = document.getElementById("mergeSort");
    var quickSortBtn = document.getElementById("quickSort");
    var HbarArray = [];
    var ShiftedBars = [];
    var IsHeapSorting = false;
    var IsBubbleSorted = false;
    class NavigatorObject {
        constructor() {
            let navigator = document.getElementById("navigator");

            this.context = navigator.getContext('2d');

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

    const navigator = new NavigatorObject();
    var ctxnav = navigator.getCtx;

    const UpdateNavigator = () => {
        ctxnav.strokeStyle = "rgb(110, 48, 48)";
        ctxnav.lineWidth = 2;
        ctxnav.strokeRect(1, 1, 350 - 2, 250 - 2);

        ctxnav.fillStyle = "rgb(110, 48, 48)";
        ctxnav.fillRect(1, 1, 350 - 2, 30);

        ctxnav.font = 15 + "px consolas";
        ctxnav.fillStyle = "#fff";
        ctxnav.fillText("Navigator", 1 + (348 * 0.39), 20);
    }

    UpdateNavigator();
}