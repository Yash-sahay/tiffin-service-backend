const multer = require('multer')
const path = require('path');

// For image start
const fileStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'temp-resources',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
    }
});

const fileUpload = multer({
    storage: fileStorage,
    limits: {
        // fileSize: 1000000 // 1000000 Bytes = 1 MB
        // fileSize: 10000000 // 10000000 Bytes = 10 MB
        fileSize: 500000000 // 100000000 Bytes = 500 MB
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.match(/\.(video|aac|adt|adts|accdb|accde|accdr|accdt|aif|aifc|aiff|aspx|avi|bat|bin|bmp|cab|cda|csv|dif|dll|doc|docm|docx|dot|dotx|eml|eps|exe|flv|gif|GIF|htm|html|ini|iso|jar|jpg|JPG|jpeg|JPEG|m4a|mdb|mid|midi|mov|mp3|mp4|mp4|mpeg|mpg|msi|mui|pdf|png|PNG|pot|potm|potx|ppam|pps|ppsm|ppsx|ppt|pptm|pptx|psd|pst|pub|rar|rtf|sldm|sldx|swf|sys|tif|tiff|tmp|txt|vob|vsd|vsdm|vsdx|vss|vssm|vst|vstm|vstx|webp|WEBP|wav|wbk|wks|wma|wmd|wmv|wmz|wms|wpd|wp5|xla|xlam|xll|xlm|xls|xlsm|xlsx|xlt|xltm|xltx|xps|zip)$/)) {
        //     return cb(new Error('Please upload a Image'))
        // }
        if (!file.originalname.match(/\.[a-zA-Z0-9]+$/)) {
            return cb(new Error('Please upload a valid file'))
        }
        cb(undefined, true)
    }
})

module.exports = { fileUpload };
