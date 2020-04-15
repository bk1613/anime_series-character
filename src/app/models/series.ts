import { Character } from '../models/character';

export class Series {
    public sId:number;
    public name:String;
    public image:String;
    public description:String;
    public characters:Array<Character>;

    constructor(sId:number, name:String, image:String, description:String, characters:Array<Character>){
        this.sId=sId,
        this.name=name,
        this.image=image,
        this.description=description,
        this.characters=characters
    }
}
