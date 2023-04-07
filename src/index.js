// Inicio el servidor y requiero variables de entorno
require("dotenv").config();
const app = require('./server');
const port = app.get('port');

app.listen(port, () => console.log("Listening on port " + port));

// Seteo el motor de plantillas ejs
app.set("view engine", "ejs");