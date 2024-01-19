let vangogh;
let monalisa;
let pearl;
let picture;

let x, y;
let pixelColor, r,g,b,a;
let shape_width, shape_height;
let shape = [],shapeType=0;
let img = []


function preload(){
  vangogh = loadImage('vangogh.png', () => {
    picture = vangogh;
  });
  monalisa = loadImage('monalisa.png')
  pearl = loadImage('pearl.png')
  
  font1 = loadFont("Cormorant-Italic-VariableFont_wght.ttf");
  font2 = loadFont("Cormorant-VariableFont_wght.ttf");
}

function setup() {
  img = [vangogh, monalisa, pearl];
  
  //***** shape *****//
  shape[0] = 'ellipse';
  shape[1] = 'triangle';
  shape[2] = 'rectangle';
  shape[3] = 'line';
  
  createCanvas(1700,1200);
  background(0);
  
  //****** GUI ******//
  gui = createGui();
  
  vangoghButton = createButton("Vangogh", width-500, height-500, 120, 50)
  monalisaButton = createButton("Mona-Lisa", width-350 , height-500, 120, 50)
  pearlButton = createButton("Pearl", width-200, height-500, 120, 50)
  
  resetButton = createButton("RESET", width-300, height-100, 200, 50);
  Min_value = createSlider("Slider", width-500, height-360, 400, 32, 10,300);
  Max_value = createSlider("Slider", width-500, height-270, 400, 32, 10,300);
  speed = createSlider("Slider", width-500, height-180, 400, 32, 5,20);
  
  Min_value.setStyle("fillBg", color(0));
  Max_value.setStyle("fillBg", color(0));
  speed.setStyle("fillBg", color(0));
  
  UI_text();
  
  
}

function draw() {
  drawGui();

  if (resetButton.isPressed)
    reset();
  
  if(vangoghButton.isPressed){
    reset();
    picture = img[0];
  }

  if(monalisaButton.isPressed){
    reset();
    picture = img[1];
  }
  
  if(pearlButton.isPressed){
    reset();
    picture = img[2];
  }
      
  for (let i=0;i<speed.val;i++) {
    switch(shape[shapeType]) {
      case 'ellipse' :
        drawellipse();
        break;
        
      case 'triangle' :
        drawtriangle();
        break;
        
      case 'rectangle' :
        drawrectangle();
        break;
        
      case 'line' :
        drawline();
        break;
    }
  }
}


function drawellipse()
{
  x = random(1000);
  y = random(1200);
  shape_width = random(Max_value.val);
  shape_height = random(Min_value.val);
  
  
  pixelColor = picture.get(x,y);
  r = pixelColor[0];
  g = pixelColor[1];
  b = pixelColor[2];
  a = random(0,30);
  
  ellipseMode(CENTER);
  noStroke();
  fill(r,g,b,a);
  ellipse(x,y,shape_width,shape_height);

}

function drawtriangle()
{

  x1 = random(1000);
  y1 = random(1200);
  x2 = random(x1-Min_value.val,x1+Max_value.val);
  y2 = random(y1-Min_value.val,y1+Max_value.val);
  x3 = random(x2-Min_value.val,x2+Max_value.val);
  y3 = random(y2-Min_value.val,y2+Max_value.val);
  
  pixelColor = picture.get(x1,y1);
  r = pixelColor[0];
  g = pixelColor[1];
  b = pixelColor[2];
  a = random(0,30);
  
  noStroke();
  fill(r,g,b,a);
  
  triangle(x1,y1,x2,y2,x3,y3);
  
}

function drawrectangle()
{
  x = random(1000);
  y = random(1200);
  shape_width = random(Max_value.val);
  shape_height = random(Min_value.val);
  
  
  pixelColor = picture.get(x,y);
  r = pixelColor[0];
  g = pixelColor[1];
  b = pixelColor[2];
  a = random(0,30);
  
//  ellipseMode(CENTER);
  noStroke();
  fill(r,g,b,a);
  rect(x,y,shape_width,shape_height);

}

function drawline()
{

  x1 = random(1000);
  y1 = random(1200);
  x2 = random(x1-Min_value.val,x1+Max_value.val);
  y2 = random(y1-Min_value.val,y1+Max_value.val);
  
  pixelColor = picture.get(x1,y1);
  r = pixelColor[0];
  g = pixelColor[1];
  b = pixelColor[2];
  a = random(0,100);
  
  strokeWeight(random(5));
  stroke(r,g,b,a);
  
  line(x1,y1,x2,y2);
  
}


function reset() {
  background(0);
  UI_text();
  redraw();
}

function mouseClicked() {
  if (mouseX >=400 && mouseX <= 1000) {
    shapeType = (shapeType+1) % 4;
  }
  
}

function UI_text() {
  textFont(font1);
  fill(255);
  textSize(120);
  text("Repainting", width / 2+180, 300);
  text("Masterpiece", width / 2+245, 405);
  
  textSize(30);
  text("Re-design the masterpiece with a new sense.",width / 2+200, 500);
  text("Click on the image to change the shape.",width / 2+200, 530);
  text("Use the slider to adjust the parameters.",width / 2+200, 560);
  
  textFont(font2);
  textSize(35);
  text("shape height",width-500,height-380);
  text("shape width",width-500,height-290);
  text("frame speed",width-500,height-200);
  
}
