require("dotenv").config();
const app = require('./server');
const port = app.get('port');

app.listen(port, () => console.log("Listening on port " + port));

app.set("view engine", "ejs");
var access_token = "";

// Importo la libreria de axios
const axios = require("axios");

// Clave Publica y Secreta
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Ruta Inicial
app.get("/", (req, res) => {
  res.render("index", { client_id: clientID });
});

// Declaro la ruta del Callback
app.get("/github/callback", (req, res) => {
  const requestToken = req.query.code;

  axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    // Defino el tipo de header para tener una respuesta JSON
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    access_token = response.data.access_token;
    console.log(response.data);
    res.redirect("/success");
  });
});

// Ruta luego de autenticar 
app.get("/success", (req, res) => {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((response) => {
    res.render("success", { userData: response.data });
    console.log(response.data);
  });
});
