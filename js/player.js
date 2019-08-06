function Player(cordinate,gameObjects,aggression) {
  this.movement =  {x:0,y:0};
  this.cordinate =cordinate?cordinate:  {x:50,y:50}; //startPos
  this.size = 30;
  this.speed = 2;
  this.player = document.getElementsByTagName("mainActor")[0];
  this.type = "player";
  this.update();
  this.stamp = Date.now();
  this.heal = 0;
  this.score = 0;
}

Player.prototype.left = function(){
  this.movement.x=-this.speed;
}

Player.prototype.right = function(){
  this.movement.x=this.speed;
}

Player.prototype.up = function(){
  this.movement.y=-this.speed;
}

Player.prototype.down = function(){
  this.movement.y=this.speed;
}

Player.prototype.addScore = function(score){
  this.score+=score;
  if (this.score < 0 ) this.score = 0;
}

Player.prototype.update = function(){
  this.cordinate.x+=this.movement.x;
  this.cordinate.y+=this.movement.y;
  this.player.style.left = this.cordinate.x +"px";
  this.player.style.top = this.cordinate.y +"px";
  if (Date.now()-this.stamp>=2000 && this.heal<49){
    this.heal++;
    this.stamp = Date.now();
  }
}

Player.prototype.colider = function(x,y){
  return x>=this.cordinate.x && x<this.cordinate.x+this.size && y>=this.cordinate.y && y<this.cordinate.y+this.size;
}
