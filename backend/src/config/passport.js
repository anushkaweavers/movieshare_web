const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (!payload || payload.type !== tokenTypes.ACCESS) {
      return done(null, false, { message: 'Invalid token type' });
    }
    const user = await User.findById(payload.userId); // Use userId instead of sub
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

// ✅ Ensure the export is correct
const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy, // This should match what is imported in `app.js`
};
