ig.module(
	'game.entities.enemy1'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){

EntityEnemy1 = ig.Entity.extend({

    animSheet: new ig.AnimationSheet( 'media/enemy1.gif', 16, 16 ),
    
    size: {x: 9, y:8},
    offset: {x: 3, y: 4},
    flip: false,
    zIndex: 3,

    health: 1,
    damagePoint: 1,
	    
    // Physics
    //maxVel: {x: 100, y: 100},
    //friction: {x: 150, y: 0},
    speed: 40,
    gravityFactor: 0,
    bounciness: .8,
    
    // Collision
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    
    // Ignore map collisions
    handleMovementTrace: function( res ) {
    	this.pos.x += this.vel.x * ig.system.tick;
    	this.pos.y += this.vel.y * ig.system.tick;
    },
    
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('fly', .07, [0,3,2,1]);
    },
    
    update: function() {
    	
    	this.vel.x = this.speed * -1;
    	
    	// Remove if goes off screen on the left side
    	if (this.pos.x < -20) {
	    	this.kill();
    	}
    	
    	
    	this.parent();
    },
    
    check: function(other) {
	    this.receiveDamage(this.damagePoint, this);
	    other.receiveDamage(this.damagePoint, this);
	    //this.hitSFX.play();
    }
});
});
