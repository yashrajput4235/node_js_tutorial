const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
const jwtAuthMiddleware = (req, res, next) => {
    // first check request header has authorization or not
    const authorization=req.header.authorization;
    if(!authorization) return res.status(400).json({error:'Invalid'});
    // Extract the JWT token from the Authorization header
    const token =  req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the decoded information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate JWT tokens
const generateToken = (userData) => {
    // Generate a new JWT token using user data, with an expiration time of 1 hour
    return jwt.sign(userData, process.env.JWT_SECRET,{expiryIn:30});
};

module.exports = { jwtAuthMiddleware, generateToken };
