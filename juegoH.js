var btnMove;
  var game;
  var ball;
  function init(){
   game = new Scene();
   game.setSize(200, 200);
   ball = new Sprite(game, "redBall.png", 25, 25);
   ball.setSpeed(0);
   ball.setPosition(100,100);
   btnMove = new GameButton("Move");
   btnMove.setPos(70, 150);
   btnMove.setSize(60, 30);
   game.start();
  } // end init
  function update(){
   game.clear();
   checkButtons();
   ball.update();
  } // end update
  function checkButtons(){
   if (btnMove.isClicked()){
    ball.setSpeed(3);
   } else {
    ball.setSpeed(0);
   } // end if  
  } // end checkButtons