import { kill } from "process"

export interface IObject {
    kill:boolean,
    update(timeDelta: number):void
}