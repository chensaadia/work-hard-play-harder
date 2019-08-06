function Friend(cordinate,gameObjects) {
  this.type="friend";
  this.cordinate = JSON.parse(JSON.stringify(cordinate));
  this.movement={x:0,y:0};
  this.speed = 2;
  this.size = 20;
  this.heal = false;
  this.count = Math.floor((Math.random() * 50)+1);
  this.movement.x*=this.speed;
  this.movement.y*=this.speed;
  this.friend = document.createElement("div");
  this.friend.className = "friend";
  document.getElementById("game_container").append(this.friend);
  this.gameObjects=gameObjects;
  this.changeDirection();
  this.update();
}

Friend.prototype.setImg = function(img){
  this.image = img;
  this.friend.style.backgroundImage = "url(img/"+img.name+")";
  this.friend.style.width = img.x;
  this.friend.style.height = img.y;

}

Friend.prototype.fired = function(){
  if (!this.heal && this.count<=50) this.count++;
}

Friend.prototype.updateHealPoint = function(point){
  if (this.heal) return point;
  var healPoint = this.count-point;
  if (healPoint <= 0 ){
      this.heal = true;
      this.count = 0;
      return Math.abs(healPoint);
  }else{
      this.count = healPoint;
      return 0;
  }
}

Friend.prototype.update = function(randomPlace) {

  if (randomPlace || this.currentStep>this.maxSteps){
    return this.changeDirection();
  }

  this.currentStep+=this.movement.x || this.movement.y;
  this.cordinate.x+=this.movement.x;
  this.cordinate.y+=this.movement.y;
  this.friend.style.left = this.cordinate.x +"px";
  this.friend.style.top = this.cordinate.y +"px";

  if (Math.floor((Math.random() * 1000) + 1)==1){
    if (this.gameObjects.length<maxObject) this.gameObjects.push(new WN(this.cordinate));
  }

}

Friend.prototype.changeDirection = function(){
    this.movement.y = Math.floor((Math.random() * 2))*this.speed *(Math.floor((Math.random() * 2))==0?1:-1);
    this.movement.x = Math.floor((Math.random() * 2))*this.speed *(Math.floor((Math.random() * 2))==0?1:-1);
    if (this.movement.y == 0 && this.movement.x == 0 )return this.changeDirection();
    this.currentStep = 0;
    this.maxSteps = Math.floor((Math.random() * 10) + 1)*100;
}

Friend.prototype.colider = function(x,y){
  return x>=this.cordinate.x && x<this.cordinate.x+this.size && y>=this.cordinate.y && y<this.cordinate.y+this.size;
}



Friend.prototype.remove = function() {
  this.friend.remove();
}
Friend.prototype.sound = function(src) {
  if (typeof this.sound_rec == "undefined" || this.sound_rec == null) this.sound_rec = document.createElement("audio");
  this.sound_rec.pause();
  this.sound_rec.src = "sound/"+src[Math.floor((Math.random() * src.length))];
  this.sound_rec.play();
}
