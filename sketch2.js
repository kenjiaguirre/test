// Middle C frequency.
let myFreq = 262;

// Array of frequencies in C Major.
let frequencies = [
  myFreq,
  myFreq * 9/8,
  myFreq * 5/4,
  myFreq * 4/3,
  myFreq * 3/2,
  myFreq * 5/3,
  myFreq * 15/8,
myFreq * 2
];

// Empty array for oscillator objects.
let osc;
let oscillators = [];

//empty array for rectangle objects.
let rects = [];

// number of notes that can be played (equal to the number of frequencies/oscillators)
let numNotes = frequencies.length;

// canvas width
let cWidth = 400;

let keyWidth = cWidth/numNotes;

function setup() {
  createCanvas(cWidth, 400);

  // Initialize oscillators and place in oscillators array.
  for (let freq of frequencies) {
    osc = new p5.Oscillator(freq);
    oscillators.push(osc);
  }

  //set color mode to HSB (better for using notes to color keys)
  colorMode(HSB);
  createMelody();

  console.table(rects);

}

function createMelody(){
  for (let i = 0; i < numNotes; i ++) {
    //set x for each element
    let rectX = i * keyWidth;
    let rectY = keyWidth*3; // y 3x width
    
    // Draw a rounded key.
    rect(rectX, rectY, keyWidth, keyWidth*2, 10);

    //put properties into an object
    let properties = {
      x: rectX,
      y: rectY,
      width: keyWidth,
      height: keyWidth*2,
    }
    rects.push(properties);

  }
}

// User Interface
function drawMelody() {
  for(let i = 0; i<rects.length; i++){
    fill("white");
    rect(rects[i].x,rects[i].y,rects[i].width,rects[i].height,10)
  }
}

function mousePressed() {
  /*if (osc.started) {
  osc.stop();
  } else {
  osc.start();
  }*/
}

let playing = false;
let john = false
let freq;

function draw() {
  background(255);
  drawMelody();
  fill("black");
  text(`x: ${mouseX} y: ${mouseY} freq: ${freq}`, 50, 50);

  let w = rects[0].width;
  let h = rects[0].height;
  osc.freq(freq);
  
  if (mouseX > rects[0].x && mouseX < rects[0].x + w && mouseY > rects[0].y && mouseY < rects[0].y + h) {
    fill("#FF6599"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[0].x,rects[0].y,w,h,10)
    freq = frequencies[0];
    playing = true;
  } else if (mouseX > rects[1].x && mouseX < rects[1].x + w && mouseY > rects[1].y && mouseY < rects[1].y + h) {
    fill("#ff0000"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[1].x,rects[1].y,w,h,10)
    freq = frequencies[1];
    playing = true;
  } else if (mouseX > rects[2].x && mouseX < rects[2].x + w && mouseY > rects[2].y && mouseY < rects[2].y + h) {
    fill("#FF8E00"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[2].x,rects[2].y,w,h,10)
    freq = frequencies[2];
    playing = true;
  } else if (mouseX > rects[3].x && mouseX < rects[3].x + w && mouseY > rects[3].y && mouseY < rects[3].y + h) {
    fill("#FFFF00"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[3].x,rects[3].y,w,h,10)
    freq = frequencies[3];
    playing = true;
  } else if (mouseX > rects[4].x && mouseX < rects[4].x + w && mouseY > rects[4].y && mouseY < rects[4].y + h) {
    fill("#008E00"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[4].x,rects[4].y,w,h,10)
    freq = frequencies[4];
    playing = true;
  } else if (mouseX > rects[5].x && mouseX < rects[5].x + w && mouseY > rects[5].y && mouseY < rects[5].y + h) {
    fill("#00C0C0"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[5].x,rects[5].y,w,h,10)
    freq = frequencies[5];
    playing = true;
  } else if (mouseX > rects[6].x && mouseX < rects[6].x + w && mouseY > rects[6].y && mouseY < rects[6].y + h) {
    fill("#400098"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[6].x,rects[6].y,w,h,10)
    freq = frequencies[6];
    playing = true;
  } else if (mouseX > rects[7].x && mouseX < rects[7].x + w && mouseY > rects[7].y && mouseY < rects[7].y + h) {
    fill("#8E008E"); // Red if hovering
    cursor(HAND);     // Change cursor to hand
    rect(rects[7].x,rects[7].y,w,h,10)
    freq = frequencies[7];
    playing = true;
  } else {
    fill(255);       // White if not hovering
    cursor(ARROW);    // Default arrow cursor
    playing = false;
  }

  if (playing && !john){
    john = true;
    osc.start();
  } else if (!playing && john){
    john = false;
    osc.stop();
  }
  
}