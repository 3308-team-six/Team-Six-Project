// @ts-nocheck
import Phaser from 'phaser'
import { MainScene } from './scenes/game';


import { Game } from "phaser";


const config: Phaser.Types.Core.GameConfig = {
    title: "Space Invaders",
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: MainScene,
      physics: {
        default: "arcade"
    },
    parent: "SpaceInvaders"
  };
  

export default new Game(config);


