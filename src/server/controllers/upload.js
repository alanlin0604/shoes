const e = require("express");
const fs = require("fs");
const db = require("../../config/db2");
const uploadFiles = async (req, res) => {
    /*
    if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        res.send({ msg:'Only image files (jpg, jpeg, png) are allowed!'})};
*/
    if (req.file == undefined) {
        return res.send(`必須選擇圖片`);
    }

    else {
        let newPath = `public/images/${req.file.originalname}`
        fs.rename(req.file.path, newPath, () => {

        })
        var imgPath = 'http://192.168.137.1/images/'+ req.file.originalname ;
        
        //var imgPath = { image: `/public/images/${req.file.originalname}` }
        console.log(req);
        console.log(imgPath);
        try {
            await db.query(`UPDATE shoes_information SET 圖片 = ? WHERE ID = ?`, [imgPath, req.body.id1]);
             /*
            res.send({
                success: true,
                message: '上傳圖片成功'
              });
*/
            res.redirect('/shoes.html');
                        
                    } catch (err) {
                        console.log(err);
                    }
    };




}



module.exports = {
    uploadFiles,
};
