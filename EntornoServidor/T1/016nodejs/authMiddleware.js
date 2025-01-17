const authMiddleware = (req, res, next) => {
    const password = req.headers['password'];
    if (password === 'patata') {
        res.status(200).send('Bienvenid@, disfrute del contenido');
    } else {
        res.status(401).json({
            error: 'Acceso restringido, por favor, incluya la palabra secreta en el parámetro \'password\' en la cabecera de la petición'
        });
    }
};

module.exports = authMiddleware;