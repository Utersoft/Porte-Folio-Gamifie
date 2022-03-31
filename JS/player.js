function Player(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 60;
    this.x_speed = 0;
    this.y_speed = 0;
    this.y_tmp_pos = 0;
    this.friction = 0.7;
    this.screenSpeed = 10;
    this.maxSpeed = 10;
    this.maxYSpeed = 15;
    this.jumpHeight = 40;
    this.active = true;
    this.isGrounded = true;
    this.isScreenMoving = false;
    this.sprite = new Image();
    this.sprite.src = "../Images/personnageTest.png";
    this.sprite.onload = function() {
        screenContext.drawImage(this, 0, 0, player.width, player.height);
    };
    
    this.step = function() {
        if (this.active) {
            if (!leftKey && !rightKey || leftKey && rightKey){
                this.x_speed *= this.friction;
                this.screenSpeed = 0;
            }else if (rightKey && this.x < 400) {
                if (this.isScreenMoving){
                    this.x_speed = -this.screenSpeed;
                }
                this.screenSpeed = 0;
                this.isScreenMoving = false;
                this.x_speed ++;
            }else if (leftKey && (this.x > 200 || borders[0].x == 0)) {
                if (this.isScreenMoving){
                    this.x_speed = -this.screenSpeed;
                }
                this.screenSpeed = 0;
                this.isScreenMoving = false;
                this.x_speed --;
            }else{
                if (!this.isScreenMoving){
                    this.screenSpeed = -this.x_speed;
                }
                this.isScreenMoving = true;
                if (rightKey) {
                    this.screenSpeed--;
                }else if (leftKey) {
                    this.screenSpeed++;
                }
                this.x_speed = 0;
            }
            
            if (this.x_speed > this.maxSpeed) {
                this.x_speed = this.maxSpeed;
            } else if (this.x_speed < -this.maxSpeed) {
                this.x_speed = -this.maxSpeed;
            }
            
            if (this.x_speed > 0){
                this.x_speed = Math.floor(this.x_speed);
            } else {
                this.x_speed = Math.ceil(this.x_speed);
            }
            
            if (this.screenSpeed > this.maxSpeed) {
                this.screenSpeed = this.maxSpeed;
            } else if (this.screenSpeed < -this.maxSpeed) {
                this.screenSpeed = -this.maxSpeed;
            }
            
            let collisionRect = {
                x: this.x,
                y: this.y + this.y_speed,
                width: this.width,
                height: this.height
            };
            
            
            if(this.isScreenMoving) {
                collisionRect.x = collisionRect.x + this.screenSpeed;
            }else{
                collisionRect.x = collisionRect.x + this.x_speed;
            }
            
            //Boite de collision horizontale
            let horizontalRect = {
                x: this.x + this.x_speed,
                y: this.y,
                width: this.width,
                height: this.height
            };
            
            let diagonalRect = {
                x: this.x + this.x_speed,
                y: this.y + this.y_speed,
                width: this.width,
                height: this.height
            };
            
            if (this.isScreenMoving){
                horizontalRect.x = this.x - this.screenSpeed;
                diagonalRect. x = this.x - this.screenSpeed;
            }
            
            if (spaceKey) {
                if (this.isGrounded) {
                    this.y_speed -= this.jumpHeight;
                }
            }
            
            this.y_speed += 5;
            
            /*if (this.y_speed > this.maxYSpeed) {
                this.y_speed = this.maxYSpeed;
            } else if (this.y_speed < -this.maxYSpeed) {
                this.y_speed = -this.maxYSpeed;
            }*/
            
            if (this.y_speed > 0){
                this.y_speed = Math.floor(this.y_speed);
            } else {
                this.y_speed = Math.ceil(this.y_speed);
            }
            
            //Boite de collision verticale
            let verticalRect = {
                x: this.x,
                y: this.y + this.y_speed,
                width: this.width,
                height: this.height
            };
            
            
            
            for (let n_i = 0; n_i < borders.length; n_i++){
                let borderRect = {
                    x: borders[n_i].x,
                    y: borders[n_i].y,
                    width: borders[n_i].width,
                    height: borders[n_i].height
                };
                
                if (checkIntersection(horizontalRect, borderRect)) {
                    while(checkIntersection(horizontalRect, borderRect)) {
                        if (this.isScreenMoving){
                            horizontalRect.x += Math.sign(this.screenSpeed);
                        }else{
                            horizontalRect.x -= Math.sign(this.x_speed);
                        }
                        
                    }
                    this.x = horizontalRect.x;
                    this.x_speed = 0;
                    this.screenSpeed = 0;
                }
                
                if (checkIntersection(verticalRect, borderRect)) {
                    while(checkIntersection(verticalRect, borderRect)) {
                        verticalRect.y -= Math.sign(this.y_speed);
                    }
                    this.y = verticalRect.y;
                    this.y_speed = 0;
                    this.isGrounded = true;
                }
                
                /*if(checkIntersection(verticalRect, borderRect) && checkIntersection(horizontalRect, borderRect)){
                    this.y_speed = 0;
                    this.x_speed = 0;
                    console.log("bonjour");
                }*/
                /*if(checkIntersection(diagonalRect, borderRect)){
                    while(checkIntersection(diagonalRect, borderRect)) {
                        verticalRect.y -= 
                    }
                    if (this.isScreenMoving){
                        if (this.screenSpeed >= 0){
                            this.screenSpeed = -1;
                        }else{
                            this.screenSpeed = 1
;                        }
                        
                    }else{
                        if (this.x_speed >= 0){
                            this.x_speed = 0;
                        }else{
                            this.x_speed = 0;
                        }
                        
                    }
                    
                    
                    console.log("bonjour");
                    
                }*/
                
                /*if (checkIntersection(collisionRect, borders[n_i])) {
                    while(checkIntersection(collisionRect, borders[n_i])){
                        if(this.isScreenMoving){
                            collisionRect.x += Math.sign(this.screenSpeed)
                        }else{
                            collisionRect.x -= Math.sign(this.x_speed);
                        }
                        collisionRect.y -= Math.sign(this.y_speed);
                    }
                    this.x = collisionRect.x;
                    this.y = collisionRect.y;
                    this.x_speed = 0;
                    this.y_speed = 0;
                    this.screenSpeed = 0;
                    console.log("bonjour");
                }*/
            }
                
            
            
            if(this.y_speed != 0){
                this.isGrounded = false;
            }
            
            this.x += this.x_speed;
            this.y += this.y_speed;
            
            for(let n_i = 0; n_i < borders.length; n_i++){
                borders[n_i].x += this.screenSpeed;
            }
            lostImage[0].x += this.screenSpeed;
        }
    };
    
    this.draw = function() {
        screenContext.drawImage(this.sprite, this.x, this.y, player.width, player.height);
    };
}