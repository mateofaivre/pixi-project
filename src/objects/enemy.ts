import { AnimatedSprite, Texture } from "pixi.js";
import { AObject } from "./AObject";
import { AObjectAnimated } from "./AObjectAnimated";

export class Enemy extends AObjectAnimated {

    private _run = AnimatedSprite.fromFrames(["goomba-gauche2.png", "goomba-base2.png" , "goomba-droite2.png"]);
    // private _jump = AnimatedSprite.fromFrames(["mario-run.png", "mario-jump.png"]);

    public hurt = false;

    constructor() {
        super();

        this.addChild(this._run);
        this._run.animationSpeed =  0.15
        this._run.play();
    }

    public update(timeDelta:number) {
super.update(timeDelta)
        
if (!this.hurt) {
    this.x -= 6;
}
else {
    this._run.stop();
}

if (this.x < (0 - this.width))
this.kill = true;
    
    }

    // public jump() {

    //     this.removeChild(this._run);
    //     this.addChild(this._jump);
    //     this._run.animationSpeed = this._jump.animationSpeed =  0.05

    //     // gsap.to(this._jump, {
    //     //     duration: 0.5,
    //     //     y: -500,
    //     //     ease: Linear.easeNone,
    //     //     onComplete: () => {
    //     //         this._jump.dispose();
    //     //         this._container.removeChild(this._jump);
    //     //     },
    //     // });
      

    //     this._jump.play();
    // }
}