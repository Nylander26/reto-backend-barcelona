// Archivos requeridos
const axios = require("axios");
const User = require("../models/users");

// Otras Variables
const indexCtrl = {};
let access_token = "";
let username = "";
var repo = [];

// Variables de entorno
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Logica de pagina inicial
indexCtrl.renderIndex = (req, res) => {
  access_token = "";
  repo = [];
  res.render("index", { client_id: clientID });
};

// Logica que maneja la data enviada a Github al igual que la respuesta
indexCtrl.renderCallback = (req, res) => {
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
    res.redirect("/success");
  });
};

// Logica que muestra en caso de que la recoleccion de la data de Github sea exitosa
indexCtrl.renderSuccess = (req, res) => {
  if (access_token === "") {
    res.render("not_found_success");
  } else {
    axios({
      method: "get",
      url: `https://api.github.com/user`,
      headers: {
        Authorization: "token " + access_token,
      },
    }).then((response) => {
      const { login, id, avatar_url, html_url, repos_url } = response.data;
      const searcher = async () => {
        const search = await User.find({ id: response.data.id });
        username = response.data.login;

        if (search[0]?.id === undefined) {
          const newUser = new User({
            access_token,
            login,
            id,
            avatar_url,
            html_url,
            repos_url,
          });
          newUser.save();
          res.render("success", { userData: response.data });
        } else {
          res.render("success", { userData: response.data });
        }
      };
      searcher();
    });
  }
};

// Logica que muestra todos los usuarios registrados
indexCtrl.renderUsers = async (req, res) => {
  if(access_token === ""){
    res.render("not_found_users");
  } else {
    const userFinder = await User.find();
    res.render("users", { userFinder: userFinder });
  }
};

// Logica que busca y renderiza los repositorios
indexCtrl.renderRepos = (req, res) => {
  if (access_token === ""){
    res.render("not_found_success")
  } else {
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
      headers: {
        Authorization: access_token,
      },
    }).then((response) => {
      res.render("repos", { reposData: response.data });
      response.data.forEach(function (el) {
        repo.push(el.name);
      });
      console.log(access_token);
    });
  }
};

// Logica para colocar estrella en un repositorio
indexCtrl.renderStarRepo = (req, res) => {
  axios({
    method: "put",
    url: `https://api.github.com/user/starred/${username}/${repo}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      accept: "application/vnd.github+json",
      "Content-Length": "0",
    },
  }).then((response) => {
    res.send("Estrella añadida");
  });
};

module.exports = indexCtrl;
