const jwt = require('jsonwebtoken');
const secretKey="masai"
function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
      const tokenParts = token.split(' ');
      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid token format.' });
      }
      const decoded = jwt.verify(tokenParts[1], secretKey);
      req.user = decoded; 
      next(); 
    } catch (error) {
      res.status(400).json({ error: 'Invalid token.' });
    }
  }
  
  module.exports = { authenticateUser };
  