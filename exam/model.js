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
                console.log(request, e);
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

    seed(generateLocations) {

        return new Promise((resolve, reject) => {

            const transaction = this.db.transaction("locations", "readwrite");

            transaction.addEventListener("complete", e => {
                console.log("DbContext", "saved", e);
    
                resolve();
            });

            transaction.addEventListener("error", e => {
                reject(e);
            });
    
            const store = transaction.objectStore("locations");

            store.count().onsuccess = e => {

                if (e.target.result > 0) {
                    return;
                }

                generateLocations(600).forEach(location => {
                    store.add(location);
                });

            }

        });

    }

    findLocations(predicate) {

        return new Promise((resolve, reject) => {

            const transaction = this.db.transaction("locations", "readonly");

            const result = [];

            transaction.addEventListener("complete", e => {
                console.log("DbContext", "find", e);
    
                resolve(result);
            });

            transaction.addEventListener("error", e => {
                reject(e);
            });
    
            const store = transaction.objectStore("locations");

            store.openCursor().onsuccess = e => {

                var cursor = e.target.result;

                if(cursor) {

                    const value = cursor.value;

                    predicate(value) && (result.push(value));
                   
                    cursor.continue();
                } else {
                    console.log("DbContext", "cursor end")
                }

            }

        });
    }
}