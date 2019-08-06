
BombSound.active = false;
function BombSound(cordinate,gameObjects) {
  BombSound.active  = true;
  this.type="bomb";
  this.gameObjects = gameObjects;
  this.cordinate = JSON.parse(JSON.stringify(cordinate));
  this.startSize = 25;
  this.size = this.startSize;
  this.speed = 5;
  this.movement={x:0,y:0};
  this.maxSize = 200;
  this.ball = document.createElement("div");
  this.ball.className = "bomb-sound";
  this.ball.innerHTML = "o";
  this.ball.style.lineHeight = this.size+"px";
  document.getElementById("game_container").append(this.ball);
  this.update();
  this.sound([
    "eifoanimegiamipo.wav",
    "einlimusagmaolehkan.wav",
    "tambin.wav",
    "lemaanimashkia2.wav",
    "duck.ogg"
  ]);
}

BombSound.prototype.update = function() {
  if (this.size<this.maxSize) this.size+=this.speed;
  else this.remove();

  var ratio = (this.size-this.startSize)/2;
  this.ball.style.left   = (this.cordinate.x - ratio) +"px";
  this.ball.style.top  =   (this.cordinate.y - ratio) +"px";
  this.ball.style.width   = this.size +"px";
  this.ball.style.height  = this.ball.style.width;
  this.ball.style.lineHeight = this.size+"px";
};

BombSound.prototype.colider = function(obj){
    var ratio = (this.size-this.startSize)/2;
    var x = this.cordinate.x - ratio;
    var y = this.cordinate.y - ratio;
    return obj.cordinate.x>=x && obj.cordinate.x<x+this.size && obj.cordinate.y>=y && obj.cordinate.y<y+this.size;
}

BombSound.prototype.remove = function() {
  if (this.ball) this.ball.remove();
  this.gameObjects.splice(gameObjects.indexOf(this),1);
  BombSound.active  = false;
}

BombSound.prototype.sound = function(src) {
  if (typeof this.sound_rec == "undefined" || this.sound_rec == null) this.sound_rec = document.createElement("audio");
  this.sound_rec.pause();
  this.sound_rec.src = "sound/"+src[Math.floor((Math.random() * src.length))];
  this.sound_rec.play();
}
