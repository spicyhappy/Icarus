ig.module(
	'game.entities.waves'
)
.requires(
	'impact.entity'
)
.defines(function () {

	EntityWaves = ig.Entity.extend({
	
		animSheet: new ig.AnimationSheet('media/waves.gif', 16, 16),
		size:{x:16,y:16},
		speed: 0,
		gravityFactor: 0,
		zIndex: 4,
		
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.NONE,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		handleMovementTrace: function( res ) {
    		this.pos.x += this.vel.x * ig.system.tick;
    		this.pos.y += this.vel.y * ig.system.tick;
    	},

		init: function( x, y, settings ) {

			this.parent( x, y, settings );
			this.addAnim('run',0.1,[0,1,2,3,4,5,6,7,8,9,10,11]);
		},
		
        update: function() {
	           	
        	this.parent();
        }
    
	});
});