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
                imageFilePath text NOT NULL
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

const addPhotoFilePaths = (imageFilePaths) => {
    db.serialize(() => {
        const stmt = db.prepare(`
            INSERT INTO photos (
                imageFilePath
            )
            VALUES(?)
        `);
        for (const imageFilePath of imageFilePaths) {
            stmt.run(imageFilePath);
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


module.exports = {
    createDB,
    addPhotoFilePaths,
    deletePhotoTable
};