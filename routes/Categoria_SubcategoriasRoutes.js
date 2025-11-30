const express = require("express");
const router = express.Router();
const controller = require("../controllers/Categoria_SubcategoriasControlador");
const authController = require("../controllers/AuthControlador");
const { isAdmin } = require("../auth/roles");

// Aplicar JWT
router.use(authController.protect);

router.get("/",  authController.restrictTo('Administrador'), controller.list);
router.get("/:id",  authController.restrictTo('Administrador'), controller.detail);
router.post("/", authController.restrictTo('administrador'), controller.create);
router.put("/:id", authController.restrictTo('administrador'), controller.update);
router.delete("/:id", authController.restrictTo('administrador'), controller.remove);
router.post("/:id/subcategorias", authController.restrictTo('administrador'), controller.addSubcategoria);
router.delete("/:id/subcategorias/:subId", authController.restrictTo('administrador'), controller.removeSubcategoria);

module.exports = router;