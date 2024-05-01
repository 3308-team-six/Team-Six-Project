
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var PhaserTemplate = (function () {
'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var phaser_min$1 = {exports: {}};

var phaser_min = phaser_min$1.exports;

(function (module, exports) {
} (phaser_min$1, phaser_min$1.exports));

var phaser_minExports = phaser_min$1.exports;
var Phaser$1 = /*@__PURE__*/getDefaultExportFromCjs(phaser_minExports);

// enum for the different assets in the game
// Image assets
var ImageType;
(function (ImageType) {
    ImageType["EnemyBullet"] = "enemyBullet";
    ImageType["Alien"] = "alien";
    ImageType["Bullet"] = "bullet";
    ImageType["Ship"] = "ship";
    ImageType["Repair"] = "repair";
    ImageType["Gas"] = "gas";
    ImageType["Explosion"] = "explosion";
    ImageType["Starfield"] = "starfield";
    ImageType["Stealth"] = "stealth";
    ImageType["Meteor"] = "meteor";
    ImageType["Haze"] = "haze";
})(ImageType || (ImageType = {}));
// Audio assets
var SoundType;
(function (SoundType) {
    SoundType["Kaboom"] = "kaboom";
    SoundType["PlayerKaboom"] = "playerKaboom";
    SoundType["Shoot"] = "shoot";
    SoundType["Song"] = "song";
    SoundType["Gas"] = "gas";
    SoundType["Repair"] = "repair";
    SoundType["Stealth"] = "stealth";
    SoundType["StealthEnd"] = "stealthEnd";
})(SoundType || (SoundType = {}));

// This class defines the enemies bullets and a function for impact
class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, ImageType.EnemyBullet);
    }
    kill() {
        this.destroy();
    }
}

// This class defines the heros bullets and a function for bullet collision and shooting
class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, ImageType.Bullet);
    }
    // Defines when the player shoots
    shoot(x, y) {
        this.scene.sound.play(SoundType.Shoot);
        this.setPosition(x, y);
        this.setVelocityY(-400);
    }
    kill() {
        this.destroy();
    }
}

// This class defines the kaboom class as the explosion asset
class Explosion extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, ImageType.Explosion);
    }
}

class Repair extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, ImageType.Repair);
    }
    move(x) {
        this.setPosition(x, 50);
        this.setVelocityY(Phaser.Math.Between(150, 200));
        this.setVelocityX(Phaser.Math.Between(-50, 50));
    }
    kill() {
        this.destroy();
    }
}

class Gas extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, ImageType.Gas);
    }
    kill() {
        this.destroy();
    }
}

class Stealth extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, ImageType.Stealth);
    }
    move(x) {
        this.setPosition(x, 50);
        this.setVelocityY(350);
        this.setVelocityX(Phaser.Math.Between(-100, 100));
    }
    kill() {
        this.destroy();
    }
}

// This class defines the meteors and a function for impact
class Meteor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, ImageType.Meteor);
    }
    setRandomVelocity() {
        const velocityX = Phaser.Math.Between(-100, 100);
        const velocityY = Phaser.Math.Between(100, 200);
        this.setVelocity(velocityX, velocityY);
    }
    kill() {
        this.destroy();
    }
}

