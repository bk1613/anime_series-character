import { Character } from '../models/character';

export class Series {
    public sId:number;
    public name:String;
    public description:String;
    public characters:Array<Character>;

    constructor(sId:number, name:String, description:string, characters:Array<Character>){
        this.sId=sId,
        this.name=name,
        this.description=description,
        this.characters=characters
    }
}
