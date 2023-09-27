//import CenaDeCarregamento from "./cenaDeCarregamento";
//import cenaDeMenu from "./cenaDeMenu";
//import CenaDeJogo from "./cenaDeJogo";
let score = 0;
let position = 0;
let carController = 0;
let gameOver = false;
let Car;
let Car2;
let Car3;
let line;
let player;
let soundStepLeft;
let soundStepRight;

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  parent: "Angola_Run_Main",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  // todos os recursos que devem ser pré-carregados

  //CARREGANDO AS IMAGENS
  this.load.image("star", "../assets/star.png");
  this.load.image("sky", "../assets/sky1.png");
  this.load.image("clouds", "../assets/nuvens_2.png");
  this.load.image("platform", "../assets/platform.png");
  this.load.image("platformTop", "../assets/platformLeftTop.png");
  this.load.image("catana", "../assets/catana.png");
  this.load.image("flor_esta", "../assets/floresta.png");
  this.load.image("hiace", "../assets/hiace.png");
  this.load.image("vale", "../assets/vale-removebg.png");
  this.load.image("sky2", "../assets/sky2.png");
  this.load.image("catana", "../assets/catana.png");
  this.load.image("ground", "../assets/ground.png");
  this.load.image("bandeira", "../assets/Bandeira.png");
  this.load.image("insignia", "../assets/insignia-removebg-preview.png");
  this.load.image("pensador", "../assets/pensador-removebg-preview.png");
  this.load.image("palanca", "../assets/palanca.png");
  this.load.image("mirabi", "../assets/mirabi-removebg-preview.png");

  //CARREGANDO OS ARQUIVOS DE AUDIO
  this.load.audio("getItem", "../sounds/getitem.ogg");
  this.load.audio("collidWithCar", "../sounds/loseitem.ogg");
  this.load.audio("gameSound", "../sounds/music.ogg");
  this.load.audio("stepL", "../sounds/stepsLeft.mp3");
  this.load.audio("stepR", "../sounds/stepsRight.mp3");

  //CARREGANDO O PLAYER
  this.load.spritesheet("dude", "../assets/dude4.png", {
    frameWidth: 37.3,
    frameHeight: 48,
  });
}

