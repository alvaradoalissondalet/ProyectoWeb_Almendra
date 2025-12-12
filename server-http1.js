const express = require("express");
const mongoose = require("mongoose");
const passport = require("./auth/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Conectar MongoDB
mongoose.connect("mongodb://localhost:27017/Almendra")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error MongoDB:", err));

// Importar rutas
const authRoutes = require("./routes/AuthRoutes");
const nivelRoutes = require("./routes/NivelDificultadRoutes");
const rangoEdadRoutes = require("./routes/RangoEdadRoutes");
const categoriaRoutes = require("./routes/Categoria_SubcategoriasRoutes");
const rolRoutes = require("./routes/RolesRoutes");
const usuarioRoutes = require("./routes/UsuarioRoutes");

//rutas
app.use("/api/auth", authRoutes);
app.use("/api/niveles", nivelRoutes);
app.use("/api/rangos", rangoEdadRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/usuarios", usuarioRoutes);

//prueba
app.get("/", (req, res) => {
  res.json({ 
    message: "API Almendra - HTTP/1.1",
    protocol: "HTTP/1.1",
    port: 3000,
    endpoints: {
      auth: "/api/auth/login",
      categorias: "/api/categorias",
      usuarios: "/api/usuarios"
    }
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("HTTP/1.1 server corriendo en: http://localhost:3000");
});