const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middlewares/verifyAdmin");  // Importamos el middleware de validación
const validateJWT = require("../middlewares/validateJWT.middle");
const adminController = require("../controllers/admin.controller"); // Importamos el controlador

// Ruta protegida: Listar todos los usuarios (Solo Admin)
router.post("/usuarios", verifyAdmin, adminController.getAllUsers);

// Ruta protegida: Crear un nuevo producto (Solo Admin)
router.post("/productos", verifyAdmin, adminController.createProduct);

// Ruta protegida: Eliminar un producto por ID (Solo Admin)
router.delete("/productos/:id", verifyAdmin, adminController.deleteProduct);

module.exports = router;