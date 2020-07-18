export class User {
    public Id: number;
    public username: String;
    public email: String;
    public password: String;
    public role: String;

    constructor(Id: number, username: String, email: String, password: String, role: String){
        this.Id = Id,
        this.username = username,
        this.email = email,
        this.password = password,
        this.role = role
    }
}

