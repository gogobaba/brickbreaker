var canvas = document.getElementById('play_area');
var ctx = canvas.getContext('2d');



var ballx = canvas.width/2 ;
var bally = canvas.height/2 ;
var  dx = 2;
var dy = -2;
var ballradius = 10 ;
var paddlewidth = 90;
var paddleheight = 10 ;
var paddleX = (canvas.width - paddlewidth)/2 ;
var rightpressed = false ;
var leftpressed = false ;
var bricksrowcount = 8;
var brickscolumncount = 5;
var brickwidth =  75;
var brickheight = 20;
var brickspadding = 5 ;
var bricksoffsettop = 30 ;
var bricksoffsetleft = 80 ;
var score = 0 ;
var lives = 3;

var bricks = [];
        for(var c=0; c<brickscolumncount;c++){
          bricks[c] = [] ;
                  for(var r=0;r<bricksrowcount;r++){
                    bricks[c][r] = { x:0 ,  y:0 ,status:1};
                  }
        }

function collison_detection(){
  for (c=0;c<brickscolumncount;c++){
    for(r=0;r<bricksrowcount;r++){
      var b = bricks[c][r] ;
      if(b.status == 1){
         if(ballx > b.x && ballx < b.x + brickwidth && bally > b.y && bally < b.y + brickheight ){
                  dy = -dy ;
                  b.status = 0 ;
                  score++;
                      if(score == bricksrowcount*brickscolumncount){
                           alert("You Win");
                      }
              }
            }
        }
     }
   }



function drawBricks(){
  for (c=0;c<brickscolumncount;c++){
    for(r=0;r<bricksrowcount;r++){
      if(bricks[c][r].status == 1){
      var brickX = (r*(brickwidth + brickspadding)) + bricksoffsetleft ;
      var brickY = (c*(brickheight + brickspadding)) + bricksoffsettop ;
      bricks[c][r].x = brickX ;
      bricks[c][r].y = brickY ;
      ctx.beginPath();
      ctx.rect(brickX,brickY,brickwidth,brickheight);
      ctx.fillStyle = "orange";
      ctx.fill();
      ctx.closePath();
      }
    }
  }
}



document.addEventListener('keydown',keydownhandler);
document.addEventListener('keyup',keyuphandler);

function keydownhandler(e){

  if(e.keyCode == 39){ rightpressed = true ; }
  else if(e.keyCode == 37){ leftpressed = true ; }

}

function keyuphandler(e)
{
  if(e.keyCode == 39){ rightpressed = false ; }
  else if(e.keyCode == 37){ leftpressed = false ; }

}

//draw ball function
function drawball(){
  ctx.beginPath();
  ctx.arc(ballx,bally,ballradius,0,Math.PI*2,true);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawpaddle(){
 ctx.fillStyle = "blue" ;
 ctx.fillRect(paddleX,canvas.height - paddleheight,paddlewidth,paddleheight);
}

function drawscore(){
   ctx.font = "16px Arial";
   ctx.fillStyle = "red";
   ctx.fillText("Score:"+score,8,20);
}

function drawlives(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "green" ;
  ctx.fillText("Lives:"+lives,canvas.width-60,20);
}



//draw function
function draw(){

  ctx.clearRect(0,0,canvas.width,canvas.height);

  drawBricks();
  drawball();
  drawpaddle();
  drawscore();
  collison_detection();
  drawlives();
  if(bally + dy < ballradius){ dy = -dy ;}
  else if(bally + dy > (canvas.height - ballradius)){

   if(ballx > paddleX && ballx < paddleX + paddlewidth){
     dy = -dy ;
   }
   else{
     lives-- ;
               if(lives == 0){
                 alert('game over');
                 document.location.reload();
               }
               else
               {
                  ballx = canvas.width/2 ;
                  bally = canvas.height/2 ;
                  paddleX = (canvas.width - paddlewidth)/2 ;
                  dx = 2;
                  dy = -2;
               }

   }

  }

  if(ballx + dx < ballradius || ballx + dx > (canvas.width - ballradius)){ dx = -dx ;}

  ballx += dx;
  bally += dy ;

  if(rightpressed && paddleX < canvas.width - paddlewidth){
    paddleX += 7 ;
  }
  else if (leftpressed && paddleX > 0){
    paddleX -= 7;
  }

}



setInterval(draw , 10);
