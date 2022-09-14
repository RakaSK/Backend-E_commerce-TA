
const app = require('./app');
const port = process.env.PORT || 7070; 


app.get("/api", (req, res)=> res.send("Koneksi Anda Berhasil !!"))


app.listen( port, () => console.log('Listen on port ' + process.env.PORT) );