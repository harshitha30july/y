status = "";
object = [];

function preload() {
    img = loadImage("AQUARIUM.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("modal loaded");
    status = "true";
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects detected";
            console.log(object[i].label);
            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " %", object[i].x+15, object[i].y+15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }



}