import { Character } from '../models/character'

export class Skills {
    public skillId: number;
    public skillname: String;
    public character: Character;

    constructor(skillId:number, skillname:String, character:Character){
        this.skillId = skillId,
        this.skillname = skillname,
        this.character = character
    }
}
