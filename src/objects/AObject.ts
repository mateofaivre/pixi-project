import { Sprite, Texture } from "pixi.js";
import { IObject} from "./IObject"

export abstract class AObject extends Sprite implements IObject {
    public kill = false;

    constructor(texture: Texture | undefined) {
        super(texture);
    }

    public update(timeDelta: number) {}

    public getWidth() {
        return this.width;
    }

    public getHeihght() {
        return this.height;
    }
}
