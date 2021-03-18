import { AScene } from "./AScene";
import { Player } from "../objects/Player";
import { BitmapText, Sprite, Texture, TilingSprite, Loader, Application, AnimatedSprite } from "pixi.js";

import { Main } from "..";
import { AObject } from "../objects/AObject";
import { Maths } from "../utils/Maths";
import { IObject } from "../objects/IObject";


export class Game extends AScene {


    private _player = new Player();
    private _goomba = AnimatedSprite.fromFrames(["goomba-gauche2.png", "goomba-droite2.png"]);

    private _objects: IObject[] = [];

    private _ground !: TilingSprite;
    private _bg !: Sprite;

    private _win = false;

    constructor() {
        super();
        console.log('game launched');
        this._player.x = 200;
        this._player.y = 200;
        this.addChild(this._player);

        this._goomba.x = 200;
        this._goomba.y = 200;
        this.addChild(this._goomba)
        this._goomba.animationSpeed = 0.08;
        this._goomba.play();

        this._objects.push(this._player);
        //this._objects.push(this._goomba);
    }

    public initialize() {
        super.initialize();
        this._bg =  Sprite.from("background.png");
        this.addChild(this._bg)
     
    
        this._ground  = new TilingSprite(Texture.from("sol-nes.png"), 1920, 150);
        console.log(this._ground.height)
        this._ground.y = Main.SCREEN_HEIGHT -   this._ground.height;
        this.addChild(this._ground)

        this._player.x = (Main.SCREEN_WIDTH - this._player.width) * 0.5;
        this._player.y = Main.SCREEN_HEIGHT -  this._ground.height - this._player.height;
        this.addChild(this._player);

        this._goomba.x = (Main.SCREEN_WIDTH - this._goomba.width);
        this._goomba.y = Main.SCREEN_HEIGHT -  this._ground.height - this._goomba.height;
        this.addChild(this._goomba);

        document.body.addEventListener("click", this._jump.bind(this));
    }

    public dipose() {
        super.dispose();
    }

    public update(timeDelta: number) {
        super.update(timeDelta);

        
        this._ground.tilePosition.x -= 4;
        this._goomba.position.x -= 6;
    }

    private _jump() {
        this._player.position.y-=500;
        this._player.jump();
        console.log('jump')
    }

    private _onKeyboard(kEvt: KeyboardEvent) {
        // if (kEvt.key == "ArrowLeft") this._player.direction = kEvt.type == "keydown" ? Direction.Left : Direction.Idle;
        // else if (kEvt.key == "ArrowRight")
        //     this._player.direction = kEvt.type == "keydown" ? Direction.Right : Direction.Idle;
    }
}
