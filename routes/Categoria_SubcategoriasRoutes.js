const express = require("express");
const router = express.Router();
const controller = require("../controllers/Categoria_SubcategoriasControlador");

// Categorías
router.get("/", controller.list);
router.get("/:id", controller.detail);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

// Subcategorías
router.post("/:id/subcategorias", controller.addSubcategoria);
router.delete("/:id/subcategorias/:subId", controller.removeSubcategoria);

module.exports = router;
