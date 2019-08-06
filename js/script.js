
var maxObject = 70;
var map = getMap();
var gameObjects = [];
var last={x:1,y:0};
var lastId = 1;
var player= new Player();
var friends = [];
var pause = true;
var startFlag = false;
var chet = false;
var shortMessage = new ShortMessage();
var gameEngine;

var initialEnergy = 15;
var energyBarController;

  window.onload = function(){
    document.getElementById('start_btn').onclick = function(){
      startFlag = true;
      document.getElementById('start_page').style.display ="none";
    };
    document.getElementById('start_menu').onclick = function(){
      togleGame();
      energyBarController = new EnergyBar(initialEnergy);
    };
    gameObjects.push(player);
    KeyMapConfig();
    createMap();
    gameUpdtaeEngine(); //start the game
  }


  function createTriggers(cordinate){
    gameObjects.push(new WNTrigger(cordinate,gameObjects,"normal"));
  }

  function addFriends(index,cordinate){
    var friend =  (getFriends())[index];
    var objFriend = new Friend(cordinate,gameObjects);
    objFriend.size = friend.size;
    objFriend.name = friend.name;
    objFriend.setImg(friend.image);
    gameObjects.push(objFriend);
    friends.push(objFriend);

  }

  function createMap(){
    var mapCanvas = document.createElement("canvas");
    mapCanvas.width = map[0].length;
    mapCanvas.height = map.length;
    gameContainer = document.getElementById("game_container");
    gameContainer.append(mapCanvas);
    var ctx = mapCanvas.getContext("2d");
    for (var i = 0; i < map.length; i++) {
      for (var j = 0; j < map[i].length; j++) {
        ctx.fillStyle="#FFFFFF";
        if (map[i][j] === 1)      ctx.fillStyle ="#000000";
        else if (map[i][j] === 2 || map[i][j] === 11 || map[i][j] === 12 || map[i][j] === 13 || map[i][j] === 14 || map[i][j] === 15) ctx.fillStyle ="#8B4513";
        else if (map[i][j] === 3 || map[i][j] === 7 || map[i][j] === 8 || map[i][j] === 9 || map[i][j] === 10) ctx.fillStyle ="#808080";
        else if (map[i][j] === 6) ctx.fillStyle ="#FF0000";
        else if (map[i][j] === 4) ctx.fillStyle ="#DADADA";
        else                      ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect( j, i, 1, 1 );
        if (map[i][j]>6 || typeof map[i][j] === "string") addObjectObserve(j,i,map[i][j]);
      }
    }
    ctx.stroke();

    // gameObjects.push(new Hud({x:0,y:0},friends,player));
  }

  function addObjectObserve(x,y,objectId){
    var className = "";
    switch(objectId){
      case 7:case 16:className="chair chair-left";break;
      case 8:case 17:className="chair chair-right";break;
      case 9:case 18:className="chair chair-top";break;
      case 10:case 19:className="chair chair-bottom";break;
      case 11:className="computer computer-left";break;
      case 12:className="computer computer-right";break;
      case 13:className="computer computer-top";break;
      case 14:className="computer computer-bottom";break;
      case 15:className="flowers";break;
      case 20:className="car-model1";break;
      case 21:className="grass";break;
      case 22:className="floor2";break;
      case 23:className="toilet";break;
      case "trigger":className="speker";createTriggers({x:x,y:y});break;
      case "player":player.cordinate = {x:x,y:y};break;//createTriggers({x:x,y:y});break;
      case "hud":gameObjects.push(new Hud({x:x,y:y},friends,player));break;//createTriggers({x:x,y:y});break;
      // case "sh":case "tz":addFriends(objectId,{x:x,y:y});break;
      default:
        if (typeof objectId === "string") addFriends(objectId,{x:x,y:y});
      break;
    }

    if (className != ""){
        var obj = document.createElement("div");
        obj.className = className;
        obj.style.left = x+"px";
        obj.style.top = y+"px";
        document.getElementById("game_container").append(obj);
    }
  }

  function gameUpdtaeEngine(){
      if (!pause) updateObject();
      gameEngine = setTimeout(function(){
        gameUpdtaeEngine();
      },40);
  }

  function KeyMapConfig(){
    window.onkeydown = function(event){
      if (!startFlag) return;
      // console.log("in",event.keyCode,actorPos);

      /*move*/
      if (event.keyCode==37){ //left 37
        player.left();
      }
      if (event.keyCode==39){//right 39
        player.right();
      }
      if (event.keyCode==38){//up 38
        player.up();
      }
      if (event.keyCode==40){//down 40
        player.down();
      }
      if (event.keyCode==32){//shoot 37 space
        var pos = {
          x:player.cordinate.x+player.size/2,
          y:player.cordinate.y+player.size/2
        };
        gameObjects.push(new Ball(pos,player.movement,last));
        player.addScore(-2);
      }
      if (event.keyCode==65 ){//shout A
      // if (event.key == 'c' ){//shout A
        if (!BombSound.active) gameObjects.push(new BombSound(player.cordinate,gameObjects));
      }
    }

    window.onkeyup = function(event){
      if (!startFlag) return;
      // console.log("out",event.keyCode,actorPos);
      if (event.keyCode==37){ //left 37
        last.x=-player.speed;
        last.y=0;
        player.movement.x=0;
      }
      if (event.keyCode==39){//right 39
        last.x=player.speed;
        last.y=0;
        player.movement.x=0;
      }
      if (event.keyCode==38){//up 38
        last.x=0;
        last.y=-player.speed;
        player.movement.y=0;
      }
      if (event.keyCode==40){//down 40
        last.x=0;
        last.y=player.speed;
        player.movement.y=0;
      }
      if (event.keyCode == 27){//esc
        togleGame();
      }


      if (chet){
        chet += event.key;
        if (chet.length>5) chet = false;
        else if (chet == "ninja") chetGame();
        else if (chet == "end")   endGame();
      }else if (event.key == 'n' ){
        chet = "n";
        setTimeout(function(){
          chet = false;
        },10000);
      }else if (event.key == 'e' ){
        chet = "e";
        setTimeout(function(){
          chet = false;
        },10000);
      }


    }
  }

  function chetGame(){
    player.speed = 4;
    for (var friend in friends) {
      if (friends.hasOwnProperty(friend)) {
        friends[friend].count = 1;
      }
    }
    alert("cheted");
  }
