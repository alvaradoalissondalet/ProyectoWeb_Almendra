const express = require("express");
const mongoose = require("mongoose");
const passport = require("./auth/passport");

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Inicializar passport
app.use(passport.initialize());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/Almendra")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error al conectar MongoDB:", err));

// Importar todas las rutas
const authRoutes = require("./routes/AuthRoutes");
const nivelRoutes = require("./routes/NivelDificultadRoutes");
const rangoEdadRoutes = require("./routes/RangoEdadRoutes");
const categoriaRoutes = require("./routes/Categoria_SubcategoriasRoutes");
const rolRoutes = require("./routes/RolesRoutes");
const usuarioRoutes = require("./routes/UsuarioRoutes");

// Usar rutas
app.use("/api/auth", authRoutes);
app.use("/api/niveles", nivelRoutes);
app.use("/api/rangos", rangoEdadRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Inicializar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});