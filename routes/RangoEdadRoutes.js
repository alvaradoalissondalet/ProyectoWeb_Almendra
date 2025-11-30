const express = require("express");
const router = express.Router();
const controller = require("../controllers/RangoEdadControlador");
const authController = require("../controllers/AuthControlador");

router.use(authController.protect);

router.get("/", authController.restrictTo('Administrador'), controller.list);
router.get("/:id", authController.restrictTo('Administrador'), controller.detail);
router.post("/", authController.restrictTo('Administrador'), controller.create);
router.put("/:id", authController.restrictTo('Administrador'), controller.update);
router.delete("/:id", authController.restrictTo('Administrador'), controller.remove);

module.exports = router;
