const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid , name };
        
        

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            console.log('token',token);
            
            resolve(token);
        });
    });
};

const verifyJWT = (token) => {
    let data = null;

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT);
        
        data = { uid, name };
    } catch (error) {
        console.log(error);
        data = null;
        
    }
    return data;
};


module.exports = { 
    generateJWT,
    verifyJWT
}