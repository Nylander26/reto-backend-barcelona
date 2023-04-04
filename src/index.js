// Creo el servidor y el manejo de motor de plantillas

const express = require("express");
const app = express();

app.set("view engine", "ejs");
var access_token = "";

app.get("/", (req, res) => {
  res.render("pages/index", { client_id: clientID });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Escucho por el puerto " + port));

// Importo la libreria de axios
const axios = require("axios");

// Clave Publica y Secreta (Pasar luego a variables de entorno)
const clientID = "54c0494d4c7c7cafcfb5";
const clientSecret = "7237cfaf348ea2d88008a6ad59f65df8e2503769";

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

app.get("/success", (req, res) => {
  axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      Authorization: "token " + access_token,
    },
  }).then((response) => {
    res.render("pages/success", { userData: response.data });
    console.log(response.data);
  });
});
