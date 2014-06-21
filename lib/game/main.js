ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.levels.town',
	'impact.timer',
	'game.entities.enemy1',
	'game.entities.child',
	'game.entities.waves'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	instructText: new ig.Font( 'media/04b03.font.png' ),
	lifeSprite: new ig.Image('media/statusLife.gif'),
	statusText: new ig.Font( 'media/04b03.font.png' ),
	statMatte: new ig.Image('media/statusBar.png'),
	enemyTimer: new ig.Timer(),
	pressSomething: false,
	winTime: 20,
	
	gravity: 20,
	
	// Continuously spawn birds
	spawnEnemy: function(time,positionY) {
		var enemy = false;
		if (this.enemyTimer.delta() > time) {
			if (enemy === false) {
				enemy = true;
				ig.game.spawnEntity(EntityEnemy1,180,positionY);
				this.enemyTimer.reset();
			}
		}	
	},	
	// Controls how child follows parent, leaves child after certain distrance
	followParent: function(distance1,distance2,distance3,accel1,accel2) {	
			if (this.player && this.child) {
			var pcDistance = this.child.distanceTo(this.player);
			var follow;
			
			if (pcDistance<distance1) {
				follow = true;
				accelFactor=accel1;
			}
			
			else if (pcDistance>distance1 && pcDistance<distance2) {
				accelFactorFactor=accel2;
			}
			
			else if (pcDistance>distance2) {
				follow = false;
				
			}
			
			
			/* Modified follow script from blog.davidrhayes.com/post/34523414782/platformer-game-prototype */
			if (follow) {
				var currentX = this.child.pos.x;
				var currentY = this.child.pos.y;
				var targetX = this.player.pos.x-12;
				var targetY = this.player.pos.y;
			
				this.child.pos.x = currentX+(targetX - currentX)*accelFactor;
				this.child.pos.y = currentY+(targetY - currentY)*accelFactor;
			}
			
			else {
				this.child.gravityFactor = -0.05;
			}
		}
		},
	// Text and background while dead
	death: function(line1,line2,line3,line4,backgroundImg) {
		var x = ig.system.width/2,
			y = ig.system.height*4/5,
			x1 = 10,
			y1 = 10;
		
		var deathText = new ig.Font( 'media/04b03.font.png' );	
		var deathBackground = new ig.Image('media/'+backgroundImg);
		deathBackground.draw(0,0);
				
		deathText.draw(line1, x1, y1, ig.Font.ALIGN.LEFT);
		deathText.draw(line2, x1, y1+10, ig.Font.ALIGN.LEFT);
		deathText.draw(line3, x1, y1+20, ig.Font.ALIGN.LEFT);
		deathText.draw(line4, x1, y1+30, ig.Font.ALIGN.LEFT);
		deathText.draw('Press enter to start', x, y, ig.Font.ALIGN.CENTER);	
	},
	// Detect if anything is pressed
	anyPress: function () {
		if (ig.input.pressed('left') || ig.input.pressed('right') || ig.input.pressed('down') || ig.input.pressed('jump') || ig.input.pressed('shoot')) {
			this.pressSomething = true;
			return true;
		}
			
		else {
			return false;
		}
	},
	// Remove instructions at the beginning
	removeInstructText: function() { 
			
			if (this.levelTimer.delta() > 5 && this.instructText) {
				this.instructText=null;
			} 
			
			if (this.levelTimer.delta() > 3 && this.instructText) {
				this.gravity = 150;
			}
			
			if (this.anyPress() && this.instructText) {
				this.gravity = 150;
			}
	},
	
	getNumEnding: function() {
		var numEnding = 0;
		
		for (i=0; i<10; i++) {
			if (ig.global.totalEnding[i] === true) {
				numEnding++;
			}
		}
		
		return numEnding;
	},
	
	init: function() {
	
		this.loadLevel ( LevelTown );
		this.levelTimer = new ig.Timer();
		this.screen.x = 8;	
		this.screen.y = 8;
		this.waterPoints = 0;
		
		// Setup keys
		ig.input.bind( ig.KEY.LEFT_ARROW , 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW , 'right' );
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.MOUSE1 , 'jump');
		
		
		ig.global.deathSun = false;
		ig.global.deathWater = false;
		ig.global.deathChild = false;
		ig.global.deathPlayer = false;
		
		if (!ig.global.totalEnding) {
			ig.global.totalEnding = [false,false,false,false,false,false,false,false,false,false];
		}
		
		if (this.getNumEnding() === 10) {
			ig.system.setGame(WinFinal);
		}
	},
	
	update: function() {
		
		this.player = this.getEntitiesByType( EntityPlayer )[0];
		this.child = this.getEntitiesByType( EntityChild )[0];
		
		// While you are still alive...
		if (ig.global.deathPlayer === false) {
			
			this.removeInstructText();	
			this.spawnEnemy(Math.random()*2+.5,Math.random()*58+32);
			this.followParent(18,50,150,0.13,0.02);
			
			if (this.player.pos.y>92) {
				
				this.waterPoints++;
			}
			
			// After win time, disply different win states
			if (this.levelTimer.delta() > this.winTime) {
				
				
				if (this.waterPoints > 500) {
					ig.global.totalEnding[4] = true;
					ig.system.setGame(WinCheap);
				}
				
				else if (ig.global.deathChild === false && this.player.health === 3) {
					ig.global.totalEnding[0] = true;
					ig.system.setGame(WinPerfect);
					
				}
			
				else if (ig.global.deathChild === true && this.player.health === 3) {
					ig.global.totalEnding[1] = true;
					ig.system.setGame(WinPointless);
				}
				
				else if (ig.global.deathChild === true && this.player.health < 3) {
					ig.global.totalEnding[2] = true;
					ig.system.setGame(WinSad);
				}
				
				else {
					ig.global.totalEnding[3] = true;
					ig.system.setGame(WinNormal);
				}
			}	
		
		}
		
		// When you are dead
		if (ig.global.deathPlayer === true) {
			// Death message
			
			if(!this.pressSomething) {
				ig.global.totalEnding[5] = true;
				ig.system.setGame(DeathNatural);

			}
			else if(ig.global.deathPositionY < 28 && ig.global.deathSun) {
				ig.global.totalEnding[6] = true;
				ig.system.setGame(DeathSunny);
			}
			
			else if (ig.global.deathPositionY >104 && ig.global.deathWater) {
				ig.global.totalEnding[7] = true;
				ig.system.setGame(DeathWatery);	
			}
			
			else if (ig.global.deathChild === false) {
				ig.global.totalEnding[8] = true;
				ig.system.setGame(DeathHopeful);
			}
			
			else {
				ig.global.totalEnding[9] = true;
				ig.system.setGame(DeathRegular);
			}
		}
		
		this.parent();
	
	},
	
	draw: function() {
	
		var player = this.getEntitiesByType( EntityPlayer )[0];
		var child = this.getEntitiesByType( EntityChild )[0];
		
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Control instructions
		if (this.instructText) {
			var x = ig.system.width/2,
				y = ig.system.height*7/8;
			this.instructText.draw('Press Mouse or Space to fly', x, y, ig.Font.ALIGN.CENTER);
		}
		
		if (ig.global.deathPlayer === false) {
		// Health
			for (i=0; i<player.health; i++) {
				this.lifeSprite.draw(5+i*10,5);
			}
		}
		
	}
});

