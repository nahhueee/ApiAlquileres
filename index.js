const cors = require('cors');
const express = require('express');
const res = require('express/lib/response');
// const morgan = require('morgan');
const path = require('path')

const AlquilerRuta = require('./src/routes/alquileres');
const MailRuta = require('./src/routes/mails');
const ZonaRuta = require('./src/routes/zonas');

const app = express();
// app.use(morgan("dev"));

//setings
// app.set('port', process.env.Port || 3000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Starting the server
app.listen(process.env.PORT || 5000)

app.use('/api/',(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola Mundo');
});


app.use('/api/rentals', AlquilerRuta.default);
app.use('/api/zones', ZonaRuta.default);
app.use('/api/send-email', MailRuta.default);