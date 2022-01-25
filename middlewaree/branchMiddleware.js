const path = require("path");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const imageFormat = path.extname(req.files.img.name)
        const imageSize = req.files.img.size
        const maxSize = 5*Math.pow(10,6)

        if(imageFormat !== '.jpg' && imageFormat !== '.jpeg' && imageFormat !== '.png') {
            return res.status(400).json({message: "Формат картинки не подходит"})
        }

        if(imageSize>maxSize) {
            return res.status(401).json({message: "Размер изображение больше 5мб"})
        }
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Insert error"})
    }
};
