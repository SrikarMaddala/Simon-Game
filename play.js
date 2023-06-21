alert("hello")
var buttonColours = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userpattern = [];




var started = false;
var level = 0 ;

$(document).keypress(function(){
  if(!started){

    $("#level-title").text("Level " + level);
    nxtsqn();
    started = true;
  }
});



$( ".btn" ).on( "click", function() {
    var usco = $(this).attr("id");
    userpattern.push(usco);
    console.log(userpattern);
    playSound(usco);
    animatePress(usco);

    checkAnswer(userpattern.length-1);
  } );



function nxtsqn(){
    userpattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    var randno = Math.floor(Math.random() * 4);
    var randco = buttonColours[randno];
    gamePattern.push(randco);
    $("#" + randco).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randco);
}

function startOver(){
  level = 0 ;
  gamePattern = [];
  started = false;
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(); 
  }

function animatePress(name){
  $("#" + name).addClass("pressed");

  setTimeout(function(){
    $("#" + name ).removeClass("pressed");
  } , 100);
}

function checkAnswer(a){
  if (gamePattern[a] === userpattern[a]){
    console.log('success');
    if( userpattern.length == gamePattern.length){
      setTimeout(function(){
        nxtsqn();
      } , 1000);
    }

  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over , please press any key to Restart");

    setTimeout(function(){
      $("body").removeClass("game-over");
    } , 500 );

    startOver();
  }
  
}
