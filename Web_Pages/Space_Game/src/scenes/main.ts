import { ImageType, SoundType } from "../interface/assets";
import { Bullet } from "../interface/bullet";
import { AssetManager } from "../interface/manager/asset-manager";
import { AlienManager } from "../interface/manager/alien-manager";
import { Ship } from "../interface/ship";
import {
    AnimationFactory,
    AnimationType,
} from "../interface/factory/animation-factory";
import { Alien } from "../interface/alien";
import { Explosion } from "../interface/explosion";
import { EnemyBullet } from "../interface/enemy-bullet";
import { ScoreManager } from "../interface/manager/score-manager";
import { GameState } from "../interface/game-state";

export class MainScene extends Phaser.Scene {
    state: GameState;
    assetManager: AssetManager;
    animationFactory: AnimationFactory;
    scoreManager: ScoreManager;
    bulletTime = 0;
    firingTimer = 0;
    starfield: Phaser.GameObjects.TileSprite;
    player: Phaser.Physics.Arcade.Sprite;
    alienManager: AlienManager;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    fireKey: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: "MainScene",
        });
    }

    // This is the preload function in phaser that loads the assets
    preload() {
        // Load images
        this.load.setBaseURL("/assets");
        this.load.image(ImageType.Starfield, "/images/starfield.png");
        this.load.image(ImageType.Bullet, "/images/bullet.png");
        this.load.image(ImageType.EnemyBullet, "/images/enemy-bullet.png");
        this.load.spritesheet(ImageType.Alien, "/images/invader.png", {
            frameWidth: 32,
            frameHeight: 32,
        });
        this.load.image(ImageType.Ship, "/images/player.png");
        this.load.spritesheet(ImageType.Explosion, "/images/explode.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
        // Load audio
        this.sound.volume = 0.25;
        this.load.audio(SoundType.Shoot, "/audio/boop.wav");
        this.load.audio(SoundType.Kaboom, "/audio/boom.wav");
        this.load.audio(SoundType.PlayerKaboom, "/audio/player_boom.wav");
        this.load.audio(SoundType.Song, "/audio/boop_song.wav");
    }

    // This function sets up the playing field for the game on start
    create() {
        this.state = GameState.Playing;
        this.starfield = this.add
            .tileSprite(0, 0, 800, 600, ImageType.Starfield)
            .setOrigin(0, 0);
        this.assetManager = new AssetManager(this);
        this.animationFactory = new AnimationFactory(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        // Setting space key to be the fire key
        this.fireKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.player = Ship.create(this);
        this.alienManager = new AlienManager(this);
        this.scoreManager = new ScoreManager(this);
        

        // Set space key top restart after win or game over
        this.fireKey.on("down", () => {
            switch (this.state) {
                case GameState.Win:
                case GameState.GameOver:
                    this.restart();
                    break;
            }
        })
        // Add background music on a loop
        var music = this.sound.add(SoundType.Song);
        music.setLoop(true);
        music.play();
    }



    // This function updates the game based on bullets
    update() {
        // Make the background move
        this.starfield.tilePositionY -= 0.5;

        // update to keep  the aliens firing at the hero
        this.shipKeyboardHandler();
        if (this.time.now > this.firingTimer) {
            this._enemyFires();
        }

        // Check for bullet collision w/ an alien
        this.physics.overlap(
            this.assetManager.bullets,
            this.alienManager.aliens,
            this.bulletHitAliens,
            null,
            this
        );
        // Check for an enemy bullet overlap w/ the player
        this.physics.overlap(
            this.assetManager.enemyBullets,
            this.player,
            this.enemyBulletHitPlayer,
            null,
            this
        );
    }

    // This function handles the movement of the hero ship
    private shipKeyboardHandler() {
        let playerBody = this.player.body as Phaser.Physics.Arcade.Body;
        playerBody.setVelocity(0, 0);
        if (this.cursors.left.isDown) {
            playerBody.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            playerBody.setVelocityX(200);
        }


        // check for if the space key is pressed. If so, fire a bullet
        if (this.fireKey.isDown) {
            this._fireBullet();
        }
    }

    // This functions handles when a bullet collides with an enemy
    private bulletHitAliens(bullet: Bullet, alien: Alien) {
        let explosion: Explosion = this.assetManager.explosions.get();
        bullet.kill();
        alien.kill(explosion);
        this.scoreManager.increaseScore();
        if (!this.alienManager.hasAliveAliens) {
            this.scoreManager.increaseScore(1000);
            this.scoreManager.setWinText();
            this.state = GameState.Win;
        }
    }

    // This function handles when an enemy bullet collides with the hero ship
    private enemyBulletHitPlayer(ship, enemyBullet: EnemyBullet) {
        let explosion: Explosion = this.assetManager.explosions.get();
        enemyBullet.kill();
        let live: Phaser.GameObjects.Sprite = this.scoreManager.lives.getFirstAlive();
        if (live) {
            live.setActive(false).setVisible(false);
        }

        // Explosion on collision and change game state if player is out of lives
        explosion.setPosition(this.player.x, this.player.y);
        explosion.play(AnimationType.Explosion);
        this.sound.play(SoundType.PlayerKaboom)
        if (this.scoreManager.noMoreLives) {
            this.scoreManager.resetScore();
            this.scoreManager.setGameOverText();
            this.assetManager.gameOver();
            this.state = GameState.GameOver;
            this.player.disableBody(true, true);
        }
    }

    // This function handles when an enemy fires a bullet
    private _enemyFires() {
        if (!this.player.active) {
            return;
        }
        let enemyBullet: EnemyBullet = this.assetManager.enemyBullets.get();
        let randomEnemy = this.alienManager.getRandomAliveEnemy();

        // Check to fire an enemy bullet every two seconds and aim it towards the player ship
        if (enemyBullet && randomEnemy) {
            enemyBullet.setPosition(randomEnemy.x, randomEnemy.y);
            this.physics.moveToObject(enemyBullet, this.player, 120);
            this.firingTimer = this.time.now + 2000;
        }
    }

    // This function handles when the player ship fires, limits to a rate of one bullet per 200ms
    private _fireBullet() {
        if (!this.player.active) {
            return;
        }
        // Checks to fire the a bullet every two seconds
        if (this.time.now > this.bulletTime) {
            let bullet: Bullet = this.assetManager.bullets.get();
            if (bullet) {
                bullet.shoot(this.player.x, this.player.y - 18);
                this.bulletTime = this.time.now + 200;
            }
        }
    }

    // This function handles resetting the game playing field
    restart() {
        this.state = GameState.Playing;
        this.player.enableBody(true, this.player.x, this.player.y, true, true);
        this.scoreManager.resetLives();
        this.scoreManager.hideText();
        this.alienManager.reset();
        this.assetManager.reset();
    }
}