AnyScreen = ig.Game.extend({

	line1: "",
	line2: "",
	line3: "",
	line4: "",
	
	
	backgroundImg: "",
	level: "",
	getNumEnding: function() {
		var numEnding = 0;
		
		for (i=0; i<10; i++) {
			if (ig.global.totalEnding[i] === true) {
				numEnding++;
			}
		}
		
		return numEnding;
	},

	
	win: function(line1, line2, line3, line4, backgroundImg) {
		var x = ig.system.width/2,
			y = ig.system.height*4/5,
			x1 = 10,
			y1 = 24;
			
		var winText = new ig.Font( 'media/04b03.font.png' );
		var winBackground = new ig.Image('media/'+backgroundImg);
		winBackground.draw(0,0);
		winText.draw(this.line1, x1, y1, ig.Font.ALIGN.LEFT);
		winText.draw(this.line2, x1, y1+10, ig.Font.ALIGN.LEFT);
		winText.draw(this.line3, x1, y1+20, ig.Font.ALIGN.LEFT);
		winText.draw(this.line4, x1, y1+30, ig.Font.ALIGN.LEFT);
		winText.draw('Press Mouse or Space to start', x, y, ig.Font.ALIGN.CENTER);
			
	},
	
	init: function() {
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.MOUSE1 , 'jump');
	},
	
	update: function() {	
		
		if(ig.input.pressed('jump')){
			
				if (this.getNumEnding() === 10) {
					ig.system.setGame(WinFinal);
			}
				else {ig.system.setGame(MyGame);}
		}			
		
		if (ig.global.totalEnding && this.getNumEnding() > 0) {
			this.line4 = this.getNumEnding()+"/10 ENDINGS FOUND";
		}
		
		this.parent();
	},
	
	draw: function() {
		this.win(this.line1, this.line2, this.line3, this.line4, this.backgroundImg);
	}
});

