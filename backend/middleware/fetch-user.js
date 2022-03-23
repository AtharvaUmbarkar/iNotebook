const jwt = require('jsonwebtoken');
const JWT_SECRET = "AtharavaUmbarkar20";

//* Get user from JWT token and add user-id to req
const fetchUser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) res.status(401).send({ error: "Please authenticate using a valid token" });

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user.id;
        next();
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Please authenticate using a valid token");
    }
}

module.exports.fetchUser = fetchUser;