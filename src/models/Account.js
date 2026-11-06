import  {randomUUID} from "node:crypto";
export class Account {
    #balance = 0;
    constructor(ownerName){
        this.id = randomUUID();
        this.ownerName = ownerName;
        this.createdAt = new Date();
    };
    get balance(){
        return this.#balance;
    }
};