// Class that handles creation of new assets when the game is in play (bullets and explosions) and when the game is over
class AssetManager {
    constructor(_scene) {
        Object.defineProperty(this, "_scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _scene
        });
        // assets controlled by this class
        Object.defineProperty(this, "bullets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enemyBullets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "explosions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "repair", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "gas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stealth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "meteor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bullets = this._createBullets();
        this.enemyBullets = this._createEnemyBullets();
        this.explosions = this._createExplosions();
        this.repair = this._createRepair();
        this.gas = this._createGas();
        this.stealth = this._createStealth();
        this.meteor = this._createMeteor();
    }
    // clears bullets when the game is ove
    gameOver() {
        this.enemyBullets.clear(true, true);
        this.bullets.clear(true, true);
        this.repair.clear(true, true);
        this.gas.clear(true, true);
        this.stealth.clear(true, true);
        this.meteor.clear(true, true);
    }
    // resets the assets when the game is restarted
    reset() {
        this._createEnemyBullets();
        this._createBullets();
        this._createRepair();
        this._createGas();
        this._createStealth();
        this._createMeteor();
    }
    _createEnemyBullets() {
        let enemyBullets = this._scene.physics.add.group({
            max: 0,
            classType: EnemyBullet,
            runChildUpdate: true
        });
        enemyBullets.setOrigin(0.5, 1);
        return enemyBullets;
    }
    _createBullets() {
        let bullets = this._scene.physics.add.group({
            max: 0,
            classType: Bullet,
            runChildUpdate: true
        });
        bullets.setOrigin(0.5, 1);
        return bullets;
    }
    _createExplosions() {
        let explosions = this._scene.physics.add.group({
            max: 0,
            classType: Explosion,
            runChildUpdate: true
        });
        return explosions;
    }
    _createRepair() {
        let repair = this._scene.physics.add.group({
            max: 0,
            classType: Repair,
            runChildUpdate: true
        });
        return repair;
    }
    _createGas() {
        let gas = this._scene.physics.add.group({
            max: 0,
            classType: Gas,
            runChildUpdate: true
        });
        return gas;
    }
    _createStealth() {
        let stealth = this._scene.physics.add.group({
            max: 0,
            classType: Stealth,
            runChildUpdate: true
        });
        return stealth;
    }
    _createMeteor() {
        let meteor = this._scene.physics.add.group({
            classType: Meteor,
            runChildUpdate: true
        });
        return meteor;
    }
}

// Factory that defines the animations of the game
var AnimationType;
(function (AnimationType) {
    AnimationType["Fly"] = "fly";
    AnimationType["Explosion"] = "explosion";
})(AnimationType || (AnimationType = {}));
class AnimationFactory {
    constructor(_scene) {
        Object.defineProperty(this, "_scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _scene
        });
        this._init_();
    }
    _init_() {
        // Generates the fly animation of the aliens from the Spritesheet frames
        this._scene.anims.create({
            key: AnimationType.Fly,
            frames: this._scene.anims.generateFrameNumbers(ImageType.Alien, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        });
        // Generates the explosion animation from the Spritesheet frames
        this._scene.anims.create({
            key: AnimationType.Explosion,
            frames: this._scene.anims.generateFrameNumbers(ImageType.Explosion, { start: 0, end: 15 }),
            frameRate: 24,
            repeat: 0,
            hideOnComplete: true
        });
    }
}

// Class the define the enemy and a function for when its hit with a bullet
class Alien extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, ImageType.Alien);
    }
    // function when alien is killed, play explosion, then remove the asset from the screen
    kill(explosion) {
        if (explosion) {
            explosion.setX(this.x);
            explosion.setY(this.y);
            explosion.play(AnimationType.Explosion);
            this.scene.sound.play(SoundType.Kaboom);
        }
        this.destroy();
    }
}

