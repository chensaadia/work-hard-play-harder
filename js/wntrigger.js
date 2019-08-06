function WNTrigger(cordinate,gameObjects,aggression) {
  this.type="trigger";
  this.aggression = aggression;
  this.gameObjects = gameObjects;
  this.movement ={x:0,y:0};
  this.cordinate = JSON.parse(JSON.stringify(cordinate));
  this.wn = document.createElement("div");
  this.wn.className = "trigger";
  document.getElementById("game_container").append(this.wn);
}

WNTrigger.prototype.update = function(){
        var random = 1000;
        switch(this.aggression){
            case "hard":
            random = 50;
            break;
            case "normal":
            random = 100;
            break;
        }

        if (Math.floor((Math.random() * random) + 1)==1){
          if (this.gameObjects.length<maxObject) this.gameObjects.push(new WN(this.cordinate));
        }
}
