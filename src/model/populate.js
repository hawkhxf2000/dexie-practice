import {db} from "./db";

export async function populate(){
    let users = [];
    let userTemp;
    for(let i=0; i<100; i++){
        userTemp = {
            name:Math.random().toString(36).slice(-6),
            email: Math.random().toString(36).slice(-8)+"@gmail.com",
            age: Math.round(Math.random()*100)
        }
        users.push(userTemp);
    }

    await db.tb_user.bulkAdd(users);
}