window.onload = function() {
    var slider = document.getElementById("myRange"); // range slider for changing size bars and sorting speeds
    var generateNewArrayBtn = document.getElementById("newArray"); // generate new array button
    var bubbleSortBtn = document.getElementById("bubbleSort"); // bubble sort button
    var heapSortBtn = document.getElementById("heapSort"); // heap sort button
    var mergeSortBtn = document.getElementById("mergeSort"); // merge sort button
    var quickSortBtn = document.getElementById("quickSort"); // quick sort button
    var HbarArray = []; // general array for all bar component nodes
    var ShiftedBars = []; // shifted bars generated from popping binary tree on heap sort
    var IsHeapSorting = false; // boolean check for heap sort
    var IsBubbleSorted = false; // boolean check for bubble sort

    // class implementation for navigator object - view specific bars relative to mouse x, y
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

    const navigator = new NavigatorObject(); // instance of navigator object
    var ctxnav = navigator.getCtx; // returns canvas 2d context interface

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

    UpdateNavigator(); // updatenavigator func

    //main canvas object
    class CanvasObject {
        constructor() {
            this.Canvas = document.getElementById("canvas");

            this.context = document.getElementById("canvas").getContext('2d');

            this._width = window.innerWidth;
            //canvas.style.margin = "auto";
            this._height = window.innerHeight;

            // canvas.width = this._width;
            this.Canvas.width = window.innerWidth;
            this.Canvas.height = window.innerHeight;

            this.Canvas.style.backgroundColor = "#ffb";

            this.SortSpeed = 10;
        }

        clear() {}

        get getCtx() {}
    }
}
}
}
}
}
}

class ComponentHBar {

    get CurrentObj() {
        return this;
    }

    display() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this._x, this._y, this._wd, this._hg);
        ctx.font = this._wd * 0.30 + "px consolas";

        ctx.fillStyle = "#ffb";
        ctx.fillText(this._hg, this._x + (this._wd * 0.25), 80);

        ctx.strokeStyle = "#ffb";
        ctx.lineWidth = 1;
        ctx.strokeRect(this._x, this._y, this._wd, this._hg);
    }

    misplaced() {
        this.color = "red";
        this.display();
    }

    mark() {
        this.color = "green";
        this.display();
    }

    unmark() {
        this.color = "#00b";
        this.display();
    }

    sortedbar() {
        this.color = "rgb(110, 48, 48)";
        this.display();
    }

    resize(template = true) {

        if (!this.isResized && template) {

            if (this._wd > this._var) {
                this._x += this.rs * 0.5;
                this._wd += -this.rs;
            } else {
                this.isResized = true;
            }
        } else if (!this.isResized && !template) {
            if (this._wd < this._var * 4) {
                this._x += -this.rs * 0.5;
                this._wd += this.rs;
            } else {
                this.isResized = true;
            }
        }

        this.display();
    }

    unsize(destinationX, template = true) {

        const unshrink = setInterval(() => {

                if (Math.floor(this._x) != Math.floor(destinationX) && template) {
                    UpdateCanvasArea();

                    this._x -= this.rs * 0.5;
                    this._wd += this.rs;

                    this.display();

                } else if (!template && Math.ceil(this._x) != Math.ceil(destinationX)) {
                    UpdateCanvasArea();

                    this._x += this.rs * 0.5;
                    this._wd += -this.rs;

                    this.display();
                } else {

                    // UpdateCanvasArea();
                    //console.log("2nd : " + this._x + " width fac : " + this._wd);
                    // if (!template) {
                    //     this._x -= 10;
                    // }

                    // this.display();

                    clearInterval(unshrink);
                }

            },
            CanvasObject.SortSpeed);
    }

    moveTo(destinationX, inter) {
        //this.resize(true);

        //let leftbox = destinationX + (this._var * 2 * (this.rs ** 2));

        if (Math.ceil(this._x) == Math.floor(destinationX)) {
            this._x = destinationX;

            this.unmark();
            UpdateCanvasArea();
            fswap = true;
            clearInterval(inter);
            {

            } else {
                this._x += this.speed;
            }
        }


        this.display();
    }

    moveFrom(destinationX, inter) {
        //this.resize(false);

        //let leftbox = destinationX - (this._var * 2 * (this.rs ** 2));



        this.display();
    }
}
}

};