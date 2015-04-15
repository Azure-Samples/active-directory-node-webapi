"use strict";
var BearerStrategy = require('passport-http-bearer').Strategy
  , jwt = require('jsonwebtoken')
  , util = require('util');

/**
 * Creates an instance of `Strategy`.
 *
 * The HTTP JWT Bearer authentication strategy authenticates requests based on
 * a JWT encoded ans signed bearer token contained in the `Authorization`
 * header field, `access_token` body parameter, or `access_token` query
 * parameter.
 *
 * Application must supply either the secret for HMAC algorithms, or the PEM
 * encoded public key for RSA and ECDSA algorithms.
 *
 * Applications must supply a `verify` callback, for which the function
 * signature is:
 *
 *     function(token, done) { ... }
 *
 * `token` is the verified and decoded bearer token provided as a credential.
 * The verify callback is responsible for finding the user who posesses the
 * token, and invoking `done` with the following arguments:
 *
 *     done(err, user, info);
 *
 * If the token is not valid, `user` should be set to `false` to indicate an
 * authentication failure.  Additional token `info` can optionally be passed as
 * a third argument, which will be set by Passport at `req.authInfo`, where it
 * can be used by later middleware for access control.  This is typically used
 * to pass any scope associated with the token.
 *
 * Options:
 *
 *   - `realm`    authentication realm, defaults to "Users"
 *   - `scope`    list of scope values indicating the required scope of the
 *                access token for accessing the requested resource
 *   - `audience` if you want to check JWT audience (aud), provide a value here
 *   - `issuer`   if you want to check JWT issuer (iss), provide a value here

 *
 * Examples:
 *
 *     passport.use(new JwtBearerStrategy(
 *       secretOrPublicKey
 *       function(token, done) {
 *         User.findById(token.sub, function (err, user) {
 *           if (err) { return done(err); }
 *           if (!user) { return done(null, false); }
 *           return done(null, user, token);
 *         });
 *       }
 *     ));
 *
 * For further details on HTTP Bearer authentication, refer to [The OAuth 2.0 Authorization Protocol: Bearer Tokens](http://tools.ietf.org/html/draft-ietf-oauth-v2-bearer)
 * For further details on JSON Web Token, refert to [JSON Web Token](http://tools.ietf.org/html/draft-ietf-oauth-json-web-token)
 *
 * @param {string|Buffer} secretOrPublicKey - A string or buffer containing
 *   either the secret for HMAC algorithms, or the PEM encoded public key for
 *   RSA and ECDSA algorithms.
 * @param {object} options - The Options.
 * @param {Function} verify - The verify callback.
 * @constructor
 */
function Strategy(secretOrPublicKey, options, verify) {
  if (!secretOrPublicKey || (typeof secretOrPublicKey != 'string' && !(secretOrPublicKey instanceof Buffer))) {
    console.log(secretOrPublicKey);
    throw new TypeError('JwtBearerStrategy requires a string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA callback');
  }
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) {
    throw new TypeError('JwtBearerStrategy requires a verify callback');
  }

  var strategy = this;

  function jwtVerify(req, token, done) {
    if (!options.passReqToCallback) {
      token = arguments[0];
      done = arguments[1];
      req = null;
    }
    jwt.verify(token, secretOrPublicKey, options, function (err, token) {
      if (err) {
        if (err instanceof jwt.TokenExpiredError) {
          done(null, false, 'The access token expired');
        }
        else if (err instanceof jwt.JsonWebTokenError) {
          console.log(err.message)
          done(null, false, util.format('Invalid token (%s)', err.message));
        }
        else {
          done(err, false);
        }
      } else {
        if (options.passReqToCallback) {
          verify(req, token, done);
        } else {
          verify(token, done);
        }
      }
    });
  }
  BearerStrategy.call(this, options, jwtVerify);

  this.name = 'jwt-bearer';
}
/**
 * Inherit from `HTTPBearerStrategy`.
 */
util.inherits(Strategy, BearerStrategy);

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
