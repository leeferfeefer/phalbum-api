const fs = require('fs');
const path = require('path');


const processImages = (images) => {
    for (const image of images) {           
        // remove base64 header:
        const base64Image = image.imageBase64.split(';base64,').pop();
        const filePath = `${path.normalize('images')}/${image.name}`;
        try {
            if (!fs.existsSync(filePath)) {
                fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) {
                    if (err) {
                        console.log("error! ", err);
                    } else {
                        console.log('File created');
                    }            
                });
            }
        } catch(err) {
            console.error(err)
        }        
    }
};


module.exports = {
    processImages
}