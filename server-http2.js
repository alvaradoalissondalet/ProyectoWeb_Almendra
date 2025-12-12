const http2 = require('http2');
const express = require("express");
const mongoose = require("mongoose");
const passport = require("./auth/passport");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(passport.initialize());

mongoose.connect("mongodb://localhost:27017/Almendra")   //Cambiar puerto si es necesario
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
  const isHTTP2 = req.httpVersion === "2.0";
  res.json({ 
    message: "API Almendra - HTTP/2 + SSL",
    protocol: isHTTP2 ? "HTTP/2" : "HTTP/1.1",
    httpVersion: req.httpVersion,
    port: 3001,
    secure: true,
    features: isHTTP2 ? ["Multiplexing", "Header Compression", "TLS"] : ["TLS"]
  });
});

// VERIFICAR CERTIFICADOS
try {
  fs.readFileSync("./certificados/server.key");     //INGRESAR RUTAS DE CERTIFICADO
  fs.readFileSync("./certificados/server.crt");    // INGRESAR RUTA DE CERTIFICADO
  console.log("Certificados SSL encontrados");
} catch (err) {
  console.error("ERROR: No se encuentran server.key y server.crt en ./certificados/");
  process.exit(1);
}

// CONFIGURACIÓN HTTP/2 + SSL
const options = {
  key: fs.readFileSync("./certificados/server.key"),
  cert: fs.readFileSync("./certificados/server.crt"),
  allowHTTP1: true // Permite conexiones HTTP/1.1 también
};

const server = http2.createSecureServer(options, app);

server.listen(3001, () => {
  console.log("HTTP/2 + SSL server: https://localhost:3001");
  console.log("Navegadores usarán HTTP/2 automáticamente");
});