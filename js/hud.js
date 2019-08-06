function Hud(cordinate,friends,player) {
  this.type="hud";
  this.cordinate = JSON.parse(JSON.stringify(cordinate));
  this.friends = friends;
  this.player = player;
  this.speed = 5;
  this.movement={x:0,y:0};
  this.hudFriends = [];
  this.hud = document.getElementById("hud");
  this.updateFriendFlag = false;
  this.score = document.getElementById('score-box');
  this.hud.style.top = cordinate.y +"px";
  this.hud.style.left = cordinate.x+"px";
}

Hud.prototype.updateFriends = function(){
  for (var friend in this.friends) {
    if (this.friends.hasOwnProperty(friend)) {
        var hudFriend = this.friendObject(this.friends[friend]);
        this.friends[friend].div =  hudFriend;
        this.hud.append(hudFriend.div);
    }
  }
  this.player.div = document.getElementById('player-heal');
}

Hud.prototype.update = function() {
  if (!this.updateFriendFlag){
    this.updateFriendFlag = true;
    this.updateFriends();
  }
  this.player.div.innerHTML = this.player.heal;
  this.score.innerHTML = this.player.score;
  for (var friend in this.friends) {
    if (this.friends.hasOwnProperty(friend)) {
        friend =this.friends[friend];
        if (friend.heal){
            if (friend.flag!="heal"){
              friend.flag = "heal";
              friend.div.div.className += " blue";
              friend.div.heal.innerHTML = "HEAL";
              this.player.addScore(20);
            }
        }else if(friend.count > 48){
            if(friend.flag!="sick"){
                friend.div.div.className += " red";
                friend.flag = "sick";
                friend.div.heal.innerHTML = "SICK";
                this.player.addScore(-50);
            }
        }else {
          if (friend.flag != "live"){
            friend.div.div.className ="hud-friend";
            friend.flag = "live";
          }
          friend.div.heal.innerHTML = friend.count;
        }
    }
  }

};

Hud.prototype.friendObject = function(friend){
   // var  div = "<div class='hud-friend'>";
   var  div = document.createElement("div");//"<div class='hud-friend'>";
        div.id = friend.name;
        div.className =  'hud-friend';

  var  image = document.createElement("div");//"<div class='hud-friend'>";
       image.className = 'hud-friend-image';//friend.name;
       image.innerHTML = "<img src ='img/"+friend.image.name+"'></div>"
  var  title = document.createElement("div");//"<div class='hud-friend'>";
       title.className = 'hud-friend-title';//friend.name;
       title.innerHTML = friend.name;
  var  heal = document.createElement("div");//"<div class='hud-friend'>";
       heal.className = 'hud-friend-heal';//friend.name;
       heal.innerHTML = friend.count;

       div.append(image);
       div.append(title);
       div.append(heal);

       return {
         div:div,
         image:image,
         title:title,
         heal:heal
       };
}
