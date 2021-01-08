const sqlite3 = require('sqlite3').verbose();

let db;
const createDB = () => {
    db = new sqlite3.Database('./phalbum.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
        if (error) {
            console.error(error.message);
        } else {
            console.log('Connected to the phalbum database.');
        }
    });

    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS photos (
                id integer PRIMARY KEY,
                name text NOT NULL,
                imageBase64 text NOT NULL,
                size integer,
                type text NOT NULL,
                dateMillis integer                    
            );
        `);
    });
};

const deletePhotoTable = () => {
    db.serialize(() => {
        db.run(`
            DROP TABLE IF EXISTS photos;
        `);
    });
};

const saveImages = (images) => {
    db.serialize(() => {
        const stmt = db.prepare(`
            INSERT INTO photos (
                name,
                imageBase64,
                size,
                type,
                dateMillis
            )
            VALUES(?,?,?,?,?)
        `);
        for (const image of images) {
            stmt.run(image.name, image.imageBase64, image.size, image.type, image.dateMillis);
        }
        stmt.finalize((error) => {
            if (error) {
                console.log(error.message);
            } else {
                console.log("Successfully added!");
            }
        });
    });
};

const getImages = (callback) => {
    db.serialize(() => {
        db.all("SELECT * FROM photos", function(err, allRows) {
            if (err) {
                console.log(err);
                callback(false);
            }
            callback(allRows);        
        });
    });
};


module.exports = {
    createDB,
    deletePhotoTable,
    saveImages,
    getImages
};