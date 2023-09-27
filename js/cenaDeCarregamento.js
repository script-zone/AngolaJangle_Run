export default class CenaDeCarregamento extends Phaser.Scene {
  constructor() {
    super({
      key: "CenaDeCarregamento",
    });
  }

  preload() {
    this.load.on("complete", () => {
      this.scene.start("CenaDeJogo");
    });

    // todos os recursos que devem ser pré-carregados
    this.load.image("floresta", "../assets/Imagens_1/forest.jpg");
    this.load.image("chao", "../assets/Imagens_1/chao.png");
    this.load.image("sky", "../assets/Imagens_2/sky.png");
    this.load.image("platform", "../assets//Imagens_2/platform.png");
  }

  create() {}

  update() {}
}
