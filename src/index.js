import { Account } from "./models/Account.js";

try{
const  clientAccount = new Account("Dior");
console.log(clientAccount);
}catch(error){
    console.log(error.message);
}