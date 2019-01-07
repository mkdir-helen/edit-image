const db = require('./db');

class Demo {
    constructor(id, name, folder_name, url, user_id){
        this.id=id;
        this.name=name;
        this.folder_name=folder_name;
        this.url=url;
    }
    static addDemo(name, folder_name, url, user_id){
        return db
            .one(
                `insert into demos
                (name, folder_name, url, user_id)
                values
                ($1, $2, $3, $4)
                returning id`,
                    [name, folder_name, url, user_id]
            )
            .then(result => {
                return new Demo(result.id, name, folder_name, url, user_id);
            });
    }
    static getByUser(user_id){
        return db.any(`select * from demos where user_id = $1`, [user_id]);
    }
    static getById(id){
        return db.one(`select * from demos where id=$1`, [id]);
    }
    static getByUrl(url){
        return db.one(`select * from demos where url=$1`, [url]);
    }
    static getAll(){
        return db.any('select * from demos')
        // .then(resultsArray => resultsArray.map(result => new Demo(result.id, result.name, result.url)))
    }

    static updateName(id, newName){
        return db.result(`update demos set name=$1, where id=$2`,
        [newName, id]);
    }

    static delete(id){
        return db.result(`delete from demos where id=$1`, [id]);
    }
    static deleteByUrl(url){
        return db.result(`delete from demos where url=$1`, [url]);
    }
}

module.exports = Demo;