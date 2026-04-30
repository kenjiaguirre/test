let handPose;
let video;
let hands = [];
let px;
let py;
let tipX8 = 0;
let tipY8 = 0;

let options = {
  maxHands: 1,
    flipped: true,
};

function preload() {
  handPose = ml5.handPose(options);
}

// Callback function for when handPose outputs data
function gotHands(results) {
    // Save the output to the hands variable
    hands = results;
}

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
let cWidth = 640;

let keyWidth = cWidth/numNotes;

function setup() {
  createCanvas(cWidth, 480);

video = createCapture(VIDEO);
video.size(cWidth, 480);
video.hide();

//start detecting hands from the webcam video
handPose.detectStart(video, gotHands);

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
    stroke("black");
    strokeWeight(1);
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

    px = tipX8;
    py = tipY8;

    
    push();
    translate(width, 0); // Move canvas to the right
    scale(-1, 1);       // Flip the x-axis
    image(video, 0, 0, width, height); // Draw video
    pop();

    drawMelody();

    let w = rects[0].width;
    let h = rects[0].height;
    osc.freq(freq);

      if (px > rects[0].x && px < rects[0].x + w && py > rects[0].y && py < rects[0].y + h) {
    fill("#FF6599"); // Red if hovering
    rect(rects[0].x,rects[0].y,w,h,10)
    freq = frequencies[0];
    playing = true;
  } else if (px > rects[1].x && px < rects[1].x + w && py > rects[1].y && py < rects[1].y + h) {
    fill("#ff0000"); // Red if hovering
    rect(rects[1].x,rects[1].y,w,h,10)
    freq = frequencies[1];
    playing = true;
  } else if (px > rects[2].x && px < rects[2].x + w && py > rects[2].y && py < rects[2].y + h) {
    fill("#FF8E00"); // Red if hovering
    rect(rects[2].x,rects[2].y,w,h,10)
    freq = frequencies[2];
    playing = true;
  } else if (px > rects[3].x && px < rects[3].x + w && py > rects[3].y && py < rects[3].y + h) {
    fill("#FFFF00"); // Red if hovering
    rect(rects[3].x,rects[3].y,w,h,10)
    freq = frequencies[3];
    playing = true;
  } else if (px > rects[4].x && px < rects[4].x + w && py > rects[4].y && py < rects[4].y + h) {
    fill("#008E00"); // Red if hovering
    rect(rects[4].x,rects[4].y,w,h,10)
    freq = frequencies[4];
    playing = true;
  } else if (px > rects[5].x && px < rects[5].x + w && py > rects[5].y && py < rects[5].y + h) {
    fill("#00C0C0"); // Red if hovering
    rect(rects[5].x,rects[5].y,w,h,10)
    freq = frequencies[5];
    playing = true;
  } else if (px > rects[6].x && px < rects[6].x + w && py > rects[6].y && py < rects[6].y + h) {
    fill("#400098"); // Red if hovering
    rect(rects[6].x,rects[6].y,w,h,10)
    freq = frequencies[6];
    playing = true;
  } else if (px > rects[7].x && px < rects[7].x + w && py > rects[7].y && py < rects[7].y + h) {
    fill("#8E008E"); // Red if hovering
    rect(rects[7].x,rects[7].y,w,h,10)
    freq = frequencies[7];
    playing = true;
  } else {
    fill(255);       // White if not hovering
    playing = false;
  }

    if (playing && !john){
        john = true;
        osc.start();
    } else if (!playing && john){
        john = false;
        osc.stop();
    }

    // Draw all the tracked hand points
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
            let keypoint = hand.keypoints[j];
            //for numbers

            //for circles
            fill(0, 255, 0);
            noStroke();
            circle(keypoint.x, keypoint.y, 10);

            if (j == 8) {
                tipX8 = keypoint.x;
                tipY8 = keypoint.y;
                fill('red');
                circle(tipX8, tipY8, 10, 10);
            }
        }
    }


    fill("black");
    rect(80,30,180,60);
    fill("white");
    text("Indexfinger x position " + nfc(px, 0), 100, 50);
    text("Indexfinger y position " + nfc(py, 0), 100, 65);
    text(`frequency: ${freq}`, 100, 80);
  
}
