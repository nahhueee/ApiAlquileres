const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path')

const AlquilerRuta = require('./src/routes/alquileres');
const MailRuta = require('./src/routes/mails');

const app = express();
app.use(morgan("dev"));

//setings
app.set('port', process.env.Port || 3000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});

app.use('/api/rentals', AlquilerRuta.default);
app.use('/api/send-email', MailRuta.default);