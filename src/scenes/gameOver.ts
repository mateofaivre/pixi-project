import { Sprite } from "pixi.js";
import { AScene } from "./AScene";
import { Game } from "./Game";
import { Main } from "..";
import {gsap} from "gsap";
import { HomeScreen } from "./HomeScreen";

export class GameOver extends AScene {
    constructor(){
        super();

        const gameOver = Sprite.from("game-over-full-text.png");
        gameOver.x = (Main.SCREEN_WIDTH - gameOver.width) / 2;
        gameOver.y = (Main.SCREEN_HEIGHT - gameOver.height) / 2;
        this.addChild(gameOver);

        gameOver.interactive = true ;
        gameOver.buttonMode = true;

        gsap.to(gameOver,  {alpha: 0.5, duration: 0.8, repeat: -1, yoyo: true})

        gameOver.once("pointerdown", () => {

            Main.instance.scene = new  HomeScreen()});

    }
}