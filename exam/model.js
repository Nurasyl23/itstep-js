class Location {
    
    from;
    to;
    
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}

class DbContext {

    static DB_NAME = "locations";
    static VERSION = 2;

    db;

    constructor(db) {
        this.db = db;
    }

    static open() {

        return new Promise((resolve, reject) => {

            const  request = window.indexedDB.open(DbContext.DB_NAME, DbContext.VERSION);

            request.addEventListener("error", (e) => {
                console.log(e);
                reject(e);
            });
        
            request.addEventListener("success", (e) => {
                
                const db = request.result;

                db.addEventListener("error", e => {
                    console.log("DbContext", "Error", e);
                });

                resolve(new DbContext(db));
            });
        
            request.addEventListener("upgradeneeded", DbContext.upgrade);

        });

    }

    /*
     *@param {IDBVersionChangeEvent} e
     */
    static upgrade(e) {
        console.log("DbContext", `UPGRADE from ${e.oldVersion} to ${e.newVersion}`)
        //console.log(this, e);

        //e.target.transaction.abort();

        const db = e.target.result;

        switch (e.oldVersion) {
            case 0:
            case 1: {
                const store = db.createObjectStore("locations", {
                    autoIncrement: true
                });
            }
        }
    }
}