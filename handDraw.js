let handPose;
let video;
let color;
let trails = [];
let hands = [];
let tipX8 = 0;
let tipY8 = 0;
let circleColor = "red";

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

let cWidth = 640;
let rectWidth = 640/5;

function setup() {
    createCanvas(cWidth, 480);
    
    // Create the video and hide it
    video = createCapture(VIDEO);
    video.size(cWidth, 480);
    video.hide();

    //start detecting hands from the webcam video
    handPose.detectStart(video, gotHands);
}

function draw() {

    background("white");

    for (let i = 0; i < trails.length; i++) {
        noStroke();
        if(trails[i].color==="white"){
            fill("white");
        }else if(trails[i].color==="red"){
            fill("red");
        }else if(trails[i].color==="yellow"){
            fill("yellow");
        }else if(trails[i].color==="green"){
            fill("green");
        }else if(trails[i].color==="blue"){
            fill("blue");
        }

        if(trails[i].color==="white"){
            circle(trails[i].x, trails[i].y,50);
        }else{
            circle(trails[i].x, trails[i].y,20);
        }
    }

    stroke(5)
    fill("white");
    rect(0,0,rectWidth,100);
    fill("red");
    rect(rectWidth,0,rectWidth,100);
    fill("yellow");
    rect(rectWidth*2,0,rectWidth,100);
    fill("green");
    rect(rectWidth*3,0,rectWidth,100);
    fill("blue");
    rect(rectWidth*4,0,rectWidth,100);

    let px=tipX8;
    let py=tipY8;
    
    if (px > 0 && px < rectWidth && py > 0 && py < 100) {
        circleColor="white";    
    }else if (px > rectWidth && px < rectWidth*2 && py > 0 && py < 100){
        circleColor="red";
    }else if (px > rectWidth*2 && px < rectWidth*3 && py > 0 && py < 100){
        circleColor="yellow";
    }else if (px > rectWidth*3 && px < rectWidth*4 && py > 0 && py < 100){
        circleColor="green";
    }else if (px > rectWidth*4 && px < rectWidth*5 && py > 0 && py < 100){
        circleColor="blue";
    }

    if (hands.length>0){
        fill(circleColor);
        tipX8=hands[0].keypoints[8].x;
        tipY8=hands[0].keypoints[8].y;
        if(circleColor==="white"){
            circle(tipX8,tipY8,50);
        }else{
            circle(tipX8, tipY8, 20);
        }
    }

    

    if (mouseIsPressed) {
        trails.push({x: tipX8, y: tipY8, color: circleColor});
    }

}
