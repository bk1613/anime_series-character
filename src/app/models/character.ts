import { Series } from '../models/series';
import { Skills } from '../models/skills';

export class Character {
    public charId:number;
    public name:String;
    public image:String;
    public gender:String;
    public skills:Array<Skills>;
    public special: String;
    public profile: String;
    public rank: String;
    public series: Series;

    constructor(charId:number, name:String, image:String, gender:String, skills:Array<Skills>, special: String, 
        profile: String, rank: String, series: Series) {
        this.charId = charId,
        this.name = name,
        this.image=image,
        this.gender=gender,
        this.skills=skills,
        this.special=special,
        this.profile=profile,
        this.rank=rank,
        this.series=series
    }

}
