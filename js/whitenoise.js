function WN(cordinate) {
  this.type="ai";
  this.cordinate = JSON.parse(JSON.stringify(cordinate));
  this.movement={x:0,y:0};
  this.speed = 2;
  this.size = 20;
  this.movement.x*=this.speed;
  this.movement.y*=this.speed;
  this.wn = document.createElement("div");
  this.wn.className = "wn";
  document.getElementById("game_container").append(this.wn);
  this.changeDirection();
  this.update();
}

WN.prototype.update = function(randomPlace) {

  if (randomPlace || this.currentStep>this.maxSteps){
    return this.changeDirection();
  }

  this.currentStep+=this.movement.x || this.movement.y;
  this.cordinate.x+=this.movement.x;
  this.cordinate.y+=this.movement.y;
  this.wn.style.left = this.cordinate.x +"px";
  this.wn.style.top = this.cordinate.y +"px";
}

WN.prototype.changeDirection = function(){
    this.movement.y = Math.floor((Math.random() * 2))*this.speed *(Math.floor((Math.random() * 2))==0?1:-1);
    this.movement.x = Math.floor((Math.random() * 2))*this.speed *(Math.floor((Math.random() * 2))==0?1:-1);
    if (this.movement.y == 0 && this.movement.x == 0 )return this.changeDirection();
    this.currentStep = 0;
    this.maxSteps = Math.floor((Math.random() * 10) + 1)*100;
}

WN.prototype.colider = function(x,y){
  return x>=this.cordinate.x && x<this.cordinate.x+this.size && y>=this.cordinate.y && y<this.cordinate.y+this.size;
}

WN.prototype.remove = function() {
  this.wn.remove();
}
WN.prototype.sound = function(src) {
  if (typeof this.sound_rec == "undefined" || this.sound_rec == null) this.sound_rec = document.createElement("audio");
  this.sound_rec.pause();
  this.sound_rec.src = "sound/"+src[Math.floor((Math.random() * src.length))];
  var sound = this.sound_rec;
  setTimeout(function(){
    sound.play();
  },5);
}
