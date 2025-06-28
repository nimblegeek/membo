const { auth } = require('express-oauth2-jwt-bearer');

// Auth0 middleware configuration
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

// Middleware to extract user info from Auth0 token
const extractUser = (req, res, next) => {
  if (req.auth && req.auth.payload) {
    req.user = {
      id: req.auth.payload.sub,
      email: req.auth.payload['https://membo.com/email'] || req.auth.payload.email,
      name: req.auth.payload['https://membo.com/name'] || req.auth.payload.name,
      role: req.auth.payload['https://membo.com/roles'] || 'member'
    };
  }
  next();
};

module.exports = { checkJwt, extractUser }; 