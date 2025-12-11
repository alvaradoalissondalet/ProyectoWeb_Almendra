const https = require("https");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./auth/passport");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(passport.initialize());

mongoose.connect("mongodb://localhost:27017/Almendra")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error MongoDB:", err));

const authRoutes = require("./routes/AuthRoutes");
const nivelRoutes = require("./routes/NivelDificultadRoutes");
const rangoEdadRoutes = require("./routes/RangoEdadRoutes");
const categoriaRoutes = require("./routes/Categoria_SubcategoriasRoutes");
const rolRoutes = require("./routes/RolesRoutes");
const usuarioRoutes = require("./routes/UsuarioRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/niveles", nivelRoutes);
app.use("/api/rangos", rangoEdadRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/roles", rolRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.get("/", (req, res) => {
  res.json({ 
    message: "API Almendra - HTTPS (HTTP/1.1)",
    protocol: "HTTPS/1.1",
    port: 3002,
    secure: true,
    note: "HTTP/1.1 con cifrado SSL"
  });
});

// CONFIGURACIÓN HTTPS
const options = {
  key: fs.readFileSync("./certificados/server.key"),
  cert: fs.readFileSync("./certificados/server.crt")
};

https.createServer(options, app).listen(3002, () => {
  console.log("HTTPS server (HTTP/1.1): https://localhost:3002");
  console.log("Certificado autofirmado - Ignorar advertencia en navegador");
});