import { AnimatedSprite } from "pixi.js";
import { AObjectAnimated } from "./AObjectAnimated";

export class Player extends AObjectAnimated
{
    private _run = AnimatedSprite.fromFrames(["mario-w-ombre.png", "mario-marche.png", "mario-run.png"]);
    private _jump = AnimatedSprite.fromFrames(["goomba-gauche2.png", "goomba-droite2.png"]);

    constructor() {
        super();

        this.addChild(this._run);
        this._run.animationSpeed = this._jump.animationSpeed =  0.15
        this._run.play();
    }

    public jump() {

        this.removeChild(this._run);
        this.addChild(this._jump);

        this._jump.play();
    }
}