function create() {
  const widthGameScreen = this.sys.canvas.width;
  const heightGameScreen = this.sys.canvas.height;
  const soundGetItem = this.sound.add("getItem");
  const soundCollidWithCar = this.sound.add("collidWithCar");
  soundStepLeft = this.sound.add("stepL");
  soundStepLeft.volume = 0.4;
  soundStepRight = this.sound.add("stepR");
  soundStepRight.volume = 0.4;
  const music = this.sound.add("gameSound");
  music.loop = true;
  music.play();

  this.add.image(widthGameScreen, heightGameScreen / 2, "sky2");
  this.add.image(widthGameScreen, heightGameScreen / 2, "vale");
  this.add.image(widthGameScreen, heightGameScreen / 2, "clouds");
  this.add.image(widthGameScreen, heightGameScreen / 2, "flor_esta");

  //CRIANDO A ESTRADA

  palancaNegraGigante = this.physics.add.sprite(3600, 0, "palanca");
  palancaNegraGigante.setCollideWorldBounds(true);
  mirabilis = this.physics.add.sprite(1000, 0, "mirabi");
  mirabilis.setCollideWorldBounds(true);
  platforms = this.physics.add.staticGroup();
  platforms
    .create(0, heightGameScreen, "platform")
    .setScale(18, 1)
    .refreshBody();

  // FISICA DO CARRO
  Car = this.physics.add.sprite(3600, heightGameScreen - 64, "hiace");
  Car2 = this.physics.add.sprite(3000, heightGameScreen - 64, "hiace");
  Car3 = this.physics.add.sprite(2000, heightGameScreen - 64, "hiace");

  //jhgfgh
  line = this.physics.add
    .sprite(0, 0, "platformTop")
    .setScale(0.3, 10)
    .refreshBody();
  line.setCollideWorldBounds(true);

  //CRIANDO O PLAYER
  player = this.physics.add.sprite(100, 758, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.cameras.main.setBounds(0, 0, 3600, 800);
  this.physics.world.setBounds(0, 0, 3600, 800);
  this.cameras.main.startFollow(player);

  //ANIMANDO O PLAAYERSS
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 9 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 13, end: 21 }),
    frameRate: 10,
    repeat: -1,
  });

  //CRIANDO AS ESTRELAS
  stars = this.physics.add.group({
    key: "star",
    repeat: 5,
    setXY: { x: 500, y: 400, stepX: 150 },
  });
  //CRIANDO O EFEITO BOUNCE DAS ESTRELAS
  stars.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
  });

  //CRIANDO AS CATANAS
  catanas = this.physics.add.group({
    key: "catana",
    repeat: 5,
    setXY: { x: 700, y: 400, stepX: 300 },
  });
  //CRIANDO O EFEITO BOUNCE DAS CATANAS
  catanas.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
  });

  //CRIANDO AS BANDEIRAS
  bandeiras = this.physics.add.group({
    key: "bandeira",
    repeat: 1,
    setXY: { x: 2000, y: 400, stepX: 200 },
  });
  //CRIANDO O EFEITO BOUNCE DAS BANDEIRAS
  bandeiras.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.9));
  });

  //CRIANDO AS INSIGNIAS
  insignias = this.physics.add.group({
    key: "insignia",
    repeat: 0,
    setXY: { x: 1500, y: 400, stepX: 200 },
  });
  //CRIANDO O EFEITO BOUNCE DAS INSIGNIAS
  insignias.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
  });

  //CRIANDO OS PENSADORES
  pensadores = this.physics.add.group({
    key: "pensador",
    repeat: 1,
    setXY: { x: 3000, y: 400, stepX: 200 },
  });
  pensadores.children.iterate((child) => {
    child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.9));
  });

  this.physics.add.collider(Car, platforms);
  this.physics.add.collider(Car2, platforms);
  this.physics.add.collider(Car3, platforms);
  this.physics.add.collider(line, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(mirabilis, platforms);
  this.physics.add.collider(catanas, platforms);
  this.physics.add.collider(pensadores, platforms);
  this.physics.add.collider(insignias, platforms);
  this.physics.add.collider(bandeiras, platforms);
  this.physics.add.collider(palancaNegraGigante, platforms);
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, stars, collectItems, null, this);
  this.physics.add.collider(player, mirabilis, playerCollidCar, null, this);
  this.physics.add.collider(
    player,
    palancaNegraGigante,
    collidGiantBlackSable,
    null,
    this
  );
  this.physics.add.collider(player, pensadores, collectSimbols, null, this);
  this.physics.add.collider(
    player,
    insignias,
    superPlayerBecauseCollideOnInsignia,
    null,
    this
  );
  this.physics.add.collider(player, bandeiras, collectSimbols, null, this);
  this.physics.add.collider(player, catanas, collectItems, null, this);
  this.physics.add.collider(player, Car, playerCollidCar, null, this);
  this.physics.add.collider(player, Car2, playerCollidCar, null, this);
  this.physics.add.collider(player, Car3, playerCollidCar, null, this);
  this.physics.add.collider(Car, line, reStartCartPosition, null, this);
  this.physics.add.collider(Car2, line, reStartCartPosition, null, this);
  this.physics.add.collider(Car3, line, reStartCartPosition, null, this);

  //IMPLEMENTANDO A PONTUAÇÃO

  function collectItems(player, item) {
    soundGetItem.play();
    item.disableBody(true, true);
    score += 5;
    document.getElementById("score").innerHTML = "Pontuação: " + score;
  }

  function collectSimbols(player, item) {
    soundGetItem.play();
    item.disableBody(true, true);
    score += 10;
    document.getElementById("score").innerHTML = "Pontuação: " + score;
  }

  function superPlayerBecauseCollideOnInsignia(playeer, insignia) {
    insignia.disableBody(true, true);
    position = playeer.x;
    playeer.disableBody(true, true);
    player = this.physics.add.sprite(position, 758, "dude");
    console.log(position);
    this.cameras.main.startFollow(player);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, stars, collectItems, null, this);
    this.physics.add.collider(
      player,
      palancaNegraGigante,
      collidGiantBlackSable,
      null,
      this
    );
    this.physics.add.collider(player, pensadores, collectSimbols, null, this);
    this.physics.add.collider(
      player,
      insignias,
      superPlayerBecauseCollideOnInsignia,
      null,
      this
    );
    this.physics.add.collider(player, bandeiras, collectSimbols, null, this);
    this.physics.add.collider(player, catanas, collectItems, null, this);
  }

  function collidGiantBlackSable(player, thinker) {
    soundGetItem.play();
    this.physics.pause();
    document.getElementById("winner").style.display = "block";
  }

  function reStartCartPosition(car, line) {
    carController++;
    car.disableBody(true, true);
    Car = this.physics.add.sprite(3600, heightGameScreen - 64, "hiace");
    this.physics.add.collider(Car, platforms);
    this.physics.add.collider(line, platforms);
    this.physics.add.collider(Car, line, reStartCartPosition, null, this);
    if (carController == 3) {
      carController = 0;
      position = 0;
    }
    if (position == 0) {
      this.physics.add.collider(player, Car, playerCollidCar, null, this);
    }
  }

  function playerCollidCar(player, car) {
    soundCollidWithCar.play();
    this.physics.pause();
    player.anims.play("turn");
    car.setTint(0xff0000);
    player.setTint(0xff0000);
    gameOver = true;
    music.pause();
  }
}

function update() {
  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    player.setVelocityX(-500);
    player.anims.play("left", true);
    if (!soundStepLeft.isPlaying) {
      soundStepLeft.play();
    }
  } else if (cursors.right.isDown) {
    player.setVelocityX(560);
    player.anims.play("right", true);
    if (!soundStepRight.isPlaying) {
      soundStepRight.play();
    }
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-250);
  }
  if (true) {
    if (!soundStepLeft.isPlaying) {
      soundStepLeft.play();
    }
    Car.setVelocityX(-400);
    Car2.setVelocityX(-400);
    Car3.setVelocityX(-400);
  }
}
