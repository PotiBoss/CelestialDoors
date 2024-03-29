

export default class ScenePreload extends Phaser.Scene 
{
	constructor()
	{
		super("ScenePreload");

	}

	preload() 
	{
		var width = this.cameras.main.width;
		var height = this.cameras.main.height;

		var progressBar = this.add.graphics();
		var progressBox = this.add.graphics();
		progressBox.fillStyle(0x111111, 0.5);
		//progressBox.fillRect(240, 270, 320, 50);
		progressBox.fillRect(width/3, height/3, 320, 25)
		

		var loadingText = this.make.text({
			x: width / 2 + 10,
			y: height / 3 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		
		var percentText = this.make.text({
			x: width / 2,
			y: height / 3 - 15,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		
		var assetText = this.make.text({
			x: width / 2,
			y: height / 3 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		assetText.setOrigin(0.5, 0.5);
		
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(width / 3, height / 3, 320 * value, 25);
		});
		
		this.load.on('fileprogress', function (file) {
		//	assetText.setText('Loading asset: ' + file.key);
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});

		this.load.tilemapTiledJSON('dungeon', 'assets/owo11.json'); //NORMALNA
		this.load.image('tiles', 'assets/tileset.png'); //NORMALNA

		this.load.spritesheet('tilesSheet', 'assets/tileset.png',{frameWidth:16,frameHeight:16});

		this.load.image('playerBase', 'assets/PlayerBase.png');
		
		this.load.spritesheet('playerDeath', 'assets/playerDeathSheet.png', {frameWidth:20,frameHeight:41});

		this.load.spritesheet('playerFront', 'assets/PlayerFront.png', {frameWidth:21,frameHeight:41});
		this.load.spritesheet('playerBack', 'assets/PlayerBack.png', {frameWidth:21,frameHeight:41});
		this.load.spritesheet('playerSide', 'assets/PlayerSide.png', {frameWidth:23,frameHeight:41});

		this.load.spritesheet('throwFront', 'assets/ThrowFront.png', {frameWidth:25.8,frameHeight:41}); //25.8
		this.load.spritesheet('throwBack', 'assets/ThrowBack.png', {frameWidth:24.8,frameHeight:45}); // 24.8
		this.load.spritesheet('throwSide', 'assets/ThrowSide.png', {frameWidth:37,frameHeight:47}); // 36.8

		
		this.load.spritesheet('throwFrontBlue', 'assets/ThrowFrontBlue.png', {frameWidth:25.8,frameHeight:41}); //25.8
		this.load.spritesheet('throwBackBlue', 'assets/ThrowBackBlue.png', {frameWidth:24.8,frameHeight:45}); // 24.8
		this.load.spritesheet('throwSideBlue', 'assets/ThrowSideBlue.png', {frameWidth:37,frameHeight:47}); // 36.8

		this.load.spritesheet('throwFront2', 'assets/ThrowFront2.png', {frameWidth:25.8,frameHeight:41}); //25.8
		this.load.spritesheet('throwBack2', 'assets/ThrowBack2.png', {frameWidth:24.8,frameHeight:45}); // 24.8
		this.load.spritesheet('throwSide2', 'assets/ThrowSide2.png', {frameWidth:37,frameHeight:47}); // 36.8

		this.load.spritesheet('potionFront', 'assets/PotionFront.png', {frameWidth:9,frameHeight:13});
		this.load.spritesheet('potionSide', 'assets/PotionSide.png', {frameWidth:14,frameHeight:13});
		
		this.load.spritesheet('potionFrontBlue', 'assets/PotionFrontBlue.png', {frameWidth:9,frameHeight:13});
		this.load.spritesheet('potionSideBlue', 'assets/PotionSideBlue.png', {frameWidth:14,frameHeight:13});

		this.load.spritesheet('projectiles', 'assets/BulletsSheet.png', {frameWidth:16,frameHeight:16});
		this.load.spritesheet('bombs', 'assets/bomb.png', {frameWidth:16,frameHeight:16});

		this.load.spritesheet('ranged', 'assets/RangedSheet.png', {frameWidth:32,frameHeight:32});
		this.load.spritesheet('chargeBall', 'assets/ChargeBallSheet.png', {frameWidth:32,frameHeight:32});

		this.load.spritesheet('skeletonFront', 'assets/SkeletonFrontSheet.png', {frameWidth:23,frameHeight:41})
		this.load.spritesheet('skeletonBack', 'assets/SkeletonBackSheet.png', {frameWidth:23,frameHeight:41})
		this.load.spritesheet('skeletonSide', 'assets/SkeletonSideSheet.png', {frameWidth:23,frameHeight:41})

		this.load.spritesheet('necromancerFront', 'assets/NecromancerFront.png', {frameWidth:23,frameHeight:41})
		this.load.spritesheet('necromancerBack', 'assets/NecromancerBack.png', {frameWidth:23,frameHeight:41})
		this.load.spritesheet('necromancerSide', 'assets/NecromancerSide.png', {frameWidth:23,frameHeight:41})

		this.load.image('npcHorny', 'assets/npcHorny.png');
		this.load.image('npcNotHorny', 'assets/npcNotHorny.png');

		this.load.image('Credits','assets/Credits.png');
		this.load.image('CreditsHighlight','assets/CreditsHighlight.png');
		this.load.image('Play','assets/Play.png');
		this.load.image('PlayHighlight','assets/PlayHighlight.png');


		this.load.spritesheet('bossSheet', 'assets/bossSheet.png',{frameWidth:23,frameHeight:41.666});
		this.load.spritesheet('bossBack', 'assets/bossBack.png',{frameWidth:23*3,frameHeight:41*3}); 
		this.load.spritesheet('bossSide', 'assets/bossSide.png',{frameWidth:23*3,frameHeight:41*3}); 
		this.load.spritesheet('bossFront', 'assets/bossFront.png',{frameWidth:23*3,frameHeight:41*3});  //WHY DOMINIK

		this.load.image('workbench', 'assets/workbench.png');

		this.load.spritesheet('pots','assets/pots.png',{frameWidth:32,frameHeight:32});

		this.load.image('indi', 'assets/indi.png');

		this.load.image('inventoryBackground', 'assets/HudSheet.png');
		this.load.image('buffBackground', 'assets/BuffSheet.png');

		this.load.spritesheet('tombstone', 'assets/BossDeathSheet.png',{frameWidth:66,frameHeight:123});

		this.load.spritesheet('finalTeleport', 'assets/FinalTP.png',{frameWidth:32,frameHeight:32});
		this.load.spritesheet('gate', 'assets/Gate.png',{frameWidth:96,frameHeight:96});

		this.load.spritesheet('healthBar', 'assets/HealthBarSheet.png',{frameWidth:16,frameHeight:26});

		this.load.spritesheet('skillHud', 'assets/SkillHud.png',{frameWidth:32,frameHeight:35});

		this.load.image('titleBackground', 'assets/title_bg.jpg');
		this.load.image('title', 'assets/logo.png');

		this.load.image('ciastko', 'assets/Ciastko.png')

		this.load.audio('menuBGM', [
			'audio/menuBGM.ogg'
		]);

		this.load.audio('gameBGM', [
			'audio/gameBGM.ogg'
		]);

		this.load.audio('potionBreak', [
			'audio/potionBreak.ogg'
		]);

		this.load.audio('blink', [
			'audio/blink.ogg'
		]);

		this.load.audio('skeletonSpawn', [
			'audio/skeletonSpawn.ogg'
		]);

		this.load.audio('textScroll', [
			'audio/textScroll.ogg'
		]);

		this.load.audio('playerDamaged', [
			'audio/playerDamaged.ogg'
		]);

		this.load.audio('pickUp', [
			'audio/pickUp.ogg'
		]);
		
		this.load.audio('potion', [
			'audio/potion.ogg'
		]);
		
		this.load.audio('projectileHit', [
			'audio/projectileHit.ogg'
		]);

		this.load.audio('bombSkill', [
			'audio/bombSkill.ogg'
		]);
		
		this.load.audio('boss', [
			'audio/boss.ogg'
		]);
	}
	create() 
	{
		this.scene.start('SceneMenu');
	}
}	