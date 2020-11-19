let gamePattern = [];

let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let start = false;

let level = 0;

$(document).keypress(function (event){
    
    if((event.key === 'a' || event.key === 'A') && start === false)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
})

//Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){
    /*
    Write an if statement inside checkAnswer() to check if the most recent user answer is 
    the same as the game pattern. If so then log "success", otherwise log "wrong".
    (check the last index between two arrays)
    */
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        //console.log("gamePattern: " + gamePattern[currentLevel]);
        //console.log("userChose: " + userClickedPattern[currentLevel]);
        console.log("Pass");
        /*
        Waiting user has enough clicks to active the next round
        */
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function ()
            {
                nextSequence();
            }, 1000);
        }
    }else 
    {
        playSound("wrong");

        $("#level-title").text("Game Over, Press 'A' Key to Restart");

        $("body").addClass("game-over");

        setTimeout(function ()
        {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

$(".btn").click(function() {
    // 'this' => ".btn", attr("di") => return the value of this attribute (id)
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
   
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    //animatePress(randomChosenColour);
}

// Support functions
function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() 
    {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

// Reset all values to play again
function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}
