var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];

var started = false;
var level = 0;

$(document).keydown(function(){
if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}
});


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log("userClickedPattern "+userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
});

function checkAnswer(currentLevel){
   // console.log(currentLevel);
   // console.log(gamePattern[currentLevel]);
   // console.log(userClickedPattern[currentLevel]);
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
           console.log("good");
           if(userClickedPattern.length===gamePattern.length){
           setTimeout(function(){
             nextSequence();
           },1000);
         }
   }
   else{
     console.log("bad");
     playSound("wrong");

     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
   }

}



function nextSequence(){

 userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //console.log("gamePattern "+gamePattern);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


}


function playSound(name){
  var audio= new Audio('sounds/'+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}


function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}