function checkEndingGame(){
  var end = true;
  for (var friend in friends) {
    if (friends.hasOwnProperty(friend)) {
      end = end && friends[friend].heal;
    }
  }
  if (end) endGame();
}

function endGame(){
  pause = true;
  clearTimeout(gameEngine);
  var credit     = document.getElementById('credit');
  var container  = document.getElementById('credit_box');
  credit.style.display = "block";
  var sound_rec =  document.createElement("audio");
  sound_rec.src = "sound/end.mp3";
  sound_rec.play();
  setTimeout(function(){
    container.className = "credit-animate";
  },2000);
}

function updateObject(){
    for (var object in gameObjects) {
          if (gameObjects.hasOwnProperty(object)) {
            object = gameObjects[object];


            //colider detecteda
            if (object.type == "trigger" || object.type == "hud"){
              object.update();
              continue;
            }
            var coliders = [];
            var spacey = object.cordinate.y+object.movement.y+(object.movement.y>0?object.size:0);
            var spacex = object.cordinate.x+object.movement.x+(object.movement.x>0?object.size:0);

            //colider detected width walls
            try{
              //colider walls
              if (1 == map[Math.round(spacey)][Math.round(spacex)] || 2 == map[Math.round(spacey)][Math.round(spacex)] || (typeof map[Math.round(spacey)][Math.round(spacex)]=="undefined" )) {
                 if (object.type == "ball") {
                   object.sound(["pse.wav"]);
                   coliders.push(object);
                   player.addScore(-1);
                 }
                 else if (object.type == "ai" ||  object.type == "friend")
                    object.update(true);
                 else if (object.type == "player")
                    continue;
              }
              else
              //colider balls
              if(object.type == "ball"){
                for (var obj in gameObjects) {
                  if (gameObjects.hasOwnProperty(obj)) {
                      if (gameObjects[obj].type == "ai" && gameObjects[obj].colider(spacex,spacey) ){
                          object.sound(["sa.wav"]);
                          coliders.push(gameObjects[obj]);
                          coliders.push(object);
                          player.addScore(15);
                          break;
                      }
                  }
                }
              }else
              // is colid with bomb
              if(object.type == "bomb"){
                  for (var obj in gameObjects) {
                      if (gameObjects.hasOwnProperty(obj) && gameObjects[obj].type=="ai") {
                         if (object.colider(gameObjects[obj])){
                           gameObjects[obj].sound(["sa.wav"]);
                           coliders.push(gameObjects[obj]);
                           player.addScore(5);
                         }
                      }
                  }
              }else
              if(object.type == "friend"){
                for (var friend in friends) {
                  if (friends.hasOwnProperty(friend)) {
                    friend = friends[friend];
                    if ((object.colider(friend.cordinate.x,friend.cordinate.y) || friend.colider(spacex,spacey)) && friend!=object)   {
                      // object.heal = friend.updateHealPoint(object.heal);
                      object.update(true);
                      friend.update(true);
                    }
                  }
                }
              }else
              if(object.type == "ai"){
                  // is colid with player
                  if (object.colider(player.cordinate.x,player.cordinate.y) || player.colider(spacex,spacey))   {
                    object.sound(["fart-not clean.wav"]);
                    coliders.push(object);
                    player.addScore(-5);
                  }
                  //if colider width friend
                  for (var friend in friends) {
                    if (friends.hasOwnProperty(friend)) {
                      friend = friends[friend];
                      if (object.colider(friend.cordinate.x,friend.cordinate.y) || friend.colider(spacex,spacey))   {
                        coliders.push(object);
                        if (!friend.heal) {
                          player.addScore(-1);
                          shortMessage.show(friend.image.name);
                        }
                        friend.fired();
                      }
                    }
                  }

              }
              else
              //player colid friend
              if(object.type == "player"){
                for (var friend in friends) {
                  if (friends.hasOwnProperty(friend)) {
                    friend = friends[friend];
                    if (object.colider(friend.cordinate.x,friend.cordinate.y) || friend.colider(spacex,spacey))   {
                      object.heal = friend.updateHealPoint(object.heal);
                      friend.sound(["opa.wav"]);
                      checkEndingGame();
                    }
                  }
                }
              }
            }catch(ex){
              // console.log(ex);
                if (object.type == "ball") coliders.push(object);
                else if (object.type == "ai" ||  object.type == "friend") object.update(true);
            }

            object.update();


            //remove gameObjects
            for (var colider in coliders) {
              if (coliders.hasOwnProperty(colider)) {
                // console.log(coliders[colider].type);
                coliders[colider].remove();
                gameObjects.splice(gameObjects.indexOf(coliders[colider]),1);
              }
            }
        }
    }
  }

function togleGame(){
  var menu = document.getElementById("ui");
  if (pause){
    menu.className = "hide";
  }else{
    menu.className = "";
  }
  pause=!pause;
}
