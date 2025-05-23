const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado" });
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_JWT);
        
        if (verified.role !== 1) {
            return res.status(403).json({ message: "No tienes permisos de administrador" });
        }

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token inválido" });
    }
};

module.exports = verifyAdmin;