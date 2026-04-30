let video;
let webcam;
let detector;
let source;
let detections = [];
let rick;

function preload(){
  detector = ml5.objectDetection("cocossd");
}

// Callback function is called each time the object detector finishes processing a frame.
function gotDetections(results) {
  // Update detections array with the new results
  detections = results;  
}

function setup() {
  createCanvas(640, 480);
  
  // Load and loop the video for object detection
  video = createVideo('never.mp4'); // video sized 640 x 480
  video.size(640, 480);
  video.volume(0);
  video.hide();
  video.loop();

  webcam = createCapture(VIDEO);
  webcam.size(640, 480);
  webcam.hide();

  rick = false;
  source = webcam;
  detector.detectStart(source, gotDetections);
  video.stop();
}

function draw(){
    background(255);
    image(source, 0, 0, width, height); 

    let scaleX = width / source.width;
    let scaleY = height / source.height;

  for (let i = 0; i < detections.length; i++) {
    let detection = detections[i];

    let x = detection.x * scaleX;
    let y = detection.y * scaleY;
    let w = detection.width * scaleX;
    let h = detection.height * scaleY;

    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(x, y, w, h);

    noStroke();
    fill(255);
    textSize(18);
    text(detection.label, x + 5, y + 20);
  }

  stroke(3);
  text("click anywhere to swap source", 5,20);
}

function mouseClicked() {
    detector.detectStop();
    if (rick) {
        video.pause();
        source = webcam;
        rick = false;
    } else {
        video.loop();
        source = video;
        video.volume(1);
        rick = true;
    }
    detections=[];
    setTimeout(() => { detector.detectStart(source, gotDetections);}, 150);
}
