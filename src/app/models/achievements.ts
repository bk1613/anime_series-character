import { Character } from '../models/character'

export class Achievements {
    public acId: number;
    public feat: String;
    public chrachieve: Character;

    constructor(acId: number, feat: String, chrachieve: Character){
        this.acId = acId,
        this.feat = feat,
        this.chrachieve = chrachieve
    }
}
