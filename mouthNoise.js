let osc, playing, freq, amp;
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
  osc = new p5.Oscillator('sine');
}

function mousePressed(){
  osc.start();
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);
  
  osc.freq(freq);
  osc.amp(amp);

  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 5);
      /*push();
        stroke(0);
        fill("white");
        strokeWeight(0);
        textSize(10);
        text(j,keypoint.x,keypoint.y)
      pop();*/
      
    }
  }
  
  if(faces.length>0){
    let x13 = faces[0].keypoints[13].x;
    let y13 = faces[0].keypoints[13].y;
    let x14 = faces[0].keypoints[14].x;
    let y14 = faces[0].keypoints[14].y;
    let length = dist(x13,y13,x14,y14);
    
    stroke("black");
    fill("white");
    strokeWeight(3);
    text(length,50,50)
    
    stroke('magenta');
    strokeWeight(5);
    line(x13, y13, x14, y14); 
    
    freq = length*20;
    amp = length*10;
  }
  
  
  
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}
