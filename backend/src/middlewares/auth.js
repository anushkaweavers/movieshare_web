const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err) {
    console.error("❌ Authentication Error:", err);
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication error.'));
  }

  if (!user) {
    console.error("🔴 Invalid Token or Session Expired:", info?.message || "No user found.");
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token or session expired.'));
  }

  req.user = user; // Attach user to request object

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role) || [];
    const hasRequiredRights = requiredRights.every((right) => userRights.includes(right));

    if (!hasRequiredRights && req.params.userId !== String(user.id || user._id)) {
      console.warn("⚠️ Access Denied - Insufficient Permissions:", { userRole: user.role, requiredRights });
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden - Insufficient permissions.'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => {
      console.log("✅ Authentication Successful - User:", req.user);
      next();
    })
    .catch((err) => {
      console.error("❌ Authentication Middleware Error:", err.message);
      next(err);
    });
};

module.exports = auth;
