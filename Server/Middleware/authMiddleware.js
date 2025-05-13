const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  
  if (!authHeader) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  // Expected format: "Bearer <token>"
  const token = authHeader.split(" ")[1]; // this extracts the actual token
  
  if (!token) {
    return res.status(403).json({ message: "Access denied. Token missing in header." });
  }

  try {
    const decoded = jwt.verify(token, process.env.secrete_key);
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to next middleware or controller
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
}
};

module.exports = authenticateUser;