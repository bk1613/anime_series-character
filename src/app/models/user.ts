export class User {
    public Id: number;
    public username: String;
    public password: String;

    constructor(Id: number, username: String, password: String){
        this.Id = Id,
        this.username = username,
        this.password = password
    }
}

