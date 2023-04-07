const { Router } = require("express");
const router = Router();
const {
  renderIndex,
  renderCallback,
  renderSuccess,
  renderUsers,
  renderStarRepo,
  renderRepos,
} = require("../controllers/index.controller");

// Ruta Inicial
router.get("/", renderIndex);

// Ruta Callback
router.get("/github/callback", renderCallback);

// Ruta Success
router.get("/success", renderSuccess);

// Ruta muestra todos los usuarios
router.get("/users", renderUsers);

// Ruta para colocar estrellas a un repo
router.put("/:owner/:repo", renderStarRepo);

router.get("/repos", renderRepos);

module.exports = router;
