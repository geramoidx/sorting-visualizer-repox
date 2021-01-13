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
    this._height = 250;

    navigator.width = this._width;
    navigator.height = this._height;
    navigator.style.backgroundColor = "#fff";
    navigator.style.opacity = 0.8;

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
  ctxnav.fillText("Navigator", 1 + 348 * 0.39, 20);
};

UpdateNavigator();

var HbarArray = [];
var ShiftedBars = [];

class CanvasObject {
  constructor() {
    this.Canvas = document.getElementById("canvas");

    this.context = document.getElementById("canvas").getContext("2d");

    this._width = window.innerWidth;
    //canvas.style.margin = "auto";
    this._height = window.innerHeight;

    // canvas.width = this._width;
    this.Canvas.width = window.innerWidth;
    this.Canvas.height = window.innerHeight;

    this.Canvas.style.backgroundColor = "#ffb";

    this.SortSpeed = 10;
  }

  clear() {
    this.getCtx.clearRect(0, 0, this._width, this._height);
  }

  get getCtx() {
    return this.context;
  }
}

const canvas = new CanvasObject();
let minErr = 0.40;
let maxErr = 0.45;
var midpoint = canvas._width * 0.5;
const ctx = canvas.getCtx;

var minNum = 5;
var maxNum = 200;
var n = maxNum;
const gap = 1;
let min = 100;
let max = 500;
var minWidth = 3;
var maxWidth = 60;
var hbarwidith = minWidth;
var fswap = false;
var lswap = false;
var GeneralSpeed = 500;

class ComponentHBar {
    constructor(x, y, width, height, index) {
        this._index = index;
        this._x = x;
        this._y = y;
        this._wd = width;
        this.rs = 0.5; // this is the resize ration of the Hbar component
        this._var = this._wd * this.rs;
        this._hg = height;
        this.isResized = true;
        this.speed = GeneralSpeed;
        this.color = "#00b";
    }

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

