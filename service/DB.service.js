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


const getImages = (index, chunkSize, callback) => {
    db.serialize(() => {
        if (chunkSize === -1) {
            db.all(`SELECT * FROM photos`, function(err, allRows) {
                if (err) {
                    console.log("Error retrieving all images from DB: ", err);
                    callback([]);
                }
                callback(allRows);        
            });  
        } else {
            db.all(`SELECT * FROM photos LIMIT ${chunkSize} OFFSET ${index*chunkSize}`, function(err, allRows) {
                if (err) {
                    console.log("Error retrieving all images from DB: ", err);
                    callback([]);
                }
                callback(allRows);        
            });  
        }            
    });
};

const getImagesOneAtATime = (callback) => {
    db.serialize(() => {
        db.each(`SELECT * FROM photos`, function(err, row) {
            if (err) {
                console.log("Error retrieving image from DB: ", err);
                callback(false);
            }
            callback(row);        
        });
    });
};


const getImageCount = (callback) => {
    db.serialize(() => {
        db.get(`SELECT COUNT(*) FROM photos;`, (err, count) => {
            if (err) {
                console.log("Error retrieving count from DB: ", err);
                callback(false);
            }
            callback(count);
        });
    });
};


module.exports = {
    createDB,
    deletePhotoTable,
    saveImages,
    getImages,
    getImagesOneAtATime,
    getImageCount
};
