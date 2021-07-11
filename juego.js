//variables
var canvas = document.getElementById("areajuego")
var contexto = canvas.getContext("2d")
var WIDTH =300;
var HEIGHT = 530;
var CANVAS_WIDTH=300;
var CANVAS_HEIGHT=530;

canvas.width=WIDTH;
canvas.height=HEIGHT;

var FPS=60
var gravedad=1.5
var score =0
var personaje = {
    x:50,
    y:150,
    w:50,
    h:50
}
var tuberias = new Array()
tuberias[0]={
    x: canvas.width,
    y:0

}

//Insertando audio

var punto= new Audio()
punto.src="audios/punto.mp3"


//Insertando Imagenes
var bird = new Image()
bird.src="imagenes/bird.png"

var background = new Image()
background.src="imagenes/background.png"

var suelo = new Image()
suelo.src="imagenes/suelo.png"

var tuberiaNorte = new Image()
tuberiaNorte.src="imagenes/tuberiaNorte.png"

var tuberiaSur = new Image()
tuberiaSur.src="imagenes/tuberiaSur.png"



contexto.clearRect(0,0,300,530)
    
    //fondo
    contexto.drawImage(background,0,0)
    contexto.drawImage(suelo,0,canvas.height-suelo.height)

    //personaje 
    contexto.drawImage(bird,personaje.x,personaje.y)

//Control
function subir(){
personaje.y-=30

}

resize()
function resize(){

    CANVAS_WIDTH= window.innerWidth;
    CANVAS_HEIGHT=window.innerHeight;
   

    canvas.width=WIDTH;
    canvas.height=HEIGHT; 

    canvas.style.height =  ""+CANVAS_HEIGHT+"px";   
}


//bucle
inicio()
function inicio(){
    
    setInterval(loop,1000/FPS)

}
console.log(tuberiaSur.height)

    console.log(tuberiaSur.height)
function loop(){
    contexto.clearRect(0,0,300,530)
    
    //fondo
    contexto.drawImage(background,0,0)
    contexto.drawImage(suelo,0,canvas.height-suelo.height)

    //personaje 
    contexto.drawImage(bird,personaje.x,personaje.y)
    
    //tuberias
    for(var i =0;i<tuberias.length;i++){
       
        var desface = tuberiaNorte.height+100
        contexto.drawImage(tuberiaNorte,tuberias[i].x,tuberias[i].y)
        contexto.drawImage(tuberiaSur,tuberias[i].x,tuberias[i].y + desface)
        tuberias[i].x-- 
        
        if(tuberias[i].x==150){
            var x=canvas.width
            var y=Math.floor(Math.random()*tuberiaNorte.height-tuberiaNorte.height);
            if (y<-140){
                y=0
            }

            tuberias.push({x,y})
        }

        //colisiones 
        var b_horizontal = (personaje.x+bird.width >=tuberias[i].x) && 
                        (personaje.x<=tuberias[i].x+tuberiaNorte.width)

        var b_vertical =   (personaje.y<=tuberias[i].y+tuberiaNorte.height) ||
                           (personaje.y+bird.height>=tuberias[i].y+desface)
        
        var b_suelo_cielo = (personaje.y+bird.height >= canvas.height - suelo.height )
       
        if ( b_horizontal && b_vertical || b_suelo_cielo) {
            location.reload() 
        }
        if(tuberias[i].x==50){
                score++   
                punto.play()
            
            if (score>1000) {
                
                location.reload()
                
            }
        }



    }

    //condiciones
    personaje.y+=gravedad

    //score
    contexto.fillStyle="rgba(0,0,0,1)"
    contexto.font="40px Times New Roman"
    contexto.fillText("Score: " +score,10,canvas.height-40)

}

//Eventos
window.addEventListener("resize",resize)
window.addEventListener("keydown",subir)