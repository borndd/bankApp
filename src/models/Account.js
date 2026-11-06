import  {randomUUID} from "node:crypto";
export class Account {
    #balance = 0;
    constructor(ownerName){
        if(typeof ownerName !== "string" || !ownerName.trim()){
            throw new Error ("You need to enter your name");
        };
        this.id = randomUUID();
        this.ownerName = ownerName;
        this.createdAt = new Date();
    };
    get balance(){
        return this.#balance;
    }
};  