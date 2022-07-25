var express = require('express');

var multer = require('multer');
const {log} = require("debug");
var storage = multer.diskStorage({
   destination: function (req,file,cb){
       cb(null,'upload');
   } ,
    filename:function (req,file,cb){
       cb(null, Date.now() + Math.random() + file.originalname);
    },

});
var upload = multer({storage : storage,limits : {fileSize : 2 * 1024 * 1024},
    fileFilter : function (req,file,cb){
        //kiem tra duoi file hoac cac yeu cau tuy y
        var ten = file.mimetype;
        console.log(file.mimetype)

        if (ten.indexOf('.jpg') > -1){
            console.log('>-1')
            cb(null,true);
        }else {
            console.log('<-1')
            cb(new Error("duoi file phai la JPG"),false);
        }
    }
}).single('file');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload',
    function (req,res){
        upload(req,res,function (err){
            if(err != null){
                res.send(err.message)
            }else {
                var email = req.body.email;
                var file = req.file.originalname;

                res.send('ok,upload file thanh cong :' +file);
            }
        })
    }
    )

module.exports = router;

