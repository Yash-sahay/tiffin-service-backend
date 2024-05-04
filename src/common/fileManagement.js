const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const tempImgShift = async (filename) => {
    const cleanedPath = filename.replace(/\\/g, '/');
    const baseFilename = path.basename(cleanedPath);
    const destinationFolderPath = 'resources';

    // Create the destination path by combining the destination folder path with the filename
    const destinationPath = path.join(destinationFolderPath, baseFilename);

    // Use fs.rename to move the file
    fs.rename(cleanedPath, destinationPath, (err) => {
        if (err) {
            console.error('Error moving file:', err);
        } else {
            console.log('File moved successfully!');
        }
    });
}

const deleteTempFile = async () => {
    let imageFolderPath = './temp-resources';
    fs.readdir(imageFolderPath, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(imageFolderPath, file), err => {
                if (err) throw err;
            });
        }
    });
}

const filePathChange = async (filename) => {
    const baseFilename = path.basename(filename);
    return `resources/${baseFilename}`
}

module.exports = { tempImgShift, deleteTempFile, filePathChange };
