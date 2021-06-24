/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import "core-js/stable";
import "regenerator-runtime/runtime";

import "index.sass";
import { html, render } from "lit-html";
import config from "config.yaml";
import level1 from "./images/level1.png";
import level2 from "./images/level2.png";
import camera from "./images/camera.png";
import camera2 from "./images/camera2.png";

window.PIXI = require("phaser-ce/build/custom/pixi");
window.p2 = require("phaser-ce/build/custom/p2");
window.Phaser = require("phaser-ce/build/custom/phaser-split");

const template = () =>
  html`
    <section>
      <h1>Camera</h1>
      <section>
        <h3>This is what the user sees when the app is running</h3>
        <p>Use the arrow keys to move the camera around:</p>
        <div id="gameA"></div>
        <p>
          This is a representation of the camera within the world while the app
          is running.
        </p>
        <p>Note: that the user will never actually see this!</p>
        <div id="gameB"></div>
      </section>
      <section>
        <h3>Limitations</h3>
        <p>Some limitations were found along the way</p>
        <ol>
          <li>The camera <strong>cannot be rotated.</strong></li>
          <li>The camera <strong>cannot be larger than the world.</strong></li>
          <li>
            Changing the size of the camera effectively causes the app to 'zoom'
            in or out. (this has no effect on the actual size of the world)
          </li>
          <li>
            Changing the aspect ratio of the camera will change the aspect ratio
            of the app. (this has no effect on the actual size of the world)
          </li>
        </ol>
        <p>
          We may want to consider whether the user can define a different camera
          aspect/ratio for each of their scenes, or whether they need to pick
          one that will be shared across all scenes.
        </p>
      </section>
      <section>
        <h3>This is what the user could see when the app is in edit mode:</h3>
        <div id="gameC"></div>
        <p>
          Note that the app is not running in this scenario. The actual camera
          is showing the entire stage, but we are showing the user
          <strong>a visual representation</strong> of where the camera
          <strong>would be</strong> when they press run
        </p>
      </section>
    </section>
    <section>
      <h1>Scenes</h1>
      <div id="gameD"></div>
      <p>
        <button
          @click="${() => {
            if (gameD.state.current === "level 1") {
              gameD.state.start("level 2");
            } else {
              gameD.state.start("level 1");
            }
          }}"
        >
          Next scene
        </button>
      </p>
      <p>
        Notice how switching scene resets the scene. (if you move the camera and
        switch scenes, when going back to the original scene the camera will
        have reset)
      </p>
      <p>
        If the user wants persistent elements while switching scenes, they will
        have to do this with global variables and an onSceneStart event
      </p>
      <p>
        Notice how different scenes can have different sizes. Note that as far
        as coding is concerned, the game will always be scaled up/down to
        maximize available space
      </p>
    </section>
  `;
render(template(config), document.body);

const SPEED = 4;
window.gameA = new Phaser.Game(
  200,
  200,
  Phaser.AUTO,
  document.getElementById("gameA"),
  {
    preload: function () {
      const game = this.game;
      game.load.image("bg", level1);
    },
    create: function () {
      const game = this.game;
      const bg = game.add.sprite(0, 0, "bg");
      game.world.setBounds(0, 0, 1200, 240);
      game.cursors = game.input.keyboard.createCursorKeys();
      game.camera.y = 40;
    },
    update: function () {
      const game = this.game;
      const speed = SPEED;
      if (game.cursors.left.isDown) {
        game.camera.x -= speed;
      }
      if (game.cursors.right.isDown) {
        game.camera.x += speed;
      }
      if (game.cursors.up.isDown) {
        game.camera.y -= speed;
      }
      if (game.cursors.down.isDown) {
        game.camera.y += speed;
      }
    },
  },
);
window.gameB = new Phaser.Game(
  1200,
  240,
  Phaser.AUTO,
  document.getElementById("gameB"),
  {
    preload: function () {
      const game = this.game;
      game.load.image("bg", level1);
      game.load.image("camera", camera);
    },
    create: function () {
      const game = this.game;
      const bg = game.add.sprite(0, 0, "bg");
      game.playerCamera = game.add.sprite(0, 0, "camera");
    },
    update: function () {
      const game = this.game;

      game.playerCamera.x = gameA.camera.x - 1200;
      game.playerCamera.y = gameA.camera.y - 240;
    },
  },
);
window.gameC = new Phaser.Game(
  1200,
  240,
  Phaser.AUTO,
  document.getElementById("gameC"),
  {
    preload: function () {
      const game = this.game;
      game.load.image("bg", level1);
      game.load.image("camera", camera2);
    },
    create: function () {
      const game = this.game;
      const bg = game.add.sprite(0, 0, "bg");
      game.playerCamera = game.add.sprite(0, 0, "camera");
    },
    update: function () {},
  },
);

window.gameD = new Phaser.Game(
  200,
  200,
  Phaser.AUTO,
  document.getElementById("gameD"),
);
gameD.state.add("level 1", function SceneLevel1() {
  this.preload = function () {
    const game = this.game;
    game.load.image("bg", level1);
  };
  this.create = function () {
    const game = this.game;
    game.scale.setGameSize(200, 200);
    const bg = game.add.sprite(0, 0, "bg");
    game.world.setBounds(0, 0, 1200, 240);

    game.cursors = game.input.keyboard.createCursorKeys();
    game.camera.y = 40;
  };
  this.update = function () {
    const game = this.game;
    const speed = SPEED;
    if (game.cursors.left.isDown) {
      game.camera.x -= speed;
    }
    if (game.cursors.right.isDown) {
      game.camera.x += speed;
    }
    if (game.cursors.up.isDown) {
      game.camera.y -= speed;
    }
    if (game.cursors.down.isDown) {
      game.camera.y += speed;
    }
  };
});
gameD.state.add("level 2", function SceneLevel1() {
  this.preload = function () {
    const game = this.game;
    game.load.image("bg", level2);
  };
  this.create = function () {
    const game = this.game;
    game.scale.setGameSize(140, 140);
    const bg = game.add.sprite(0, 0, "bg");
    game.world.setBounds(0, 0, 272, 208);
    game.cursors = game.input.keyboard.createCursorKeys();
    game.camera.y = 8;
  };
  this.update = function () {
    const game = this.game;
    const speed = SPEED;
    if (game.cursors.left.isDown) {
      game.camera.x -= speed;
    }
    if (game.cursors.right.isDown) {
      game.camera.x += speed;
    }
    if (game.cursors.up.isDown) {
      game.camera.y -= speed;
    }
    if (game.cursors.down.isDown) {
      game.camera.y += speed;
    }
  };
});
gameD.state.start("level 1");
