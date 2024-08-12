const jwt = require('jsonwebtoken');

const generateAuthToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY);
    return token;
};

const decodeToken = (token) => {
    if (!token) {
        throw new Error('No token provided'); 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return decoded;
    } catch (ex) {
        throw new Error('Invalid token or expired'); 
    }
};

const authenticate = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = decodeToken(token);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error('Token decoding error:', ex.message); 
        res.status(400).json({ message: ex.message }); 
    }
};

module.exports = {
    authenticate,
    generateAuthToken,
    decodeToken
};