// @ts-nocheck
// Class that manages the aliens from building them, checking how many are still alive, animating them, and resting them
class AlienManager {
    get hasAliveAliens() {
        return !!this.aliens.children.size;
    }
    constructor(_scene) {
        Object.defineProperty(this, "_scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _scene
        });
        Object.defineProperty(this, "aliens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.aliens = this._scene.physics.add.group({
            maxSize: 40,
            classType: Alien,
            runChildUpdate: true
        });
        this.aliens.setOrigin(0, 0);
        this._sortAliens();
        this._animate();
    }
    // Grabs a random alive enemy to shoot a bullet when called
    getRandomAliveEnemy() {
        let random = Phaser.Math.RND.integerInRange(1, this.aliens.children.size);
        let aliens = this.aliens.children.getArray();
        return aliens[random];
    }
    // Call on game reset
    reset() {
        this._sortAliens();
        this._animate();
    }
    _sortAliens() {
        // Builds 40 enemies in a 4x10 grid
        let ORIGIN_X = 100;
        let ORIGIN_Y = 100;
        this.aliens.clear(true, true);
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 10; x++) {
                let alien = this.aliens.create(ORIGIN_X + x * 48, ORIGIN_Y + y * 50);
                alien.setOrigin(0.5, 0.5);
                alien.play(AnimationType.Fly);
                alien.setImmovable(false);
            }
        }
    }
    // animation of the aliens flying
    _animate() {
        this.aliens.children.iterate((c) => {
            this._scene.tweens.add({
                targets: c,
                ease: "Linear",
                duration: 2000,
                x: "+=200",
                paused: false,
                delay: 0,
                yoyo: true,
                repeat: -1
            });
        });
    }
}

// This class defines the hero ship
class Ship {
    static create(scene) {
        let ship = scene.physics.add.sprite(400, 500, ImageType.Ship);
        ship.setCollideWorldBounds(true);
        return ship;
    }
}

// @ts-nocheck
// This class manages the scoreboard from display to current amount of lives, and the points awarded per alien slayed
class ScoreManager {
    // This will be the function that inserts the score to our sqlite db (Connects successfully to the db)
    // This is trying to process database on client side
    // private addScoreToDB(playerID, playerName, score, date){
    //   const sqlite = require("sqlite3") .verbose();
    //   // Connect to db
    //   const db = new sqlite.Database("../../../../code/teamSix.db", sqlite.OPEN_READWRITE, (err)=>{
    //     if (err)console.error(err);
    //     else console.log("Successfully connected to the database")
    //   });
    //   try{
    //     const sql_statement = 'INSERT INTO Scores (playerID, playerName, score, date) VALUES (?,?,?,?)'
    //     db.run(sql_statement, [playerID, playerName, score, date], (err) =>{
    //     if(err) console.error(err)
    //   });
    //   }catch (error){
    //   console.log(error);
    // }}
    sendScoreToServer(playerID, playerName) {
        //console.log("Sending score:", this.score);
        const data = {
            playerID: playerID,
            playerName: playerName,
            score: this.score,
        };
        console.log("Sending data:", data);
        fetch('/add_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => console.log('Score submitted successfully:', data))
            .catch(error => console.error('Error submitting score:', error));
    }
    // checks for a game over
    get noMoreLives() {
        return this.lives.countActive(true) === 0;
    }
    constructor(_scene) {
        Object.defineProperty(this, "_scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _scene
        });
        Object.defineProperty(this, "scoreText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "line1Text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "line2Text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lives", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "highScore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "score", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this._init();
        this.print();
    }
    _init() {
        const { width: SIZE_X, height: SIZE_Y } = this._scene.game.canvas;
        const textConfig = {
            fontFamily: `'Arial', sans-serif`,
            fill: "#ffffff",
        };
        const normalTextConfig = {
            ...textConfig,
            fontSize: "16px",
        };
        const bigTextConfig = {
            ...textConfig,
            fontSize: "36px",
        };
        this._scene.add.text(16, 16, `SCORE`, normalTextConfig);
        this.scoreText = this._scene.add.text(22, 32, "", normalTextConfig);
        this.line1Text = this._scene.add
            .text(SIZE_X / 2, 320, "", bigTextConfig)
            .setOrigin(0.5);
        this.line2Text = this._scene.add
            .text(SIZE_X / 2, 400, "", bigTextConfig)
            .setOrigin(0.5);
        this.setLivesText(SIZE_X, normalTextConfig);
    }
    // Gives three lives
    setLivesText(SIZE_X, textConfig) {
        this._scene.add.text(SIZE_X - 100, 16, `LIVES`, textConfig);
        this.lives = this._scene.physics.add.group({
            maxSize: 3,
            runChildUpdate: true,
        });
        this.resetLives();
    }
    resetLives() {
        let SIZE_X = this._scene.game.canvas.width;
        this.lives.clear(true, true);
        for (let i = 0; i < 3; i++) {
            let ship = this.lives.create(SIZE_X - 100 + 30 * i, 60, ImageType.Ship);
            ship.setOrigin(0.5, 0.5);
            ship.setAngle(90);
            ship.setAlpha(0.6);
        }
    }
    // Text display for game over and winning
    setGameOverText() {
        this._setBigText("GAME OVER", "PRESS SPACE FOR NEW GAME");
    }
    // Clears text on screen
    hideText() {
        this._setBigText("", "");
    }
    _setBigText(line1, line2) {
        this.line1Text.setText(line1);
        this.line2Text.setText(line2);
    }
    setHighScore() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        this.score = 0;
        this.print();
    }
    print() {
        this.scoreText.setText(`${this.padding(this.score)}`);
    }
    // Awards 10 points per alien killed
    increaseScore(step = 10) {
        this.score += step;
        // console.log(`Score increased: ${this.score}`);
        this.print();
    }
    // Reset the score to zero (Used for Game Over)
    resetScore() {
        this.score = 0;
        this.print();
    }
    padding(num) {
        return `${num}`.padStart(4, "0");
    }
}

