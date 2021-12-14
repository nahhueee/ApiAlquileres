const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer')
const path = require('path')


const usuarioRuta = require('./src/routes/usuariosRuta');
const productosRuta = require ('./src/routes/productosRuta');
const empleadosRuta = require ('./src/routes/EmpleadosRuta');
const cajasRuta = require ('./src/routes/cajasRuta');
const ventasRuta = require ('./src/routes/ventasRuta');
const detVentasRuta = require ('./src/routes/detVentasRuta');
const extraccionRuta = require ('./src/routes/extraccionRuta');
const pagosRuta = require ('./src/routes/pagosRuta');
const estadisticasRuta = require ('./src/routes/estadisticasRuta');
const categoryRuta = require ('./src/routes/CategoriasRuta');

const app = express();
app.use(morgan("dev"));

//cloudinary
const cloudinary = require('cloudinary');

const acceso= cloudinary.config({
   cloud_name: 'creation-code',
   api_key: '321863472233176',
   api_secret: '3dJZXGfdavDuSNHQrvaJoNugKNs' 
})


//setings
app.set('port', process.env.Port || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});

//routes
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));


app.post('/api/upload', async (req, res) =>{
    console.log(req.file);
    const resultado= await cloudinary.v2.uploader.upload(req.file.path,
                            function(error, result) {console.log(result, error)});
    

    await fs.unlinkSync(req.file.path)
    console.log(resultado.url)
    res.json(resultado.url);
})


app.use('/api/users', usuarioRuta.default);