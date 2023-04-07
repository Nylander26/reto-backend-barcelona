// Archivos requeridos
const axios = require("axios");
const User = require("../models/users");

// Otras Variables
const indexCtrl = {};
var access_token = "";

// Variables de entorno
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// Logica de pagina inicial
indexCtrl.renderIndex = (req, res) => {
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
    console.log(response.data);
  });
};

// Logica que muestra en caso de que la recoleccion de la data de Github sea exitosa
indexCtrl.renderSuccess = (req, res) => {
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
};

// Logica que muestra todos los usuarios registrados
indexCtrl.renderUsers = async (req, res) => {
  const userFinder = await User.find();
  res.render("users", { userFinder: userFinder });
};

// Logica para colocar estrella en un repositorio
indexCtrl.renderStarRepo = (req, res) => {
  axios({
    method: "put",
    url: `https://api.github.com/user/starred/nylander26/react-portfolio`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      accept: "application/vnd.github+json",
    },
  });
};

indexCtrl.renderRepos = (req, res) => {
    axios({
        method: "get",
        url: `https://api.github.com/users/Nylander26/repos`,
        headers: {
            Authorization: access_token
        }
    }).then((response) => {
        res.render('repos', { reposData: response })
        console.log(response.data);
    })
}

module.exports = indexCtrl;
