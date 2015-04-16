/*
 Copyright (c) Microsoft Open Technologies, Inc.
 All Rights Reserved
 Apache License 2.0

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

"use strict";
var BearerStrategy = require('passport-http-bearer').Strategy
  , jwt = require('jsonwebtoken')
  , util = require('util');

function Strategy(secretOrPublicKey, options, verify) {
  if (!secretOrPublicKey || (typeof secretOrPublicKey != 'string' && !(secretOrPublicKey instanceof Buffer))) {
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
    jwt.verify(token, secretOrPublicKey, {algorithms: ["RS256"]}, function (err, token) {
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
