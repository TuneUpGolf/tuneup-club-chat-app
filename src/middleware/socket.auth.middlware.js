const jwt = require("jsonwebtoken");
const { config } = require("@config/index");
const { userFind } = require("@services/user.services");

/**
 * Verifies the JWT token included in the socket handshake query.
 * 
 * @param {Object} socket - The socket object.
 * @param {Function} next - The next function to call in the middleware chain.
 * @returns {null} - Returns null.
 * @throws {Error} - Throws an error if authentication fails.
 */
const verifyJWT = async (socket, next) => {
  try {
    const {token, isGuest} = socket.handshake.query;
    // Check if isGuest is true, proceed without token verification
    if(isGuest?.toString() ==='true'){
      next();   // Continue to the next middleware or route handler
    }else{
      if (!token) {
        return next(new Error("Unauthorized"));
      }
      const decoded = jwt.verify(token, config.secret);
      const { uuid } = decoded;
      const userResponse = await userFind({ uuid });
      if (!userResponse) {
        return next(new Error("Unauthorized"));
      }
      socket.userId = userResponse.userId;
      next();
    }
  } catch (err) {
    next(new Error("Failed to authenticate token"));
  }
  return null;
};

module.exports = verifyJWT;