StartScreen = ig.Game.extend({
	
	instructText: new ig.Font('media/04b03.font.png'),
	background: new ig.Image('media/screenBG2.gif'),
	
	init: function() {
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.MOUSE1 , 'jump');
		ig.global.totalEnding = [false,false,false,false,false,false,false,false,false,false];
	},
	update: function() {				
		if(ig.input.pressed('jump')){
			ig.system.setGame(StartScreen2);
		}
		this.parent();
	},
	draw: function() {
		this.parent();
		this.background.draw(0,0);
		
		var x = ig.system.width/2,
			y = ig.system.height*4/5;
		
		this.instructText.draw('Press Mouse or Space to start', x, y, ig.Font.ALIGN.CENTER);

	}
	
});

StartScreen2 = AnyScreen.extend({
	line1: "Follow me closely, son.",
	line2: "Our wings are strong but",
	line3: "fragile and many dangers",
	line4: "lie ahead . . .",
	backgroundImg: "screenBG3.gif",
	level: MyGame,
	
});

WinNormal = AnyScreen.extend({

	line1: "NORMAL WIN",
	line2: "Pain is inevitable",
	line3: "Suffering is optional.",
	backgroundImg: "screenBG3.gif",
	level: MyGame,
});

WinCheap = AnyScreen.extend({

	line1: "CHEAP WIN",
	line2: "Darling it's better",
	line3: "down where it's wetter.",
	backgroundImg: "screenBG3.gif",
	level: MyGame,
});

WinPerfect = AnyScreen.extend({
	
	line1: "PERFECT WIN",
	line2: "To live is the rarest thing.",
	line3: "Most people exist, that is all.",
	backgroundImg: "screenBG3.gif",
	level: MyGame,
});

WinPointless = AnyScreen.extend({

	line1: "POINTLESS WIN",
	line2: "How my achievements",
	line3: "mock me!",
	backgroundImg: "screenBG3.gif",
	level: MyGame,
});

WinSad = AnyScreen.extend({

	line1: "SAD WIN",
	line2: "What is essential is often",
	line3: "invisible to the eyes.",
	backgroundImg: "screenBG3.gif",
	level: MyGame,
});

DeathNatural = AnyScreen.extend({
	
	line1: "NATURAL DEATH",
	line2: "That nature brings me home,",
	line3: "To fall is in the order of things.",
	backgroundImg: "screenDeath1.png",
	level: MyGame,
});

DeathSunny = AnyScreen.extend({
	
	line1: "SUNNY DEATH",
	line2: "The sun is a wondrous body",
	line3: "like a magnificent father!",
	backgroundImg: "screenDeath1.png",
	level: MyGame,
});

DeathWatery = AnyScreen.extend({
	
	line1: "WATERY DEATH",
	line2: "He who is drowned",
	line3: "is not troubled by the rain.",
	backgroundImg: "screenDeath1.png",
	level: MyGame,
});

DeathHopeful = AnyScreen.extend({
	
	line1: "HOPEFUL DEATH",
	line2: "What makes a desert beautiful?",
	line3: "Somewhere it hides a well.",
	backgroundImg: "screenDeath1.png",
	level: MyGame,
});

DeathRegular = AnyScreen.extend({
	
	line1: "REGULAR DEATH",
	line2: "Oh cruel fate,",
	line3: "what a tragic hand you deal me!",
	backgroundImg: "screenDeath1.png",
	level: MyGame,
});

WinFinal = ig.Game.extend({

	line1: "CONGRATULATIONS",
	line2: "You found all my endings.",
	line3: "Good luck finding yours!",
	line4: "Thank you for playing.",
	backgroundImg: "screenWin1.png",
	level: StartScreen,
	
	win: function(line1, line2, line3, line4, backgroundImg) {
		var x = ig.system.width/2,
			y = ig.system.height*4/5,
			x1 = 10,
			y1 = 24;
			
		var winText = new ig.Font( 'media/04b03.font.png' );
		var winBackground = new ig.Image('media/'+backgroundImg);
		winBackground.draw(0,0);
		winText.draw(this.line1, x1, y1, ig.Font.ALIGN.LEFT);
		winText.draw(this.line2, x1, y1+10, ig.Font.ALIGN.LEFT);
		winText.draw(this.line3, x1, y1+20, ig.Font.ALIGN.LEFT);
		winText.draw(this.line4, x1, y1+30, ig.Font.ALIGN.LEFT);
		winText.draw('Made by Xin Xin', x, y, ig.Font.ALIGN.CENTER);
			
	},
	
	init: function() {
		ig.input.bind( ig.KEY.SPACE , 'jump' );
		ig.input.bind( ig.KEY.MOUSE1 , 'jump');
	},
	
	update: function() {	
		
		if(ig.input.pressed('jump')){
			
			ig.system.setGame(StartScreen);
		}			
		
		this.parent();
	},
	
	draw: function() {
		this.win(this.line1, this.line2, this.line3, this.line4, this.backgroundImg);
	}

});

// Start the Game with 60fps, a resolution of 160x120
ig.main( '#canvas', StartScreen, 60, 160, 120, 4 );

});