// enum of possible game states while playing
var GameState;
(function (GameState) {
    GameState["Playing"] = "playing";
    GameState["GameOver"] = "gameOver";
})(GameState || (GameState = {}));

// @ts-nocheck
class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene",
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "assetManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "animationFactory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "scoreManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bulletTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "firingTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "repairTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.getRandomInt(30000, 60000)
        }); // random timer for initial spawn
        Object.defineProperty(this, "gasTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.getRandomInt(45000, 60000)
        }); // random timer for initial spawn
        Object.defineProperty(this, "stealthTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.getRandomInt(60000, 90000)
        }); // random timer for initial spawn
        Object.defineProperty(this, "stealthDuration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15000
        }); // stealth pack duration
        Object.defineProperty(this, "isStealth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        }); // tells if stealth is active
        Object.defineProperty(this, "stealthDurationTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        }); // duration timer of a stealth pack
        Object.defineProperty(this, "meteorTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "isVisionImpaired", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        }); // tells if player vision is impaired by a gas cloud
        Object.defineProperty(this, "visionImpairmentDuration", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15000
        }); // duration of the impairment
        Object.defineProperty(this, "visionImpairmentTimer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        }); // timer to check if the impairment is over on update
        Object.defineProperty(this, "starfield", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "haze", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "player", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "alienManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cursors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fireKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    // Obtain playerID and playName
    init() {
        this.playerID = window.playerData?.playerID;
        this.playerName = window.playerData?.playerName;
        console.log(`Initialized with playerID: ${this.playerID} and playerName: ${this.playerName}`);
    }
    // This is the preload function in phaser that loads the assets
    preload() {
        // Load images
        this.load.setBaseURL("static/assets");
        this.load.image(ImageType.Starfield, "images/starfield.png");
        this.load.image(ImageType.Haze, "images/hazyVision.png");
        this.load.image(ImageType.Bullet, "images/bullet.png");
        this.load.image(ImageType.EnemyBullet, "images/enemy-bullet.png");
        this.load.image(ImageType.Repair, "images/repair.png");
        this.load.image(ImageType.Gas, "images/gas.png");
        this.load.image(ImageType.Stealth, "images/stealth.png");
        this.load.image(ImageType.Meteor, 'images/meteor.png');
        this.load.spritesheet(ImageType.Alien, "images/invader.png", {
            frameWidth: 32,
            frameHeight: 36,
        });
        this.load.image(ImageType.Ship, "images/player.png");
        this.load.spritesheet(ImageType.Explosion, "images/explode.png", {
            frameWidth: 128,
            frameHeight: 128,
        });
        // Load audio
        this.sound.volume = 0.25;
        this.load.audio(SoundType.Shoot, "audio/boop.wav");
        this.load.audio(SoundType.Kaboom, "audio/boom.wav");
        this.load.audio(SoundType.PlayerKaboom, "audio/player_boom.wav");
        this.load.audio(SoundType.Song, "audio/boop_song.wav");
        this.load.audio(SoundType.Gas, "audio/gas_powerdown.wav");
        this.load.audio(SoundType.Repair, "audio/repair_powerup.wav");
        this.load.audio(SoundType.Stealth, "audio/stealth_powerup.wav");
        this.load.audio(SoundType.StealthEnd, "audio/stealth_powerdown.wav");
    }
    // This function sets up the playing field for the game on start
    create() {
        // Check playerID and playerName
        console.log('Player ID:', this.playerID);
        console.log('Player Name:', this.playerName);
        this.state = GameState.Playing;
        this.starfield = this.add
            .tileSprite(0, 0, 800, 600, ImageType.Starfield)
            .setOrigin(0, 0);
        this.assetManager = new AssetManager(this);
        this.animationFactory = new AnimationFactory(this);
        this.cursors = this.input.keyboard.createCursorKeys();
        // Setting space key to be the fire key
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player = Ship.create(this);
        this.alienManager = new AlienManager(this);
        this.haze = this.add
            .image(400, 300, ImageType.Haze);
        this.haze.visible = false;
        this.scoreManager = new ScoreManager(this);
        // Set space key to restart after game over
        this.fireKey.on("down", () => {
            switch (this.state) {
                case GameState.GameOver:
                    this.restart();
                    break;
            }
        });
        // Add background music on a loop
        var music = this.sound.add(SoundType.Song);
        music.setLoop(true);
        music.play();
    }
    // This function checks for updates periodically during game play
    update() {
        // Make the background move
        this.starfield.tilePositionY -= 0.5;
        this.shipKeyboardHandler();
        // update to keep  the aliens firing at the hero
        if (this.time.now > this.firingTimer && !(this.isStealth)) { // If stealth mod is active, enemies do not shoot
            this._enemyFires();
            if (this.isVisionImpaired) {
                this.assetManager.enemyBullets.setAlpha(0.1); // if vision is impaired hide bullets
            }
        }
        // update to restore vision
        if (this.time.now > this.visionImpairmentTimer && this.isVisionImpaired) {
            this.haze.visible = false;
            this.assetManager.enemyBullets.setAlpha(1);
            this.alienManager.aliens.setAlpha(1);
            this.assetManager.meteor.setAlpha(1);
            this.isVisionImpaired = false;
        }
        // Update for the repair pack being spawned
        if (this.time.now > this.repairTimer) {
            this._repairSpawn();
            if (this.isVisionImpaired) {
                this.assetManager.repair.setAlpha(0.1); // if vision is impaired hide repair pack
            }
        }
        // Update for the gas being spawned
        if (this.time.now > this.gasTimer) {
            this._gasSpawn();
        }
        // Update for the meteor being spawned
        if (this.time.now > this.meteorTimer) {
            this._meteorSpawn();
            if (this.isVisionImpaired) {
                this.assetManager.meteor.setAlpha(0.1); // if vision is impaired hide meteor
            }
        }
        // Update for the stealth pack being spawned
        if (this.time.now > this.stealthTimer) {
            this._stealthSpawn();
            if (this.isVisionImpaired) {
                this.assetManager.stealth.setAlpha(0.1); // if vision is impaired hide stealth pack
            }
        }
        // Update for ending the stealth power-up
        if (this.isStealth && this.time.now > this.stealthDurationTimer) {
            this.player.setAlpha(1);
            this.sound.play(SoundType.StealthEnd);
            this.isStealth = false;
        }
        // Check for bullet collision w/ an alien
        this.physics.overlap(this.assetManager.bullets, this.alienManager.aliens, this.bulletHitAliens, null, this);
        // Check for an enemy bullet overlap w/ the player
        this.physics.overlap(this.assetManager.enemyBullets, this.player, this.enemyBulletHitPlayer, null, this);
        // Check for a repair pack overlap with hero ship
        this.physics.overlap(this.assetManager.repair, this.player, this.playerGetsRepair, null, this);
        // Check for a repair pack overlap with hero ship
        this.physics.overlap(this.assetManager.gas, this.player, this.gasHitPlayer, null, this);
        // Check for stealth pack overlap w/ the player ship
        this.physics.overlap(this.assetManager.stealth, this.player, this.playerGetsStealth, null, this);
        //Check for meteor overlap with player ship
        this.physics.overlap(this.assetManager.meteor, this.player, this.meteorHitPlayer, null, this);
    }
    // This function handles the movement of the hero ship
    shipKeyboardHandler() {
        let playerBody = this.player.body;
        playerBody.setVelocity(0, 0);
        if (this.cursors.left.isDown) {
            playerBody.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown) {
            playerBody.setVelocityX(200);
        }
        // check for if the space key is pressed. If so, fire a bullet
        if (this.fireKey.isDown) {
            this._fireBullet();
        }
    }
    // This functions handles when a bullet collides with an enemy
    bulletHitAliens(bullet, alien) {
        let explosion = this.assetManager.explosions.get();
        bullet.kill();
        alien.kill(explosion);
        this.scoreManager.increaseScore();
        if (!this.alienManager.hasAliveAliens) {
            this.scoreManager.increaseScore(1000);
            this.alienManager.reset();
            this.assetManager.reset();
            if (this.isVisionImpaired) {
                this.alienManager.aliens.setAlpha(0.1); // make aliens spawn invisible when vision is impaired
            }
        }
    }
    // If player gets a repair pack, reset the lives count
    playerGetsRepair(ship, repair) {
        repair.kill();
        this.sound.play(SoundType.Repair);
        this.scoreManager.resetLives();
    }
    // If player gets a stealth mod, make them transparent and let the game know to make enemies not shoot
    playerGetsStealth(ship, stealth) {
        stealth.kill();
        this.sound.play(SoundType.Stealth);
        ship.setAlpha(0.5);
        this.isStealth = true;
        this.stealthDurationTimer = this.time.now + this.stealthDuration;
    }
    // If player hits a gas cloud
    gasHitPlayer(ship, gas) {
        gas.kill();
        this.isVisionImpaired = true;
        this.haze.visible = true;
        this.assetManager.enemyBullets.setAlpha(0.1);
        this.alienManager.aliens.setAlpha(0.1);
        this.assetManager.meteor.setAlpha(0.1);
        this.visionImpairmentTimer = this.time.now + this.visionImpairmentDuration;
    }
    //If player hits a meteor
    meteorHitPlayer(ship, meteor) {
        meteor.kill(); // Destroy the meteor
        let explosion = this.assetManager.explosions.get();
        explosion.setPosition(ship.x, ship.y);
        explosion.play(AnimationType.Explosion);
        this.sound.play(SoundType.Kaboom); // Play explosion sound
        // Apply damage to the ship, potentially decrementing the life count
        let live = this.scoreManager.lives.getFirstAlive();
        if (live) {
            live.setActive(false).setVisible(false); // Decrease life
            this.scoreManager.sendScoreToServer(this.playerID, this.playerName); // Send score
        }
    }
    //This function manages meteor spawning
    _meteorSpawn() {
        if (!this.player.active) {
            return;
        }
        let meteor = this.assetManager.meteor.get();
        if (meteor) {
            let x = this.getRandomInt(50, 751);
            meteor.setPosition(x, 0).setActive(true).setVisible(true);
            this.physics.world.enable(meteor);
            meteor.setRandomVelocity();
            let coolDownTime = this.getRandomInt(10000, 20000);
            this.meteorTimer = this.time.now + coolDownTime;
        }
        else {
            // Handle the case where the meteor couldn't be retrieved
            console.error('Could not spawn meteor. No instance available.');
        }
    }
    // This function handles when an enemy bullet collides with the hero ship
    enemyBulletHitPlayer(ship, enemyBullet) {
        let explosion = this.assetManager.explosions.get();
        enemyBullet.kill();
        let live = this.scoreManager.lives.getFirstAlive();
        if (live) {
            live.setActive(false).setVisible(false);
        }
        // Explosion on collision and change game state if player is out of lives
        explosion.setPosition(this.player.x, this.player.y);
        explosion.play(AnimationType.Explosion);
        this.sound.play(SoundType.PlayerKaboom);
        if (this.scoreManager.noMoreLives) {
            // Add score when the game is over to DB - SA
            this.scoreManager.sendScoreToServer(this.playerID, this.playerName); // Send score
            this.scoreManager.resetScore();
            this.scoreManager.setGameOverText();
            this.assetManager.gameOver();
            this.state = GameState.GameOver;
            this.player.disableBody(true, true);
        }
    }
    // Function to handle the repair pack spawn
    _repairSpawn() {
        if (!this.player.active) {
            return;
        }
        let repair = this.assetManager.repair.get();
        if (repair) {
            let x = this.getRandomInt(50, 751);
            repair.move(x);
            let coolDownTime = this.getRandomInt(30000, 60000);
            this.repairTimer = this.time.now + coolDownTime;
        }
    }
    // function to spawn a gas cloud
    _gasSpawn() {
        if (!this.player.active) {
            return;
        }
        let gas = this.assetManager.gas.get();
        if (gas) {
            let x = this.getRandomInt(50, 751);
            gas.setPosition(x, 50);
            this.physics.moveToObject(gas, this.player, 250);
            let coolDownTime = this.getRandomInt(60000, 90000); // random cool down time (1 - 1.5 min)
            this.gasTimer = this.time.now + coolDownTime;
        }
    }
    // function to spawn a stealth mod
    _stealthSpawn() {
        if (!this.player.active) {
            return;
        }
        let stealth = this.assetManager.stealth.get();
        if (stealth) {
            let x = this.getRandomInt(50, 751);
            stealth.move(x);
            let coolDownTime = this.getRandomInt(60000, 90000); // random cool down time (1 - 1.5 min)
            this.stealthTimer = this.time.now + coolDownTime + this.stealthDuration;
        }
    }
    // This function handles when an enemy fires a bullet
    _enemyFires() {
        if (!this.player.active) {
            return;
        }
        let enemyBullet = this.assetManager.enemyBullets.get();
        let randomEnemy = this.alienManager.getRandomAliveEnemy();
        // Check to fire an enemy bullet every two seconds and aim it towards the player ship
        if (enemyBullet && randomEnemy) {
            enemyBullet.setPosition(randomEnemy.x, randomEnemy.y);
            this.physics.moveToObject(enemyBullet, this.player, 120);
            this.firingTimer = this.time.now + 2000;
        }
    }
    // This function handles when the player ship fires, limits to a rate of one bullet per 200ms
    _fireBullet() {
        if (!this.player.active) {
            return;
        }
        // Checks to fire the a bullet every two seconds
        if (this.time.now > this.bulletTime) {
            let bullet = this.assetManager.bullets.get();
            if (bullet) {
                bullet.shoot(this.player.x, this.player.y - 18);
                this.bulletTime = this.time.now + 200;
            }
        }
    }
    // Function to get a random int, used for making a random time for new spawns
    getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
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

// @ts-nocheck
const config = {
    title: "Space Invaders",
    type: Phaser$1.AUTO,
    width: 800,
    height: 600,
    scene: MainScene,
    physics: {
        default: "arcade"
    },
    parent: "SpaceInvaders"
};
var main = new phaser_minExports.Game(config);

return main;

})();
//# sourceMappingURL=bundle.js.map