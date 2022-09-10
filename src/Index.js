
const app = require('./app');


app.get("/", (req, res)=> res.send("Koneksi Anda Berhasil !!"))


app.listen( process.env.PORT, () => console.log('Listen on port ' + process.env.PORT) );