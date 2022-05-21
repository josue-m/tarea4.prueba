//npm init
//npm install express --save
//npm install cors
//npm install mongoose
//npm install dotenv
//npm install --save path

var path = require("path");
var cors = require('cors');
var express = require('express');

const {port} = require('./BD/database');
const {BDConnect} = require('./BD/database');
var CancionesRuta = require('./options/CancionesRuta');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

BDConnect();

app.use(express.static('public'));

app.use("/api/canciones", CancionesRuta);

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

app.listen(port, () => 
{
    console.log(`Escuchando el puerto ${port}`)
})