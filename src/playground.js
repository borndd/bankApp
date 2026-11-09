import { Account } from "./models/Account.js";

try{
const account = new Account("Dior");

account.deposit(10);
account.withdraw(2);
console.log(account.balance);
console.log(account.transactions);

}catch(error){
    console.log(error.message);
}
