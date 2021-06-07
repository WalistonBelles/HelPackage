var express = require("express")
var app = express();
var router = express.Router();

// Controllers
var UserController = require("../controllers/UserController");
var ProductController = require("../controllers/ProductController");
var MaterialController = require("../controllers/MaterialController");

// Middlewares
var AdminAuth = require("../middleware/AdminAuth");

var multer = require('multer');
var upload = multer({ dest: './uploads/' });

// Upload
router.post('/upload', upload.array('file'), async (req, res) => {
    console.log(req.files.fieldSize);
    res.send({ upload: true, files: req.files });
});

router.post("/login", UserController.login);

// Área de Administrador
router.get("/user", AdminAuth, UserController.index);
router.post('/user', UserController.create);

// Material
router.get('/product', ProductController.index);
router.post('/product', ProductController.create);
router.get('/material', MaterialController.index);
router.get('/materialAll', MaterialController.countAll);

module.exports = router;