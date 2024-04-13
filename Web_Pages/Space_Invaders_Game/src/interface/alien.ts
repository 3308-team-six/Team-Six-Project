import { AssetType, SoundType } from "./assets";
import { AnimationType } from "./factory/animation-factory";
import { Kaboom } from "./kaboom";

// Class the define the enemy and a function for when its hit with a bullet
export class Alien extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, AssetType.Alien)
  }

  // function when alien is killed, play explosion, then remove the asset from the screen
  kill(explosion: Kaboom) {
    if (explosion) {
      explosion.setX(this.x);
      explosion.setY(this.y);
      explosion.play(AnimationType.Kaboom)
      this.scene.sound.play(SoundType.Kaboom)
    }
    this.destroy();
  }
}