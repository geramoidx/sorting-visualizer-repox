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
            // console.log("Stop to");


            //this._x += this.speed;
            //this.unsize(destinationX, true);

        } else {
            //let nextX = this._x + this.speed;

            //this._x += this.speed;
            // console.log("thisX " + this._x + ", dest " + destinationX);

            let nextX = this._x + this.speed;



            //this._x -= this.speed;
            if (nextX > destinationX) {
                // console.log("nextX " + nextX + " " + destinationX);
                let lp = Math.floor(nextX - destinationX);
                // console.log("this x:" + this._x + ", dest: " + destinationX + ", nextX: " + nextX + ", lp: " + lp);
                this._x = destinationX;
                //this._x = Math.ceil(this._x);
                // console.log(this._x + ",== " + destinationX + " speed " + this.speed);
                // console.log(this._x + ", " + destinationX);
                clearInterval(inter);
                this.unmark();
                UpdateCanvasArea();
                fswap = true;

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
}

const StartBubbleSort = (HbarArray, start, end) => {
    // j = start;
    let go = true;
    let posax = 0;
    let posbx = 0;

    t
}

if (HbarArray[j]._hg < HbarArray[j + 1]._hg) {

    HbarArray[j].misplaced();

    let lp = HbarArray[j]._index;
    HbarArray[j]._index = HbarArray[j + 1]._index;
    HbarArray[j + 1]._index = lp;

    const intervalId = setInterval(() => {
        UpdateCanvasArea();
        HbarArray[j + 1].moveFrom(posax, intervalId);

    }, time);

    const intervalId2 = setInterval(() => {
        UpdateCanvasArea();
        HbarArray[j].moveTo(posbx, intervalId2);

    }, time);

    const timeoutfunc = setInterval(() => {

        if (lswap && fswap) {
            let leftobj = HbarArray[j];
            HbarArray[j] = HbarArray[j + 1];
            HbarArray[j + 1] = leftobj;

            j++;

            if (j < (end - (i + 1))) {
                lswap = false;
                fswap = false;
                StartBubbleSort(HbarArray, start, end);
            } else if (i < end) {
                lswap = false;
                fswap = false;
                HbarArray[j].sortedbar();
                i++;
                // size = HbarArray.length - traversed;
                j = start;
                StartBubbleSort(HbarArray, start, end);;
            } else {
                console.log("sorted there");
                console.log("j is " + j);
                j = start;
                // i = 0;
                console.log("j is " + j + " and end is " + end + " and i is : " + i);
                traversed = 0;
                CurrentPosition = 0;
                size = HbarArray.length;
                IsBubbleSorted = true;
            }

            clearInterval(timeoutfunc);
        }

    }, time);
} else {
    j++;
    if (j < (end - (i + 1))) {
        lswap = false;
        fswap = false;

        // StartBubbleSort(HbarArray, start, end);
        if (go) {
            try {
                StartBubbleSort(HbarArray, start, end);
            } catch (error) {
                // alert("endddxxx j:" + j + " size: " + end);
                for (let i = 0; i < HbarArray.length; i++) {
                    HbarArray[i].sortedbar();
                }
                return;
            }
        } else {
            for (let i = 0; i < HbarArray.length; i++) {
                HbarArray[i].sortedbar();
            }
            return;
        }

    } else if (i < end) {
        HbarArray[j].sortedbar();
        i++;
        // size = HbarArray.length - traversed;
        j = start;
        lswap = false;
        fswap = false;
        StartBubbleSort(HbarArray, start, end);
    } else {
        // alert("enddd");
        console.log("sorted here");
        j = start;
        // i = 0;
        console.log("j is " + j + " and end is " + end + " and i is : " + i);
        HbarArray[j].sortedbar();
        HbarArray[j + 1].sortedbar();
        traversed = 0;
        CurrentPosition = traversed;
        size = HbarArray.length;
        IsBubbleSorted = true;
    }
}
};