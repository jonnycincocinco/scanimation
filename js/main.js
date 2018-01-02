var anims = [
  [
    "img/j1.png",
    "img/j2.png",
    "img/j3.png",
    "img/j4.png",
    "img/j5.png",
    "img/j6.png",
    "img/j7.png"
  ],
[
  "img/ring/ring_00000.png",
  "img/ring/ring_00006.png",
  "img/ring/ring_00009.png",
  "img/ring/ring_00012.png",
  "img/ring/ring_00015.png",
  "img/ring/ring_00021.png",
  "img/ring/ring_00024.png",
  "img/ring/ring_00030.png",
  "img/ring/ring_00036.png",
  "img/ring/ring_00042.png"
],
[
  "img/1a.png",
  "img/2a.png",
  "img/3a.png",
  "img/4a.png",
  "img/5a.png",
  "img/6a.png",
  "img/7a.png",
  "img/8a.png",
  "img/9a.png",
  "img/10a.png"
]
];
var animNum = 0;
var animFrames = anims[animNum++];
var numAnimFrames = animFrames.length;
var numStripsPerImage = 40;
var numStrips = numAnimFrames * numStripsPerImage;
var minImageWidth = 320;
var minImageHeight = 540;
var imageWidth;
var imageHeight;
var stripWidth;

var position = 0;
var ANIM_NEXT = 1;
var ANIM_PREV = -1;
function drawFrame(direction, showAll) {
  var strips = document.images;
  for (var i = 0; i < strips.length; i++) {
    if (showAll || (i + position) % numAnimFrames == 0) {
      document.images[i].style.visibility = "visible";
    } else {
      document.images[i].style.visibility = "hidden";
    }
  }
  if (showAll) {
    position = 0;
  } else {
    position -= direction;
  }
}
function drawGrid() {
  var strips = document.images;
  for (var i = 0; i < strips.length; i++) {
    if (i % numAnimFrames == 0) {
      document.images[i].style.visibility = "hidden";
    } else {
      document.images[i].src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=="; // black
    }
  }
}
function eventKeyDown(key, which) {
  if (key.keyCode == 39) // right arrow
    drawFrame(ANIM_NEXT);
  if (key.keyCode == 37) // left arrow
    drawFrame(ANIM_PREV);
}
function init() {
  position = 0;
  var s = document.getElementById("scanimation")
  numAnimFrames = animFrames.length;
  numStrips = numAnimFrames * numStripsPerImage;
  var imagesHTML = "";
  for (i = 1; i <= numStripsPerImage; i++) {
    for (j = 1; j <= numAnimFrames; j++) {
      /* var img = new Image();
      img.onload = function() { s.appendChild(img); };
      img.id = "p"+i+""+j;
      img.src = animFrames[j-1]; */
      imagesHTML += "<img id=\"p"+i+""+j+"\" src=\""+animFrames[j-1]+"?\">";
    }
  }
  s.innerHTML = imagesHTML;
  imageWidth = document.images[0].width;
  imageHeight = document.images[0].height;
  console.log("width, height = ", document.images[0].width, ", ", document.images[0].height);
  var scaleUp = 1.2;
  if (imageWidth > 0) {
    while (imageWidth < minImageWidth) {
      console.log("adjusting image width from " + imageWidth + " to " + (imageWidth * scaleUp));
      imageWidth *= scaleUp;
      imageHeight *= scaleUp;
      console.log("adjusted image width to " + imageWidth);
    }
  }
  stripWidth = imageWidth / numStrips;
  var curLeft = 0;
  var curRight = stripWidth;
  for (i = 1; i <= numStripsPerImage; i++) {
    for (j = 1; j <= numAnimFrames; j++) {
      id = "p" + i + "" + j;
      var img = document.getElementById(id);
      img.style.width = imageWidth;
      img.style.height = imageHeight;
      // CSS clip property: rect(top, right, bottom, left)
      img.style.clip = "rect(0px, "+curRight+"px, "+imageHeight+"px, "+curLeft+"px)";
      curLeft += stripWidth;
      curRight += stripWidth;
    }
  }
}
var colorNum = 1;
var colors = ['black','white','blue'];
var numStripsChoicesNum = 1;
var numStripsChoices = [10,20,40,60];
window.addEventListener('load', init, false);
window.addEventListener('keydown', eventKeyDown, false);