                    clearInterval(unshrink);
                }

            },
            CanvasObject.SortSpeed);
    }

    moveTo(destinationX, inter) {
       
        if (Math.ceil(this._x) == Math.floor(destinationX)) {
            this._x = destinationX;

            this.unmark();
            UpdateCanvasArea();
            fswap = true;
            clearInterval(inter);

        } else {
            
            let nextX = this._x + this.speed;

            if (nextX > destinationX) {
                let lp = Math.floor(nextX - destinationX);
                this._x = destinationX;
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
        
        if (this.isResized) {

            if (Math.ceil(this._x) == Math.floor(destinationX)) {
                this._x = destinationX;
                clearInterval(inter);
                this.unmark();
                UpdateCanvasArea();
                lswap = true;

            } else {
                let nextX = this._x - this.speed;

                if (nextX < destinationX) {
                    let lp = Math.ceil(destinationX - nextX);
                    this._x = destinationX;
                    
                    this.unmark();
                    UpdateCanvasArea();
                    lswap = true;
                    clearInterval(inter);

                } else {
                    this._x -= this.speed;
                }
            }
        }

        this.display();
    }
}

const UpdateCanvasArea = () => {
    canvas.clear();

    for (let i = 0; i < HbarArray.length; i++) {
        HbarArray[i].display();
    }

    for (let i = 0; i < ShiftedBars.length; i++) {
        ShiftedBars[i].display();
    }
}

var time = 0.05;
var traversed = 0;
var CurrentPosition = traversed;
var size = HbarArray.length - traversed;

var jump = 2;
var i = 0;
var j = 0;
var len = j + jump;
let FinalSortedsConfig = false;
var ViewIndex = 0;
var ViewFromHeap = false;

let halves = HbarArray.length;

const GenerateNewArray = () => {

  ShiftedBars = [];
  fswap = false;
  lswap = false;

  IsHeapSorting = false;
  IsBubbleSorted = false;

  let range = slider.value;
  jump = 2 + Math.floor(parseInt(range) * ((50 - 2) / 100));
  i = 0;
  j = 0;
  len = j + jump;
  halves = 0;

  ViewFromHeap = false;

  ViewIndex = 0;

  FinalSortedConfig = false;

  canvas.clear();

  HbarArray = [];

  for (let i = 0; i < n; i++) {
    let ylength = Math.floor(Math.random() * (max - min)) + min;
    let xcoord =
      midpoint -
      Math.floor(hbarwidith * 0.5) -
      hbarwidith * Math.floor(n * 0.5) +
      hbarwidith * i; // - (gap * i);
    HbarArray.push(new ComponentHBar(xcoord, 0, hbarwidith, ylength, i));
  }

  for (let i = 0; i < n; i++) {
    HbarArray[i].display();
  }

  traversed = 0;
  CurrentPosition = 1;
  size = HbarArray.length;
  halves = HbarArray.length;
};

generateNewArrayBtn.onclick = () => {
  GenerateNewArray();
};

GenerateNewArray();

window.addEventListener("resize", () => {
  canvas.Canvas.width = window.innerWidth;
  canvas.Canvas.height = window.innerHeight;
  canvas._width = window.innerWidth;
  canvas._height = window.innerHeight;

  midpoint = canvas._width * 0.5;


  GenerateNewArray();
});

const StartBubbleSort = (HbarArray, start, end) => {
  
  let go = true;
  let posax = 0;
  let posbx = 0;

  try {
    posax = Math.floor(HbarArray[j]._x);
    posbx = Math.floor(HbarArray[j + 1]._x);

    HbarArray[j].mark();
    HbarArray[j + 1].mark();
  } catch (error) {
    go = false;
    for (let i = 0; i < HbarArray.length; i++) {
      HbarArray[i].sortedbar();
    }

    return;
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

        if (j < end - (i + 1)) {
          lswap = false;
          fswap = false;
          StartBubbleSort(HbarArray, start, end);
        } else if (i < end) {
          lswap = false;
          fswap = false;
          HbarArray[j].sortedbar();
          i++;
          j = start;
          StartBubbleSort(HbarArray, start, end);
        } else {
          
          j = start;
        
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
    if (j < end - (i + 1)) {
      lswap = false;
      fswap = false;

      if (go) {
        try {
          StartBubbleSort(HbarArray, start, end);
        } catch (error) {
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
      j = start;
      lswap = false;
      fswap = false;
      StartBubbleSort(HbarArray, start, end);
    } else {
      
      j = start;
      
      HbarArray[j].sortedbar();
      HbarArray[j + 1].sortedbar();
      traversed = 0;
      CurrentPosition = traversed;
      size = HbarArray.length;
      IsBubbleSorted = true;
    }
  }
};

bubbleSortBtn.onclick = () => {
  StartBubbleSort(HbarArray, 0, HbarArray.length);
};

const StartHeapSort = () => {
  IsHeapSorting = true;
  let parentposition = Math.ceil(CurrentPosition * 0.5) - 1;

  let posax = Math.floor(HbarArray[CurrentPosition]._x);
  let posbx = Math.floor(HbarArray[parentposition]._x);

  HbarArray[CurrentPosition].mark();
  HbarArray[parentposition].mark();

  if (HbarArray[CurrentPosition]._hg > HbarArray[parentposition]._hg) {
    HbarArray[CurrentPosition].misplaced();

    let lp = HbarArray[CurrentPosition]._index;
    HbarArray[CurrentPosition]._index = HbarArray[parentposition]._index;
    HbarArray[parentposition]._index = lp;

    const intervalId = setInterval(() => {
      UpdateCanvasArea();
      HbarArray[CurrentPosition].moveFrom(posbx, intervalId);
    }, time);

    const intervalId2 = setInterval(() => {
      UpdateCanvasArea();
      HbarArray[parentposition].moveTo(posax, intervalId2);
    }, time);

    const timeoutfunc = setInterval(() => {
      if (lswap && fswap) {
        HbarArray[CurrentPosition].unmark();

        let leftobj = HbarArray[CurrentPosition];
        HbarArray[CurrentPosition] = HbarArray[parentposition];
        HbarArray[parentposition] = leftobj;

        let lp = HbarArray[CurrentPosition]._index;
        HbarArray[CurrentPosition]._index = HbarArray[parentposition]._index;
        HbarArray[parentposition]._index = lp;

        CurrentPosition++;

        if (parentposition == 0) {
          lswap = false;
          fswap = false;

          try {
            StartHeapSort();
          } catch (error) {
            
            clearInterval(timeoutfunc);
          }
        } else if (traversed < size - 1 && CurrentPosition < HbarArray.length) {
          CurrentPosition = parentposition;
          lswap = false;
          fswap = false;

          try {
            StartHeapSort();
          } catch (error) {
            
            clearInterval(timeoutfunc);
          }
        } else if (traversed < size - 1) {
          traversed++;
          CurrentPosition = 1;
          let node = HbarArray.shift();
          node.sortedbar();
          ShiftedBars.push(node);
          ShiftedBars[ShiftedBars.length - 1]._index = ShiftedBars.length - 1;

          for (let a = 0; a < HbarArray.length; a++) {
            HbarArray[a]._index = a;
          }


          lswap = false;
          fswap = false;
          try {
            StartHeapSort();
          } catch (error) {
            
            clearInterval(timeoutfunc);
          }
        } else {
          lswap = false;
          fswap = false;
          HbarArray[CurrentPosition - 1].sortedbar();
          traversed = 0;
          CurrentPosition = 1;
        }

        clearInterval(timeoutfunc);
      }
    }, time);
  } else {
    HbarArray[CurrentPosition].unmark();

    CurrentPosition++;

    if (traversed < size - 1 && CurrentPosition < HbarArray.length) {
      lswap = false;
      fswap = false;
      try {
        StartHeapSort();
      } catch (error) {
        
      }
    } else if (traversed < size - 1) {
      traversed++;
      CurrentPosition = 1;
      let node = HbarArray.shift();
      node.sortedbar();
      ShiftedBars.push(node);
      ShiftedBars[ShiftedBars.length - 1]._index = ShiftedBars.length - 1;

      for (let a = 0; a < HbarArray.length; a++) {
        HbarArray[a]._index = a;
      }

      lswap = false;
      fswap = false;
      try {
        StartHeapSort();
      } catch (error) {
        
      }
    } else {
      HbarArray[CurrentPosition - 1].sortedbar();
      lswap = false;
      fswap = false;
      traversed = 0;
      CurrentPosition = 1;
    }
  }
};

heapSortBtn.onclick = function () {
  size = HbarArray.length;
  traversed = 0;
  CurrentPosition = 1;
  lswap = false;
  fswap = false;
  StartHeapSort();
};

slider.oninput = () => {
  ViewIndex = 0;

  fswap = false;
  lswap = false;

  let lap = 0.25;
  let range = slider.value;

  UpdateCanvasArea();
  n = minNum + parseInt(range) * ((maxNum - minNum) / 100);

  time = 80 - parseInt(range) * (80 / 100);
  // time = 0;
  // console.log("time is " + time);

  GeneralSpeed = 10 + parseInt(range) * ((500 - 10) / 100);
  // jump = 2;
  jump = 2 + Math.floor(parseInt(range) * ((10 - 2) / 100));
  i = 0;
  j = 0;
  len = j + jump;

  hbarwidith = maxWidth - parseInt(range) * ((maxWidth - minWidth) / 100);

  let fullwid = hbarwidith * n;
  let lapse = fullwid - canvas._width;

  if (fullwid > canvas._width - 400) {
    n = Math.floor((canvas._width / hbarwidith) * 0.85);
  }

  err = minErr + parseInt(range) * ((maxErr - minErr) / 100);
  midpoint = canvas._width * 0.5;

  GenerateNewArray();

  traversed = 0;
  CurrentPosition = traversed;
  size = HbarArray.length;
  halves = HbarArray.length;
};

document.getElementById("canvas").addEventListener("mousemove", (event) => {
  let x = event.offsetX;
  let y = event.offsetY;

  let found = false;
  let min = HbarArray[0]._x;
  let max = HbarArray[HbarArray.length - 1]._x;
  let closest;

  if (ShiftedBars.length > 0) {
    let foundInHeap = false;
    let minsize = ShiftedBars.length;

    for (let j = 0; j < ShiftedBars.length && !foundInHeap; ) {
      let nx = ShiftedBars[j]._x;

      if (Math.abs(x - nx) < hbarwidith) {
        
        closest = ShiftedBars[j];
        ViewIndex = ShiftedBars[j]._index;
        foundInHeap = true;
        ViewFromHeap = true;
        
        j = ShiftedBars.length;
      } else {
        j++;
      }
    }

    if (foundInHeap) {
      return;
    }
  }

  for (let i = 0; i < HbarArray.length && !found; ) {
    let nx = HbarArray[i]._x;
    if (Math.abs(x - nx) < hbarwidith) {
      closest = HbarArray[i];
      ViewIndex = HbarArray[i]._index;
      found = true;
      i = HbarArray.length;
    } else {
      i++;
    }
  }
});

const CameraView = setInterval(() => {
  ctxnav.clearRect(0, 0, 350, 250);
  UpdateNavigator();

  let bar = 69;
  let view = 0;

  if (!ViewFromHeap) {
    if (ViewIndex >= 2 && ViewIndex <= n) {
      view = ViewIndex - 2;
    }

    if (ViewIndex >= HbarArray.length - 2) {
      view = ViewIndex - 4;
    }
  } else {
    if (ViewIndex >= 2 && ViewIndex <= n) {
      view = ViewIndex - 2;
    }
  }

  let barlapse = 0;

  if (ShiftedBars.length > 0) {
    view--;

    for (let i = 0; i < 5; i++) {
      view++;
      if (view >= ShiftedBars.length) {
        barlapse = view;
        let ylength = 400;
        let xcoord =
          navigator._width * 0.5 -
          Math.floor(bar * 0.5) -
          bar * Math.floor(5 * 0.5) +
          bar * i; 
        ctxnav.fillStyle = HbarArray[view - barlapse].color;
        ctxnav.fillRect(xcoord, 30, bar, ylength);
        ctxnav.strokeStyle = "#ffb";
        ctxnav.lineWidth = 3;
        ctxnav.strokeRect(xcoord, 31, bar, ylength);

        ctxnav.fillStyle = "#ffb";
        ctxnav.font = 20 + "px consolas";
        ctxnav.fillText(
          HbarArray[view - barlapse]._hg,
          xcoord + bar * 0.25,
          70
        );
      } else {
        let ylength = 400;
        let xcoord =
          navigator._width * 0.5 -
          Math.floor(bar * 0.5) -
          bar * Math.floor(5 * 0.5) +
          bar * i; 
        ctxnav.fillStyle = ShiftedBars[view].color;
        ctxnav.fillRect(xcoord, 30, bar, ylength);
        ctxnav.strokeStyle = "#ffb";
        ctxnav.lineWidth = 3;
        ctxnav.strokeRect(xcoord, 31, bar, ylength);

        ctxnav.fillStyle = "#ffb";
        ctxnav.font = 20 + "px consolas";
        ctxnav.fillText(ShiftedBars[view]._hg, xcoord + bar * 0.25, 70);
      }
    }

    return;
  }

  for (let i = 0; i < 5; i++) {
    let ylength = 400;
    let xcoord =
      navigator._width * 0.5 -
      Math.floor(bar * 0.5) -
      bar * Math.floor(5 * 0.5) +
      bar * i; 
    ctxnav.fillStyle = HbarArray[view].color;
    ctxnav.fillRect(xcoord, 30, bar, ylength);
    ctxnav.strokeStyle = "#ffb";
    ctxnav.lineWidth = 3;
    ctxnav.strokeRect(xcoord, 31, bar, ylength);

    ctxnav.fillStyle = "#ffb";
    ctxnav.font = 20 + "px consolas";
    ctxnav.fillText(HbarArray[view]._hg, xcoord + bar * 0.25, 70);

    view++;
  }
}, 100);

const MergeBubbleSort = (HbarArray, start, end) => {
  // j = start;
  let posax = Math.floor(HbarArray[j]._x);
  let posbx = Math.floor(HbarArray[j + 1]._x);

  HbarArray[j].mark();
  HbarArray[j + 1].mark();

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

        if (j < end - (i + 1)) {
          lswap = false;
          fswap = false;
          try {
            StartBubbleSort(HbarArray, start, end);
          } catch (error) {
            alert("sorted ienixxnd");
          }
        } else if (i < end) {
          lswap = false;
          fswap = false;
          HbarArray[j].sortedbar();
          i++;
          // size = HbarArray.length - traversed;
          j = start;
          try {
            StartBubbleSort(HbarArray, start, end);
          } catch (error) {
            // alert("sorted ienaaaaind");
          }
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
    if (j < end - (i + 1)) {
      lswap = false;
      fswap = false;
      try {
        StartBubbleSort(HbarArray, start, end);
      } catch (error) {
        // alert("sorted ienind");
      }
    } else if (i < end) {
      HbarArray[j].sortedbar();
      i++;
      // size = HbarArray.length - traversed;
      j = start;
      lswap = false;
      fswap = false;
      try {
        StartBubbleSort(HbarArray, start, end);
      } catch (error) {
        // alert("end herer");
      }
    } else {
      console.log("sorted here");
      // alert("sorted");
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

const QuickSort = (init_start, init_end) => {

    FinalSortedConfig = false;
    let SortVectorStatus = [];

    const partition = (start, end, pi) => {

        let sorted = false;
        let a = pi - start;
        let b = end - (pi + 1);

        if (a > 1) {
            SortVectorStatus.push("IsSorting");
            // console.log("caling fsort pi : " + pi + ", start: " + start);
            sorted = sort(start, pi);
        } else {
            sorted = true;
        }

        if (b > 1) {
            SortVectorStatus.push("IsSorting");
            // console.log("caling lsort pi : " + (pi + 1) + ", start: " + end);
            let obvalue = sort(pi + 1, end);
        }

        if (a <= 1 && b <= 1) {
            HbarArray[start].sortedbar();
            HbarArray[pi].sortedbar();

        }

    }

    const checkVectorStatus = setInterval(() => {
        if (SortVectorStatus.length == 0 && !FinalSortedConfig) {

            FinalSortedConfig = true;
            clearInterval(checkVectorStatus);

            StartBubbleSort(HbarArray, 0, HbarArray.length);

            for (let i = 0; i < HbarArray.length; i++) {
                HbarArray[i].sortedbar();
            }
        }
    }, 0);

    const sort = (start, end) => {

        let isFinished = false;
        let j = start;
        let pi = end - 1;
        let isGreaterFound = false;
        let posax = 0;
        let posbx = 0;
        let gi;

        HbarArray[pi].misplaced();

        const quickInterval = () => {

            // console.log("calling quick interval 1");
            let chmoda = false;
            let chmodb = false;

            let fnum = HbarArray[j]._hg;

            if (fnum < HbarArray[pi]._hg) {
                if (!isGreaterFound) {

                    gi = j;
                    posax = HbarArray[j]._x;
                    isGreaterFound = true;
                    HbarArray[j].mark();

                    j++;
                    if (j < end) {
                        console.log("calling quick interval 2");
                        quickInterval();
                    } else {
                        HbarArray[pi].sortedbar();
                        HbarArray[j - 1].sortedbar();
                        partition(start, end, pi);
                    }
                } else {
                    j++;
                    if (j < end) {
                        console.log("calling quick interval 3");
                        quickInterval();
                    } else {
                        HbarArray[pi].sortedbar();
                        HbarArray[j - 1].sortedbar();
                        partition(start, end, pi);
                    }
                }
            } else if (fnum > HbarArray[pi]._hg) {
                if (isGreaterFound) {

                    HbarArray[j].mark();
                    posbx = HbarArray[j]._x;

                    if (posax < posbx) {
                        console.log("true swap");
                    } else {
                        console.log("false swap");
                    }

                    let index = HbarArray[gi]._index;
                    HbarArray[gi]._index = HbarArray[j]._index;
                    HbarArray[j]._index = index;

                    const Id = setInterval(() => {
                        UpdateCanvasArea();
                        HbarArray[gi].moveTo(posbx, Id);

                        if (HbarArray[gi]._x !== posbx) {
                            chmoda = false;
                        } else {
                            chmoda = true;
                            clearInterval(Id);
                        }

                    }, time);

                    const Id2 = setInterval(() => {
                        UpdateCanvasArea();
                        HbarArray[j].moveFrom(posax, Id2);

                        if (HbarArray[j]._x !== posax) {
                            chmodb = false;
                        } else {
                            chmodb = true;
                            clearInterval(Id2);
                        }

                    }, time);

                    const timeoutfunc = setInterval(() => {

                        if (chmoda && chmodb) {

                            let obj = HbarArray[gi];
                            HbarArray[gi] = HbarArray[j];
                            HbarArray[j] = obj;

                            // HbarArray[gi].unmark();
                            // HbarArray[j].unmark();

                            isGreaterFound = false;

                            if (j !== pi) {
                                j = gi;
                                j++;
                                if (j < end) {
                                    console.log("calling quick interval 4");
                                    quickInterval();
                                } else {
                                    HbarArray[pi].sortedbar();
                                    HbarArray[j - 1].sortedbar();
                                    partition(start, end, pi);
                                }
                            } else {
                                HbarArray[pi].sortedbar();
                                pi = gi;
                                HbarArray[pi].sortedbar();
                                isFinished = true;
                                partition(start, end, pi);
                            }

                            clearInterval(timeoutfunc);
                        }

                    }, time);
                } else {
                    j++;
                    if (j < end) {
                        console.log("calling quick interval 5");
                        quickInterval();
                    } else {
                        HbarArray[pi].sortedbar();
                        HbarArray[j - 1].sortedbar();
                        partition(start, end, pi);
                    }
                }
            } else if (fnum == HbarArray[pi]._hg) {
                if (isGreaterFound) {

                    console.log("==========");

                    HbarArray[j].mark();

                    posbx = HbarArray[j]._x;

                    let index = HbarArray[gi]._index;
                    HbarArray[gi]._index = HbarArray[j]._index;
                    HbarArray[j]._index = index;

                    chmoda = false;
                    chmodb = false;

                    const Id = setInterval(() => {
                        UpdateCanvasArea();
                        HbarArray[gi].moveTo(posbx, Id);

                        if (HbarArray[gi]._x !== posbx) {
                            chmoda = false;
                        } else {
                            chmoda = true;
                            // alert("srtopa ");
                            UpdateCanvasArea();
                            clearInterval(Id);
                        }

                    }, time);

                    const Id2 = setInterval(() => {
                        UpdateCanvasArea();
                        HbarArray[j].moveFrom(posax, Id2);

                        if (HbarArray[j]._x !== posax) {
                            chmodb = false;
                        } else {
                            chmodb = true;
                            UpdateCanvasArea();
                            // alert("srtopb ");
                            clearInterval(Id2);
                        }

                    }, time);

                    const timeoutfunc = setInterval(() => {

                        if (chmoda && chmodb) {

                            clearInterval(timeoutfunc);

                            // alert("stop swap");

                            let obj = HbarArray[gi];
                            HbarArray[gi] = HbarArray[j];
                            HbarArray[j] = obj;

                            isGreaterFound = false;
                            //pi = gi;

                            if (j !== pi) {

                                j = gi;
                                j++;
                                if (j < end) {
                                    console.log("calling quick interval 6");
                                    quickInterval();
                                } else {
                                    HbarArray[pi].sortedbar();
                                    HbarArray[j - 1].sortedbar();
                                    partition(start, end, pi);
                                }
                            } else {
                                // alert("okkssy");
                                console.log("===");
                                HbarArray[pi].sortedbar();
                                pi = gi;
                                HbarArray[pi].sortedbar();
                                isFinished = true;
                                // isGreaterFound = true;

                                partition(start, end, pi);
                            }

                        }

                    }, time);

                } else {
                    if (true) {
                        HbarArray[pi].sortedbar();
                        isFinished = true;
                        partition(start, end, pi);
                    }
                }
            } else {
                HbarArray[pi].sortedbar();
                isFinished = true;
                partition(start, end, pi);
            }
        }

        const isFinishedIntervalFunc = setInterval(() => {
            if (isFinished) {
                SortVectorStatus.pop();
                clearInterval(isFinishedIntervalFunc);
                return true;
            }
        }, time);

        quickInterval();
    }

    partition(init_start, init_end, init_end);
}

const quickSort = (init_start, init_end) => {
  IsBubbleSorted = false;
  FinalSortedConfig = false;
  let SortVectorStatus = [];

  const partition = (start, end, pi) => {
    let sorted = false;
    let a = pi - start;
    let b = end - (pi + 1);

    if (a > 1) {
      SortVectorStatus.push("IsSorting");
      try {
        sorted = sort(start, pi);
      } catch (error) {}
    } else {
      sorted = true;
    }

    if (b > 1) {
      SortVectorStatus.push("IsSorting");
      try {
        let obvalue = sort(pi + 1, end);
      } catch (error) {}
    }

    if (a <= 1 && b <= 1) {
      HbarArray[start].sortedbar();
      HbarArray[pi].sortedbar();
    }
  };

  const checkVectorStatus = setInterval(() => {
    if (SortVectorStatus.length == 0 && !FinalSortedConfig) {
      FinalSortedConfig = true;

      for (let i = 0; i < init_end; i++) {
        HbarArray[i].sortedbar();
      }

      clearInterval(checkVectorStatus);

      IsBubbleSorted = true;
    }
  }, 0);

  const sort = (start, end) => {
    let isFinished = false;
    let j = start;
    let pi = end - 1;
    let isGreaterFound = false;
    let posax = 0;
    let posbx = 0;
    let gi;

    HbarArray[pi].misplaced();

    const quickInterval = () => {
      let chmoda = false;
      let chmodb = false;

      let fnum = HbarArray[j]._hg;

      if (fnum < HbarArray[pi]._hg) {
        if (!isGreaterFound) {
          gi = j;
          posax = HbarArray[j]._x;
          isGreaterFound = true;
          HbarArray[j].mark();

          j++;
          if (j < end) {
            try {
              quickInterval();
            } catch (error) {}
          } else {
            HbarArray[pi].sortedbar();
            HbarArray[j - 1].sortedbar();
            partition(start, end, pi);
          }
        } else {
          j++;
          if (j < end) {
            try {
              quickInterval();
            } catch (error) {}
          } else {
            HbarArray[pi].sortedbar();
            HbarArray[j - 1].sortedbar();
            partition(start, end, pi);
          }
        }
      } else if (fnum > HbarArray[pi]._hg) {
        if (isGreaterFound) {
          HbarArray[j].mark();
          posbx = HbarArray[j]._x;

          let index = HbarArray[gi]._index;
          HbarArray[gi]._index = HbarArray[j]._index;
          HbarArray[j]._index = index;

          const Id = setInterval(() => {
            UpdateCanvasArea();
            HbarArray[gi].moveTo(posbx, Id);

            if (HbarArray[gi]._x !== posbx) {
              chmoda = false;
            } else {
              chmoda = true;
              clearInterval(Id);
            }
          }, time);

          const Id2 = setInterval(() => {
            UpdateCanvasArea();
            HbarArray[j].moveFrom(posax, Id2);

            if (HbarArray[j]._x !== posax) {
              chmodb = false;
            } else {
              chmodb = true;
              clearInterval(Id2);
            }
          }, time);

          const timeoutfunc = setInterval(() => {
            if (chmoda && chmodb) {
              let obj = HbarArray[gi];
              HbarArray[gi] = HbarArray[j];
              HbarArray[j] = obj;

              // HbarArray[gi].unmark();
              // HbarArray[j].unmark();

              isGreaterFound = false;

              if (j !== pi) {
                j = gi;
                j++;
                if (j < end) {
                  try {
                    quickInterval();
                  } catch (error) {}
                } else {
                  HbarArray[pi].sortedbar();
                  HbarArray[j - 1].sortedbar();
                  partition(start, end, pi);
                }
              } else {
                HbarArray[pi].sortedbar();
                pi = gi;
                HbarArray[pi].sortedbar();
                isFinished = true;
                partition(start, end, pi);
              }

              clearInterval(timeoutfunc);
            }
          }, time);
        } else {
          j++;
          if (j < end) {
            try {
              try {
                quickInterval();
              } catch (error) {}
            } catch (error) {}
          } else {
            HbarArray[pi].sortedbar();
            HbarArray[j - 1].sortedbar();
            partition(start, end, pi);
          }
        }
      } else if (fnum == HbarArray[pi]._hg) {
        if (isGreaterFound) {
          HbarArray[j].mark();

          posbx = HbarArray[j]._x;

          let index = HbarArray[gi]._index;
          HbarArray[gi]._index = HbarArray[j]._index;
          HbarArray[j]._index = index;

          const Id = setInterval(() => {
            UpdateCanvasArea();
            HbarArray[gi].moveTo(posbx, Id);

            if (HbarArray[gi]._x !== posbx) {
              chmoda = false;
            } else {
              chmoda = true;
              clearInterval(Id);
            }
          }, time);

          const Id2 = setInterval(() => {
            UpdateCanvasArea();
            HbarArray[j].moveFrom(posax, Id2);

            if (HbarArray[j]._x !== posax) {
              chmodb = false;
            } else {
              chmodb = true;
              clearInterval(Id2);
            }
          }, time);

          const timeoutfunc = setInterval(() => {
            if (chmoda && chmodb) {
              let obj = HbarArray[gi];
              HbarArray[gi] = HbarArray[j];
              HbarArray[j] = obj;

              // HbarArray[gi].unmark();
              // HbarArray[j].unmark();

              isGreaterFound = false;

              if (j !== pi) {
                j = gi;
                j++;
                if (j < end) {
                  try {
                    quickInterval();
                  } catch (error) {}
                } else {
                  HbarArray[pi].sortedbar();
                  HbarArray[j - 1].sortedbar();
                  partition(start, end, pi);
                }
              } else {
                HbarArray[pi].sortedbar();
                pi = gi;
                HbarArray[pi].sortedbar();
                isFinished = true;

                partition(start, end, pi);
              }

              clearInterval(timeoutfunc);
            }
          }, time);
        } else {
          if (true) {
            HbarArray[pi].sortedbar();
            isFinished = true;
            partition(start, end, pi);
          }
        }
      } else {
        HbarArray[pi].sortedbar();
        isFinished = true;
        partition(start, end, pi);
      }
    };

    const isFinishedIntervalFunc = setInterval(() => {
      if (isFinished) {
        SortVectorStatus.pop();
        clearInterval(isFinishedIntervalFunc);
        return true;
      }
    }, time);

    quickInterval();
  };

  partition(init_start, init_end, init_end);
};

mergeSortBtn.onclick = function () {
  let IsMergeSorted = 0;

  const MergeFunction = () => {
    IsBubbleSorted = false;

    let scp = HbarArray.length - j;

    if (len > HbarArray.length) {
      len = HbarArray.length;
    } else if (len + jump > HbarArray.length) {
      len = HbarArray.length;
    }

    if (halves > 1) {
      quickSort(j, len);
    }

    UpdateCanvasArea();

    for (let i = 0; i < HbarArray.length; i++) {
      HbarArray[i].sortedbar();
    }

    const checkSortFinish = setInterval(() => {
      if (IsBubbleSorted) {
        if (len == HbarArray.length) {
          halves = Math.floor(HbarArray.length / jump);

          if (halves > 1) {
            
            jump *= 2;
            j = 0;
            i = 0;
            len = j + jump;

            try {
              MergeFunction();
            } catch (error) {
            }
          } else {
            for (let i = 0; i < HbarArray.length; i++) {
              HbarArray[i].sortedbar();
            }

            clearInterval(checkSortFinish);
            IsBubbleSorted = false;

            time = 50;
            MergeBubbleSort(HbarArray, j, len);

            UpdateCanvasArea();
          }
        } else {
          clearInterval(checkSortFinish);
          j += jump;

          len = len + jump;

          i = 0;

          try {
            MergeFunction();
          } catch (error) {
          }
        }
      }
    }, time);
  };

  try {
    MergeFunction();
  } catch (error) {
    UpdateCanvasArea();
  }
};

quickSortBtn.onclick = function () {
  QuickSort(0, HbarArray.length);
};