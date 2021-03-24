import { AScene } from "./AScene";
import { Player } from "../objects/Player";
import { BitmapText, Sprite, Texture, TilingSprite, Loader, Application, AnimatedSprite } from "pixi.js";

import { Main } from "..";
import { AObject } from "../objects/AObject";
import { Maths } from "../utils/Maths";
import { IObject } from "../objects/IObject";
import { Enemy } from "../objects/enemy";
import { GameOver } from "./gameOver";


export class Game extends AScene {


    private _player = new Player();
    // private _goomba = AnimatedSprite.fromFrames(["goomba-gauche2.png", "goomba-droite2.png"]);
    private _goomba = new Enemy();

    private _objects: IObject[] = [];

    private _ground !: TilingSprite;
    private _bg !: Sprite;

    private _win = false;
    private _audio = new Audio('assets/mp3/home.mp3');
    public audioGameOver = new Audio('assets/mp3/game-over.mp3');

    constructor() {
        super();
        console.log('game launched');

        this._audio.play();
        this._player.x = 200;
        this._player.y = 200;
        this.addChild(this._player);

        this._goomba.x = 200;
        this._goomba.y = 200;
        this.addChild(this._goomba)
        // this._goomba.animationSpeed = 0.08; 
        // this._goomba.play();

        this._objects.push(this._player);
        //this._objects.push(this._goomba);
    }

    public initialize() {
        super.initialize();
        this._bg =  Sprite.from("background.png");
        this.addChild(this._bg) //tst
    
        this._ground  = new TilingSprite(Texture.from("sol-nes.png"), 1920, 150);
        console.log(this._ground.height)
        this._ground.y = Main.SCREEN_HEIGHT -   this._ground.height;
        this.addChild(this._ground)

        this._player.x = (Main.SCREEN_WIDTH - this._player.width) * 0.5;
        this._player.y = Main.SCREEN_HEIGHT -  this._ground.height - this._player.height;
        this.addChild(this._player);

        this._goomba.x = (Main.SCREEN_WIDTH - this._goomba.width);
        this._goomba.y = Main.SCREEN_HEIGHT -  this._ground.height - 85;
        this.addChild(this._goomba);

        document.body.addEventListener("click", this._jump.bind(this));
    }

    public dipose() {
        super.dispose();
    }


    public update(timeDelta: number) {
        super.update(timeDelta);

        this._ground.tilePosition.x -= 4;

        this._goomba.update(timeDelta);
          
            
            if (this._isIntersecting(this._player, this._goomba)){

                this._goomba.hurt = true;
                this._fin()
            }

    }

    private _isIntersecting(r1 = this._player, r2 = this._goomba): boolean {
        return !(
            r2.x > r1.x + r1.width ||
            r2.x + r2.width < r1.x ||
            r2.y > r1.y + r1.height ||
            r2.y + r2.height < r1.y
        );
    }



    private _fin() {
        this._audio.pause();
        this.audioGameOver.play();
        // this._goomba.position.x -= 0;
        this._ground.tilePosition.x = 0;
        // console.log('ttt')
        this._player.die();
        setTimeout( () => {
            Main.instance.scene = new GameOver();
        }, 800)
        // Main.instance.scene = new GameOver();
    }


    private _jump() {
        this._player.position.y-=500;
        // this._player.position.y+=500;
        this._player.jump();
        console.log('jump')
    }

    private _onKeyboard(kEvt: KeyboardEvent) {
        // if (kEvt.key == "ArrowLeft") this._player.direction = kEvt.type == "keydown" ? Direction.Left : Direction.Idle;
        // else if (kEvt.key == "ArrowRight")
        //     this._player.direction = kEvt.type == "keydown" ? Direction.Right : Direction.Idle;
    }
}
