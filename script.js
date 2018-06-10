window.onload = function()
{
    var canvas = document.getElementById('canvas');
        if(!canvas)
        {
            alert("Impossible de récupérer le canvas");
            return;
        }

    var context = canvas.getContext('2d');
        if(!context)
        {
            alert("Impossible de récupérer le context du canvas");
            return;
        }
    
    var reset = document.getElementById('reset');
    var colors = document.getElementById('colors');
    
    $('canvas').on({
        //Commence à dessiner lorsque l'on clique sur la souris
        mousedown : function(e){
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        },
        //Continue de dessiner tant que le bouton de la souris est pressé
        mousemove : function(e){
            if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
            }
        },
        //Arrete de peindre lorsque la souris est relachée
        mouseup : function(e){
            paint = false;
        },
        //Arrête de peindre lorsque la souris sort de la zone de dessin
        mouseleave : function(e){
            paint = false;
        },
        
        //touch
        touchstart : function(e){
          var touch = e.touches[0];
          var mouseX = touch.pageX - this.offsetLeft;
          var mouseY = touch.pageY - this.offsetTop;

          paint = true;
          addClick(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop);
          redraw();
        },
        
        touchmove : function(e){
          if(paint){
              var touch = e.touches[0];
              addClick(touch.pageX - this.offsetLeft, touch.pageY - this.offsetTop, true);
              redraw();
          }
        },
        
        touchend : function(e){
          paint = false;
        },
        
        touchleave : function(e){
          paint = false;
        }
    });
    
    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;
    
    //fonction qui enregistre la position du clic de la souris
    function addClick(x, y, dragging)
    {
      clickX.push(x);
      clickY.push(y);
      clickDrag.push(dragging);
      clickColor.push(curColor);
    }
    
    //fonction qui dessine le mouvement de la souris 
    function redraw(){
      /*context.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas*/
      context.lineJoin = "round";
      context.lineWidth = 5;

      for(var i=0; i < clickX.length; i++) {		
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.strokeStyle = clickColor[i];
         context.stroke();
      }
    }
    
    // Bouton Reset :
	reset.addEventListener('click',function() {
        // Clear du Canvas :
		context.clearRect(0,0, canvas.width, canvas.height);
        clickX=[];
        clickDrag =[];
        clickY = [];
        clickColor = [];
    });
    
    //Ajout de couleurs;
    var curColor = "#000";
    var clickColor = new Array();
    
    var Color = {
        init : function(name, hexa) {
            this.name = name;
            this.hexa = hexa;
            this.buttonId = "#button"+this.name;  
        },
        
        createButton : function(){
            var inputElt = document.createElement("input");
            inputElt.type = "button";
            inputElt.setAttribute("id", "choose" + this.name);
            inputElt.setAttribute("value", "");
            colors.appendChild(inputElt);
            var color = this.hexa;
            var button = document.getElementById('choose'+this.name);
            button.addEventListener('click', function(){
                curColor = color;
            });
            $(button).css("background-color", this.hexa);
        },  
    };
    
    var colorBlack = Object.create(Color);
    colorBlack.init("Black", "#000");
    colorBlack.createButton();    
    
    var colorWhite = Object.create(Color);
    colorWhite.init("White", "#fff");
    colorWhite.createButton();
    
    var colorPurple = Object.create(Color);
    colorPurple.init("Purple", "#cb3594");
    colorPurple.createButton();
    
    var colorGreen = Object.create(Color);
    colorGreen.init("Green", "#659b41");
    colorGreen.createButton();
    
    var colorYellow = Object.create(Color);
    colorYellow.init("Yellow", "#ffcf33");
    colorYellow.createButton();
    
    var colorRed = Object.create(Color);
    colorRed.init("Red", "#ff0000");
    colorRed.createButton();
    
    var colorBlue = Object.create(Color);
    colorBlue.init("Blue", "#0000ff");
    colorBlue.createButton();
    
    var colorTeal = Object.create(Color); 
    colorTeal.init("Teal", "#77e7db");
    colorTeal.createButton();
    
    var colorPink = Object.create(Color);
    colorPink.init("Pink", "#e777bd");
    colorPink.createButton();
    
    var colorOrange = Object.create(Color);
    colorOrange.init("Orange", "#FE9328");
    colorOrange.createButton();
    
    var colorMaroon = Object.create(Color);
    colorMaroon.init("Marron", "#873811");
    colorMaroon.createButton();
    
}