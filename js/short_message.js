
function ShortMessage() {
  this.message = document.getElementById('short_message');
  this.img = document.getElementById('short_message_img');
  this.text = document.getElementById('short_message_box');
  this.message.style.display = "none";
  ShortMessage.isShow = false;
}

ShortMessage.prototype.isShow =false;

ShortMessage.prototype.show = function(img){
    if (ShortMessage.isShow) return;
    this.img.src = "img/"+img;
    this.text.innerHTML = this.genrateText();
    ShortMessage.isShow = true;
    this.sound(["lechtishtelava.wav","wallakyofi.wav","zemasheataosepo.wav","chen2.mp3"]);
    var diaplay = this.message;
    this.message.style.display = "block";
    setTimeout(function(){
      ShortMessage.isShow = false;
      diaplay.style.display = "none";
    },5000);
}

ShortMessage.prototype.genrateText = function(){
  var text = [
    "איפה תלך?!",
    "תאמין לי אל תאמין לאף אחד",
    "חבוב!",
    "זה פשוט",
    "אין לי כוח לעבוד",
    "עזוב אותי אני בהודו",
    "בא לכם ריבר?",
    "מה אוכלים היום?",
    "נא לא להאכיל את האינטגרטורים!",

  ];
  return text[Math.floor((Math.random() * text.length))];
}
ShortMessage.prototype.sound = function(src) {
  if (typeof this.sound_rec == "undefined" || this.sound_rec == null) this.sound_rec = document.createElement("audio");
  this.sound_rec.pause();
  this.sound_rec.src = "sound/"+src[Math.floor((Math.random() * src.length))];
  this.sound_rec.play();
}
