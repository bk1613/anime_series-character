import { Series } from '../models/series';
import { Skills } from '../models/skills';

export class Character {
    public CharId:number;
    public name:String;
    public image:String;
    public gender:String;
    public skills:Array<Skills>;
    public ability: String;
    public profile: String;
    public rank: String;
    public series: Series;

    constructor(CharId:number, name:String, image:String, gender:String, skills:Array<Skills>, ability: String, 
        profile: String, rank: String, series: Series) {
        this.CharId = CharId,
        this.name = name,
        this.image=image,
        this.gender=gender,
        this.skills=skills,
        this.ability=ability,
        this.profile=profile,
        this.rank=rank,
        this.series=series
    }

}
