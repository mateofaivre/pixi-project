import { AnimatedSprite, TilingSprite } from "pixi.js";
import { AObject } from "./AObject";
import { AObjectAnimated } from "./AObjectAnimated";
import { Sprite, Texture } from "pixi.js";
import {gsap} from "gsap"
import { Main } from "..";

export class Player extends AObjectAnimated
{
    private _run = AnimatedSprite.fromFrames(["mario-w-ombre.png", "mario-marche.png", "mario-run.png"]);
    private _jump = AnimatedSprite.fromFrames(["mario-jump.png"]);
    private _die = Sprite.from("mario-die.png");

    private _isJumping = false ;

    constructor() {
        super();

        this.addChild(this._run);
        this._run.animationSpeed = 0.15
        this._jump.animationSpeed = 0.1
        this._run.play();

        console.log("ici", this.height);
    }

    public jump() {

        // this.removeChild(this._run);
        // this.addChild(this._jump)
      

        // this._jump.play();

        if (this._isJumping)
                return;
            this.removeChild(this._run); 
            this.addChild(this._jump);
            this._isJumping = true;
            gsap.to(this, { duration: 0.5, y: 600, yoyo: true, repeat: 1, onComplete: () => {
                        this.removeChild(this._jump);
                        this.addChild(this._run)
                        this._isJumping = false;
                    }, });
            this._jump.play();
    }

    public die(){
        this.removeChildAt(0);
        this.addChild(this._die);

        // console.log('die')

    }
}