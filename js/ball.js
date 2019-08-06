function Ball(cordinate,movement,last) {
  // this.id= id;
  this.type="ball";
  this.cordinate = JSON.parse(JSON.stringify(cordinate));
  var temp = movement.x==0 && movement.y==0?last : movement;
  this.movement = JSON.parse(JSON.stringify(temp));
  this.speed = 4;
  this.size = 5;
  this.movement.x*=this.speed;
  this.movement.y*=this.speed;
  this.ball = document.createElement("div");
  this.ball.className = "ball";
  document.getElementById("game_container").append(this.ball);
  this.sound([
      "ehei.wav",
      "mmm.wav",
      "chen.ogg",
      "deff.mp3",
      "kick.mp3"
    ]);
  this.update();
}

Ball.prototype.update = function() {
  this.cordinate.x+=this.movement.x;
  this.cordinate.y+=this.movement.y;
  this.ball.style.left = this.cordinate.x +"px";
  this.ball.style.top = this.cordinate.y +"px";
};

Ball.prototype.colider = function(x,y){

}

Ball.prototype.remove = function() {
  this.ball.remove();
}

Ball.prototype.sound = function(src) {
  if (typeof this.sound_rec == "undefined" || this.sound_rec == null) this.sound_rec = document.createElement("audio");
  this.sound_rec.pause();
  this.sound_rec.src = "sound/"+src[Math.floor((Math.random() * src.length))];
  this.sound_rec.play();
}
