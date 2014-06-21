ig.module(
	'game.entities.citizen'
)
.requires(
	'impact.entity',
	'impact.sound'
)
.defines(function(){

EntityCitizen = ig.Entity.extend({

    animSheet: new ig.AnimationSheet( 'media/citizen1.png', 32, 32 ),
    hitSFX: new ig.Sound('media/audio/king-surprise.*'),
    
    size: {x: 9, y:29},
    offset: {x: 11, y: 3},
    flip: false,
    
    //
    health: 3,
    
    // Physics
    maxVel: {x: 100, y: 100},
    friction: {x: 150, y: 0},
    speed: 14,
    
    // Collision
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .07, [0,1,2,3,4,5]);
    },
    update: function() {
    	// near an edge? return!
    },
    check: function(A) {
	    console.log("Hit!");
	    //this.hitSFX.play();
    }
});
});
