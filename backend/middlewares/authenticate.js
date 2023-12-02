const jwt = require('jsonwebtoken');
const User  = require('../models/User');

const authenticate = async (req, res, next) => {
    try {
        // Check if the request contains a token in the 'token' cookie
        const token = req.cookies.token;
        // console.log(token)
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);

        // Retrieve the user associated with the token from the database
        const user = await User.findById(decoded.id);

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }

        // Attach the user object to the request for further use in route handlers
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = authenticate;
