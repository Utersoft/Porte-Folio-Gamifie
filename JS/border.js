function Border(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    
    this.draw = function() {
        if (this.type === 1 || this.type === 2){
            screenContext.fillStyle = "white";
        }
        screenContext.fillRect(this.x, this.y, this.width, this.height);
    }
}




function Images(url, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = new Image();
    this.image.src = url;
    this.image.onload = function() {
        console.log(this);
        screenContext.drawImage(this, this.x, this.y, this.w, this.h);
        
    }
    
    this.draw = function() {
        screenContext.drawImage(this.image, this.x, this.y, this.w, this.h);
    };
}