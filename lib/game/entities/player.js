ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.sound',
	'impact.timer'
)
.defines(function () {
	EntityPlayer = ig.Entity.extend({
	
		animSheet: new ig.AnimationSheet('media/player2.gif', 16, 16),
		sweatAnimSheet: new ig.AnimationSheet('media/sweatdrops.gif', 16, 16),
		size: {x: 5, y:15},
		offset: {x:8, y:1},	
		flip: false,
		health: 3,
		invincible: true,
		invincibleDelay: 1.5,
		invincibleTimer: null,
		gravityFactor: 1,
		sweatTimer: new ig.Timer(),
		zIndex: 1,
		
		// Physics
		maxVel: {x:100, y:150},
		friction: {x:600, y: 0},
		accelGround: 400,
		accelAir: 100,
		jump: 5,
		
		// Collision
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		// Make invincible
		makeInvincible: function(){
			this.invincible = true;
			this.invincibleTimer.reset();
		},
		
		init: function(x,y,settings) {
			// Different animation states
			this.parent(x,y,settings);
			this.addAnim('run',0.07,[5,4,3,2,1,0]);
			
			// Set invincibility timer and start out invincible
			this.invincibleTimer = new ig.Timer();
			this.makeInvincible();
		},
		
        update: function() {
          
          	// Testing
          	  
            var accel = this.standing ? this.accelGround : this.accelAir;
            this.currentAnim = this.anims.run;
            this.currentAnim.flip.x = this.flip;
            
            // Move left/right
        	if( ig.input.state('left') ) {
        		this.accel.x = -accel;
        		this.flip = true;
        	}else if( ig.input.state('right') ) {
        		this.accel.x = accel;
        		this.flip = false;
        	}else{
        		this.accel.x = 0;
        	}
        	
        	// Jump with acceleration
        	
        	if( ig.input.state('jump') ) {
        		if (this.jump < 50) {
        			this.jump=this.jump*1.2;
        		}
        		this.vel.y = -this.jump;
        		//this.jumpSFX.play();
        	}
        	
        	// Reset jump
        	
        	if( ig.input.released('jump') ) {
        		this.jump = 5;
        	}
        	
        	
        	// Remove invincibily after delay
        	if (this.invincibleTimer.delta()>this.invincibleDelay) {
	        	this.invincible = false;
	        	this.currentAnim.alpha = 1;
        	}
        	
        	if (this.pos.y < 33) {
        		if(this.sweatState === false) {
	        		this.sweatAnim = new ig.Animation(this.sweatAnimSheet, 0.07, [0,1,2]);
        		}
        		
        		this.sweatAnim.update();
        		this.sweatState = true;
        	}
        	
        	if (this.pos.y > 38 && this.pos.y < 92) {
	        	this.sweatState = false;
        	}
        	
        	if (this.pos.y > 95) {
	        	if(this.sweatState === false) {
	        		this.sweatAnim = new ig.Animation(this.sweatAnimSheet, 0.07, [0,1,2]);
        		}
	        	this.sweatAnim.update();
        		this.sweatState = true;
        	}
        	
        	// Kill player if flies too close to the sun/water
        	if (this.pos.y < 28) {
        		ig.global.deathPositionY = this.pos.y;
        		ig.global.deathSun = true;
	        	this.kill();
        	}
        	
        	if (this.pos.y > 104) {
        		ig.global.deathPositionY = this.pos.y;
        		ig.global.deathWater = true;
	        	this.kill();
        	}
        	
        	this.parent();
        },
        
        receiveDamage: function(amount,from) {
	        // Don't take damage if you're invincible
	        if(this.invincible)
	        	this.parent(0, from);
	        
	        if(!this.invincible) {
	        	this.parent(amount, from);
		    	this.makeInvincible();   
	        }
        },
        
        kill: function() {
        	ig.global.deathPlayer = true;
	        this.parent();
        },
        
        draw: function(){
        
        	// Fade in when invincible
	        if(this.invincible) {
	        	this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay*1;
	        }
	        if(this.sweatState) {
		        var x = this.pos.x-15,
        			y = this.pos.y-15;
        		
        		
        		this.sweatAnim.draw(x,y);
	        }
	        this.parent();
        }
    
	});
});