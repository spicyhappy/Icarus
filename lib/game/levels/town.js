ig.module( 'game.levels.town' )
.requires( 'impact.image','game.entities.player','game.entities.child','game.entities.enemy1','game.entities.waves' )
.defines(function(){
LevelTown=/*JSON[*/{"entities":[{"type":"EntityPlayer","x":40,"y":49},{"type":"EntityChild","x":30,"y":53},{"type":"EntityEnemy1","x":127,"y":52},{"type":"EntityWaves","x":64,"y":104},{"type":"EntityWaves","x":0,"y":104},{"type":"EntityWaves","x":112,"y":104},{"type":"EntityWaves","x":144,"y":104},{"type":"EntityWaves","x":160,"y":104},{"type":"EntityWaves","x":80,"y":104},{"type":"EntityWaves","x":96,"y":104},{"type":"EntityWaves","x":16,"y":104},{"type":"EntityWaves","x":32,"y":104},{"type":"EntityWaves","x":128,"y":104},{"type":"EntityWaves","x":48,"y":104}],"layer":[{"name":"main","width":11,"height":9,"linkWithCollision":false,"visible":1,"tilesetName":"media/background-tiles3.gif","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[7,7,7,7,7,7,7,7,7,7,7],[8,8,8,8,8,8,8,8,8,8,8],[9,9,9,9,9,9,9,9,9,9,9],[10,10,10,10,10,10,10,10,10,10,10],[11,11,11,11,11,11,11,11,11,11,11],[12,12,12,12,12,12,12,12,12,12,12],[16,16,16,16,16,16,16,16,16,16,16],[16,16,16,16,16,16,16,16,16,16,16],[16,16,16,16,16,16,16,16,16,16,16]]},{"name":"sun","width":10,"height":4,"linkWithCollision":false,"visible":1,"tilesetName":"media/backgroundSun.gif","repeat":false,"preRender":false,"distance":"1","tilesize":16,"foreground":false,"data":[[0,0,0,1,2,0,0,0,0,0],[0,0,0,3,4,0,0,6,7,0],[0,0,0,0,0,0,0,10,11,0],[0,0,0,0,0,0,0,0,0,0]]},{"name":"collision","width":22,"height":18,"linkWithCollision":false,"visible":true,"tilesetName":"","repeat":false,"preRender":false,"distance":1,"tilesize":8,"foreground":false,"data":[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]},{"name":"water","width":22,"height":18,"linkWithCollision":false,"visible":1,"tilesetName":"media/background-tiles3.gif","repeat":false,"preRender":false,"distance":"1","tilesize":8,"foreground":true,"data":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}]}/*]JSON*/;
LevelTownResources=[new ig.Image('media/background-tiles3.gif'), new ig.Image('media/backgroundSun.gif'), new ig.Image('media/background-tiles3.gif')];
});