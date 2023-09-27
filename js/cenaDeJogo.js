//import Jogador from "./jogador.js";

export default class CenaDeJogo extends Phaser.Scene {
  constructor() {
    super({
      key: "CenaDeJogo",
    });
  }

  preload() {}

  create() {
    this.add.image(0, 0, "floresta");
  }

  update() {}
}
