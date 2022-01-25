const path = require("path");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const imageFormat = path.extname(req.files.img.name)
        const reducedImageFormat = path.extname(req.files.reduced_img.name)
        const imageSize = req.files.img.size
        const reducedImageSize = req.files.reduced_img.size
        const maxSize = 5*Math.pow(10,6)
        const reducedMaxSize = 256*1000

        if(imageFormat !== '.jpg' && imageFormat !== '.jpeg' && imageFormat !== '.png') {
            return res.status(400).json({message: "Формат картинки не подходит"})
        }

        if(reducedImageFormat !== '.jpg' && reducedImageFormat !== '.jpeg' && reducedImageFormat !== '.png') {
            return res.status(400).json({message: "Формат уменьшенного изображения не подходит"})
        }

        if(imageSize>maxSize) {
            return res.status(401).json({message: "Размер изображение больше 5мб"})
        }

        if(reducedImageSize>reducedMaxSize) {
            return res.status(401).json({message: "Размер уменьшенного изображения больше 256кб"})
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Insert error"})
    }
};
