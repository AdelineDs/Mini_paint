window.onload = function()
{  
    var colors = document.getElementById('colors');
    
    class Paint {
        constructor(canvas, name="Black", hexa="#000"){
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
         
            if(!this.canvas) {
                alert("Impossible de récupérer le canvas");
                return;
            }

            if(!this.context) {
              alert("Impossible de récupérer le context du canvas");
              return;
            }
            
            this.name = name;
            this.hexa = hexa;
            this.paint = false;
            this.mouseX = 0;
            this.mouseY = 0;
            this.context.lineJoin = "round";
            this.context.lineCap = "round";
            this.context.lineWidth = 5;
            this.context.strokeStyle = this.hexa;
            this.lastPosition = {
              x: 0,
              y: 0
            };
            
            this.addColor(this.name, this.hexa);
            this.addColor("White", "#fff");
            this.addColor("Red", "#ff0000");
            this.addColor("Blue", "#0000ff");
            this.addColor("Green", "#00FF00");
            this.addColor("Yellow", "#ffff00");
            this.redraw();
            this.clearCanvas();
        }//end consctuctor
    
        redraw() {
            this.canvas.addEventListener("mousedown", (e) => {
                this.paint = true;
                this.mouseX = e.pageX - this.canvas.getBoundingClientRect().left;
                this.mouseY = e.pageY - this.canvas.getBoundingClientRect().top;
                this.lastPosition = {
                    x: this.mouseX,
                    y: this.mouseY
                };
            });
            
            this.canvas.addEventListener("mousemove", (e) => {
                if(this.paint){
                    this.mouseX = e.pageX - this.canvas.getBoundingClientRect().left;
                    this.mouseY = e.pageY - this.canvas.getBoundingClientRect().top;
                    this.context.beginPath();
                    this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
                    this.context.lineTo(this.mouseX, this.mouseY);
                    this.context.closePath();
                    this.context.strokeStyle = this.hexa;
                    this.context.stroke();
                    this.lastPosition = {
                      x: this.mouseX,
                      y: this.mouseY
                    };
                }
            });
            
            this.canvas.addEventListener("mouseup", (e) => this.paint=false );
            
            this.canvas.addEventListener("mouseleave", (e) => this.paint=false );
            
             this.canvas.addEventListener("touchstart", (e) => {
                let touch = e.touches[0];
                this.paint = true;
                this.mouseX = touch.pageX - this.canvas.getBoundingClientRect().left;
                this.mouseY = touch.pageY - this.canvas.getBoundingClientRect().top;
                this.lastPosition = {
                    x: this.mouseX,
                    y: this.mouseY
                };
            });
            
            this.canvas.addEventListener("touchmove", (e)=> {
                 if(this.paint){
                    let touch = e.touches[0];
                    this.mouseX = touch.pageX - this.canvas.getBoundingClientRect().left;
                    this.mouseY = touch.pageY - this.canvas.getBoundingClientRect().top;
                    this.context.beginPath();
                    this.context.moveTo(this.lastPosition.x, this.lastPosition.y);
                    this.context.lineTo(this.mouseX, this.mouseY);
                    this.context.closePath();
                    this.context.stroke();
                    this.lastPosition = {
                      x: this.mouseX,
                      y: this.mouseY
                    };
                }
            });
            
            this.canvas.addEventListener("touchend", (e) => this.paint=false );
            
            this.canvas.addEventListener("touchleave", (e) =>this. paint=false );
            
        }//end redraw
        
        clearCanvas() {
            const resetButton = document.getElementById('reset');
            resetButton.addEventListener('click', () => this.context.clearRect(0,0, this.canvas.width, this.canvas.height));
            this.mouseX = 0;
            this.mouseY = 0;
            this.lastPosition = {
                x: 0,
                y: 0
            };
        }//end clearCanvas
        
        addColor(color,hex) {
            console.log(hex);
            console.log(color);
            const inputElt = document.createElement("input");
            inputElt.type = "button";
            inputElt.setAttribute("id", "choose" + color);
            inputElt.setAttribute("value", "");
            colors.appendChild(inputElt);
            this.button = document.getElementById('choose'+ color);
            $(this.button).css("background-color", hex);
            this.button.addEventListener('click', () => {
                this.hexa = hex;
            });   
        }//end addColor
        
    }//end class Paint
 
    var monPaint = new Paint("canvas");
    monPaint.addColor("Magenta", "#ff00ff");
    monPaint.addColor("Cyan", "#00ffff");
}