/**
 * ToDo: 
 *  - background: Take dimensions and put them into photoshop. Top part should be a screen, lower part brushed metal
 * - Commands/Tasks + effects
 * - Controls
 * - Controller + p5Bot input
 * 
 * //
 */


let ship;
let ShipSprite;
let BG;
let starField;
let stars;
let bar0; //Hull Integrity
let bar1; //Fuel
let bar2; //PartyPower
let bar3; //Oxygen
function preload() {
  ShipSprite = loadImage('assets/ship.png');//Ship Art from Chelsea Brtis
  BG = loadImage('assets/BG.png');
}

function setup() {
  createCanvas(800, 800);
  ship = new Ship(350, 15);
  //starField = new StarField(10,100,50,15,1,10);
  //starField.fillStars(5);
  stars = [];
  fillStars(50);
  bar0 = new DataBar(50,700,400,50);
  bar1 = new DataBar(200,700,400,50);
  bar2 = new DataBar(350,700,400,50);
  bar3 = new DataBar(500,700,400,50);
  bar0.setFill(255,0,0);
  bar1.setFill(100,255,0);
  bar2.setFill(100,0,255);
  bar3.setFill(100,255,255);
  bar0.setName("Hull \nIntegrity");
  bar1.setName("Fuel");
  bar2.setName("Party \nPoints");
  bar3.setName("Oxygen");

}

function draw() {
  background(BG);
  drawSpace();

  updateStars();
  ship.display();
  bar0.drawBar();
  bar1.drawBar();
  bar2.drawBar();
  bar3.drawBar();
  barInput(bar0,81,65,1);//q,a
  barInput(bar1,87,83,1);//w s
  barInput(bar2,69,68,1);//e,d
  barInput(bar3,82,70,1);//r,f

}


function barInput(bar, upkeyCode, downkeyCode, delta)
{
  if(keyIsDown((upkeyCode)))
  {
    bar.updateHeight(delta);
  }

  if(keyIsDown(downkeyCode))
  {
    bar.updateHeight(-delta);
  }
}


class DataBar
{
    constructor(x1,y1,height,width)
    {
      this.x1 = x1;
      this.x2 =x1+width;
      this.width = width;
      this.height =height; /// this is our deltaY
      this.y1 = y1;
      this.y2 = y1-height;
      this.fill = [255,255,255];
      this.initHeight = height;
      this.frameCoords = [this.x1,this.y2,this.width,this.height];
      this.name = "Data";
    }

    //d is the delta/change in height
    // positive to go up
    // negative to go down
    updateHeight(d)
    {
      var deltaHeight = this.height + d;
      if(deltaHeight<this.initHeight && deltaHeight>0)
        this.height+=d;
    }

    drawBar()
    {
      let a=this.frameCoords;
      fill(100,100,100);
      stroke(0);
      rect(a[0]-2,a[1]-2,a[2]+4,a[3]+4);
      noStroke();
      fill(this.fill[0],this.fill[1], this.fill[2]);
      //top left x1,y2     // top right x2,y2
      //bottom left x1,y1  //bottom right x2,y1
      this.x2 = this.x1 + this.width;
      this.y2 = this.y1 - this.height;
      quad(this.x1,this.y2,this.x2,this.y2,this.x2,this.y1,this.x1,this.y1);
      this.drawName();

    }

    setFill(r,g,b)
    {
      this.fill = [r,g,b];
    }

    setName(name)
    {
      this.name = name;
    }

    drawName()
    {
      textSize(25);
      fill(0);
      text(this.name,this.x1-10, this.y1 +25);
    }


}

/* #region  Draw Space Veiw */
function drawSpace(x, y,)
{
  fill(0, 0, 0);
  noStroke();
  rect(0, 0, width, 110);


}



/// OBJECTS GO DOWN HERE UNTIL ITS TIME TO PUT THEM IN THEIR OWN FILE/////

class Ship {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    var img = ShipSprite;
    image(img, this.x, this.y, img.width / 8, img.width / 8);
  }

  move(dx, dy) {
    this.x = dx;
    this.y = dy;
  }

}
class Star {
  constructor(startX, startY, diameter, TravelSpeed) {
    this.x = startX;
    this.y = startY;
    this.diameter = diameter;
    this.speed = TravelSpeed;
  }

  drawStar() {
    fill(255);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    this.x -= this.speed;
  }
}

function updateStars() {


  for (var i = 0; i < stars.length; i++) {
    var currentStar = stars[i];
    currentStar.move();
    currentStar.drawStar();

    if (currentStar.x < -10) {
      removeStar(i);
      addStar(width + 10, 10, 100, 10, 1, 5);
    }


  }

}

function addStar(startX, ymin, ymax, maxStarSize, minSpeed, maxSpeed) {
  stars.push(new Star(startX, random(ymin, ymax), random(1, maxStarSize), random(minSpeed, maxSpeed)));
}

function removeStar(index) {
  stars.splice(index, 1);
}

function fillStars(num) {
  while (stars.length < num) {
    addStar(random(0, width + 10), 0, 100, 10, 1, 5);
  }
}

/* #endregion */