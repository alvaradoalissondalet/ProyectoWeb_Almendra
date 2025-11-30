const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "clave_secreta_almendra",
    { expiresIn: '30d' }
  );
};

exports.login = async (req, res) => {
  try {
    const { Correo, Password } = req.body;

    // Verificar correo y contra
    if (!Correo || !Password) {
      return res.status(400).json({
        message: 'Por favor proporciona correo y contraseña'
      });
    }

    //Verificar si es iwal
    const user = await Usuario.findOne({ Correo }).populate('id_Rol');
    
    if (!user || !(await user.correctPassword(Password, user.Password))) {
      return res.status(401).json({
        message: 'Correo o contraseña incorrectos'
      });
    }

    //Enviar token
    const token = signToken(user._id, user.id_Rol.NombreRol);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          NombreUsuario: user.NombreUsuario,
          Correo: user.Correo,
          rol: user.id_Rol.NombreRol
        }
      }
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    //Obtener token y verificar si existe
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        message: 'Por favor inicia sesion para obtener acceso.'
      });
    }

    //Verificar token
    const decoded = await promisify(jwt.verify)(
      token, 
      process.env.JWT_SECRET || "clave_secreta_almendra"
    );

    //Verificar si el usuario existe
    const currentUser = await Usuario.findById(decoded.id).populate('id_Rol');
    if (!currentUser) {
      return res.status(401).json({
        message: 'El usuario de este token ya no existe.'
      });
    }

    //Guardar usuario en req object
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Token invalido o expirado.'
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.id_Rol.NombreRol)) {
      return res.status(403).json({
        message: 'No tienes permiso para realizar esta accion'
      });
    }
    next();
  };
};