import {gsap, Back } from "gsap";
import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import {Main} from "../index";
import { AScene } from "./AScene";
import { Game } from "./Game";

export class HomeScreen  extends AScene {

    private _timeline = gsap.timeline();
    private _ready = Sprite.from("smb-start-normal.png");
    private _bg !: Sprite;
    private _soundIcon !: Sprite;
    private _ground !: TilingSprite;
    private _audio = new Audio('assets/mp3/ending.mp3');

    constructor() {
        super();


        this._bg =  Sprite.from("background.png");
        this.addChild(this._bg)

        this._soundIcon =  Sprite.from("sound-up.png");
        this.addChild(this._soundIcon)
        this._soundIcon.x = 20
        this._soundIcon.y= Main.SCREEN_HEIGHT - this._soundIcon.height - 20

        // this._ready = Sprite.from("ready.png");
        this._ready.x = (Main.SCREEN_WIDTH -  this._ready.width) / 2;
        this._ready.y =  - this._ready.height;
        this.addChild(this._ready)

        // const ground  = new TilingSprite(Texture.from("sol-nes.png"), 1920, 150);
        
        // ground.y =500;
        // this.addChild(ground);
        // this._ground  = new TilingSprite(Texture.from("sol-nes.png"), 1920, 150);
        // console.log(this._ground.height)
        // this._ground.y = Main.SCREEN_HEIGHT -   this._ground.height;
        // this.addChild(this._ground)



        this._timeline = gsap.timeline();
        this._timeline.to( this._ready, {y: (Main.SCREEN_HEIGHT -  this._ready.height) / 2, duration: 0.6, ease: Back.easeOut  })

        // gsap.to(ready, {alpha: 0.5, duration: 0.6, yoyo: true, repeat: -1})
        this._timeline.to( this._ready, {alpha: 0.5, duration: 0.6, yoyo: true, repeat: -1})

        this._ready.interactive = true;
        this._ready.buttonMode = true; 

        this._ready.once("pointerdown", this._play.bind(this));
        
    }

    

    private _play(){
        // alert('clicked')
        this._audio.pause(); 
        this._timeline.kill();
        this._ready.alpha = 1;
        gsap.to(this._ready, {
            y: -this._ready.height, onComplete: () => {
                console.log("animation finished")
                Main.instance.scene = new Game();
            }
        })
    }

    private _playSound() {
        console.log('pppp')
        this._audio.play();

        this._soundIcon.addEventListener("pointerdown", this._playSound.bind(this));
    }
}