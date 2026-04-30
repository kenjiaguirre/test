let classifier;
let xRandom; 
let yRandom;

let words = [
  "up",
  "down",
  "left",
  "right",
];

let predictedWord = "";
let song;

function preload() {
  let options = { probabilityThreshold: 0.7 };
  classifier = ml5.soundClassifier("SpeechCommands18w", options);
  song = loadSound('dababy.mp3');
}

function setup() {
  createCanvas(650, 450);
  classifier.classifyStart(gotResult);
  xRandom = random(0, 561);
  yRandom = random(0, 361);
}

let x=300;
let y=200;

function draw() {
  background(250);
  if (predictedWord !== "") {
    fill(211, 107, 255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text(predictedWord, width / 2, 90);
  }   

  fill("blue");
  square(xRandom,yRandom,80);


  fill("red");
  square(x,y,50);

  if(predictedWord === "up"){
    if(y<=0){
        y=y
    }else{
        y = y - 1;
    }
  }else if(predictedWord === "down"){
    if(y>=450){
        y=y;
    }else{
        y = y + 1;
    }
  }
  else if(predictedWord === "right"){
    if(x>=600){
        x=x;
    }else{
        x = x + 1;
    }
  }
  else if(predictedWord === "left"){
    if(x<=0){
        x=x;
    }else{
        x = x - 1;
    }
  }

  if(xRandom<=x && x <= xRandom+30 && yRandom<=y && y<=yRandom+30){
    xRandom = random(0, 561);
    yRandom = random(0, 361);
    if (song.isPlaying()) {
        song.stop();
    } else {
        song.play();
    }
  }


}

// Function to display the 18 words on the canvas

// A function to run when we get any errors and the results
function gotResult(results) {
  console.log(results);
  predictedWord = results[0].label;
}
