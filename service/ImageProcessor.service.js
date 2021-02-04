const fs = require('fs');
const path = require('path');


const processImage = (image) => {
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
        console.error('Error processing image: ', err)
    }        
};


module.exports = {
    processImage
}