import { AnimatedSprite, Texture } from "pixi.js";
import { AObject } from "./AObject";
import { AObjectAnimated } from "./AObjectAnimated";

export class Koopa extends AObjectAnimated {

    private _runK = AnimatedSprite.fromFrames(["koopa-down.png", "koopa-up.png"]);
    // private _jump = AnimatedSprite.fromFrames(["mario-run.png", "mario-jump.png"]);

    public hurt = false;

    constructor() {
        super();

        this.addChild(this._runK);
        this._runK.animationSpeed =  0.15
        this._runK.play();
    }

    public update(timeDelta:number) {
super.update(timeDelta)
        
if (!this.hurt) {
    this.x -= 6;
}
else {
    this._runK.stop();
}
    
    }

}