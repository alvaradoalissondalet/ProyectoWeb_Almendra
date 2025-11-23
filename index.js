const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware para leer JSON en requests tipo POST/PUT
app.use(express.json());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/Almendra")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Error al conectar MongoDB: chau es, hijita", err));

// Importar rutas
const nivelRoutes = require("./routes/NivelDificultadRoutes");
const rangoEdadRoutes = require("./routes/RangoEdadRoutes"); 
const categoriaRoutes = require("./routes/Categoria_SubcategoriasRoutes");

// Usar rutas
app.use("/api/niveles", nivelRoutes);
app.use("/api/rangos", rangoEdadRoutes); 
app.use("/api/categorias", categoriaRoutes);

// Inicializar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
