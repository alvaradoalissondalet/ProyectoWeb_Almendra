exports.hasRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autenticado" });
    }
    
    // Verificar rol
    if (!req.user.id_Rol || !roles.includes(req.user.id_Rol.NombreRol)) {
      return res.status(403).json({ 
        message: "Acceso no autorizado. Se requiere rol de administrador" 
      });
    }
    next();
  };
};
// Middleware
exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.id_Rol || req.user.id_Rol.NombreRol !== 'Administrador') {
    return res.status(403).json({ 
      message: "Acceso denegado. Se requiere rol de administrador" 
    });
  }
  next();
};