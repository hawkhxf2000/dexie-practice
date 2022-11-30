import {Dexie} from "dexie";
import {populate} from "./populate";

// const db=new Dexie('testDB');
// db.version(1).stores({
//     tb_user: '++id, name, email',
// });
//
// export default db;
class TestDB extends Dexie {
    constructor() {
        super('testDB');
        this.version(1).stores({
            tb_user: '++id, name, email'
        });
    }
}

export const db=new TestDB();
db.on('populate',populate);

export function resetDatabase() {
    return db.transaction('rw', db.tb_user,async () => {
        await Promise.all(db.tables.map(table => table.clear()));
        await populate();
    });
}
