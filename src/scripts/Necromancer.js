import EnemyBase from "./EnemyBase";
import initAnims from './AnimsNecromancer'

export default class Necromancer extends EnemyBase
{
	constructor(scene, name, x, y)
		{
		super(scene, x, y, 'necromancerFront', 0);

		this.scene.physics.add.existing(this);

		initAnims(scene.anims);

		this.x = x;
		this.y = y;
		this.scene = scene;
		this.body.onCollide = true;
		this.setPushable(false)
		this.scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);
		this.setupDirections();
		this.enemyMaxHealth = 40;
				
		this.enemySpeed = 60;
		this.enemyHealth = 40;
		
		this.visionRange = 450;
		this.attackRange = 250;

		this.skeletonSpawnCooldown = 5000;
		this.skeletonSpawnFlag = true;

		this.damageTime = 0;
		this.damagedInvulnerability = 500;
	}



	preUpdate(time, deltaTime)
	{
		super.preUpdate(time, deltaTime);

		if(!this.isCharging)
		{
			this.changeDirection()
		}

		this.chasePlayer();  //TODO: WLACZYC

		this.healthbar.preUpdate();
		
		this.handleState(deltaTime);

		if(this == undefined)
		{
			this.timerPlayerSeen.remove(); // moze fixuje buga z undefined przy spawnie szkieleta??
		}
	}

	chasePlayer()
	{
		this.enemyPlayerOffsetX = this.x - this.scene.myPlayer.x;
		this.enemyPlayerOffsetY = this.y - this.scene.myPlayer.y;


		if(this.enemyPlayerOffsetX >= 0  && Math.abs(this.enemyPlayerOffsetX) >= Math.abs(this.enemyPlayerOffsetY))
		{
			this.flipX = true;

			if(this.body.velocity.x == 0 || this.body.velocity.y == 0)
			{
				this.anims.play('necromancerSide', true);
			}
			else
			{
				this.anims.play('necromancerSideAnim', true);
			}
		} 
		else if(this.enemyPlayerOffsetY <= 0  && Math.abs(this.enemyPlayerOffsetY) >= Math.abs(this.enemyPlayerOffsetX))
		{
			if(this.body.velocity.x == 0 || this.body.velocity.y == 0)
			{
				this.anims.play('necromancerFront', true);
			}
			else
			{
				this.anims.play('necromancerFrontAnim', true);
			}

		} 
		else if(this.enemyPlayerOffsetX <= 0  && Math.abs(this.enemyPlayerOffsetX) >= Math.abs(this.enemyPlayerOffsetY)) 
		{
			this.flipX = false;
			if(this.body.velocity.x == 0 || this.body.velocity.y == 0)
			{
				this.anims.play('necromancerSide', true);
			}
			else
			{
				this.anims.play('necromancerSideAnim', true);
			}
		}
		else if(this.enemyPlayerOffsetY >= 0  && Math.abs(this.enemyPlayerOffsetY) >= Math.abs(this.enemyPlayerOffsetX))
		{
			if(this.body.velocity.x == 0 || this.body.velocity.y == 0)
			{
				this.anims.play('necromancerBack', true);
			}
			else
			{
				this.anims.play('necromancerBackAnim', true);
			}
		} 

		this.myPlayer = this.scene.myPlayer;
		if(Math.abs(this.x - this.myPlayer.x) < this.visionRange && Math.abs(this.y - this.myPlayer.y) < this.visionRange)
		{
			this.seenPlayer();
			this.scene.physics.moveToObject(this, this.myPlayer, 75);
			if(Math.abs(this.x - this.myPlayer.x) < this.attackRange && Math.abs(this.y - this.myPlayer.y) < this.attackRange)
			{
				this.setVelocity(0,0);
			}
		}
	}

	seenPlayer()
	{
		if(this.skeletonSpawnFlag)
		{
			this.skeletonSpawnFlag = false;
			this.timerPlayerSeen = this.scene.time.addEvent({ 
				delay: this.skeletonSpawnCooldown, 
				callback: this.spawnSkeleton, 
				callbackScope: this});
		}
	}

	spawnSkeleton()
	{

		if(this.scene != undefined)
		{
			this.scene.currentMap.skeletons.get(this.x + this.width, this.y);
			this.scene.currentMap.skeletons.get(this.x - this.width, this.y);
			this.skeletonSpawnFlag = true;
			this.skeletonSound = this.scene.sound.add('skeletonSpawn', {
				volume: 0.3,
				repeat: 5
			});
			this.skeletonSound.play();
		}
	}

	handleTileCollision(go = Phaser.GameObjects.GameObject, tile = Phaser.Tilemaps.Tile)
	{
		if(this.isCharging && !go)
		{
			this.setupChargeLocation();
		}

		if(go !== this) { return; }
		this.direction = Phaser.Math.Between(0, 3);
	}


	changeHP()
	{
		this.healthbar.setMeterPercentage(this.enemyHealth / this.enemyMaxHealth * 100);
	//	console.log(this.enemyHealth)
	}
}
