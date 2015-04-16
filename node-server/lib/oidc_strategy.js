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

'use strict';

var pem = require('./pem');
var Metadata = require('./metadata').Metadata;
var zlib = require('zlib');
var xml2js = require('xml2js');
var xmlCrypto = require('xml-crypto');
var crypto = require('crypto');
var xmldom = require('xmldom');
var querystring = require('querystring');
var async = require('async');
var jwt = require('jsonwebtoken')
var util = require('util');
var BearerStrategy = require('passport-http-bearer').Strategy


function Strategy(options, verify) {

  this.name = 'oidc-bearer'; // What we call ourselves for callbacks.

  // Ensure we've been based a key.


  if (typeof options == 'function') {
    verify = options;
    options = {};
  }

  // Passport requires a verify function

  if (!verify) {
    throw new TypeError('OIDCBearerStrategy requires a verify callback');
  }

  if (!options.protocol) {
    options.protocol = 'https://';
  }

  // You can provide your own cert if you don't want to use Azure AD's certificate from our Identity servers (just in case you're using this for your own things!)

  if(options.publicCert) {
    options.certificate = pem.getCertificate(options.publicCert);
  } else {
    options.certificate = '';
  }

  // Otherwise we do the work for you and pull the certs out of a JSON metadata endpoint. 

  if(options.metadataurl) {
    options.certificate = metadata(options.metadataurl);
  } else {
    options.certificate = '';
  }

  // if (!secretOrPublicKey || (typeof secretOrPublicKey != 'string' && !(secretOrPublicKey instanceof Buffer))) {
  //   throw new TypeError('OIDCBearerStrategy requires a string or buffer containing either the secret for HMAC algorithms, or the PEM encoded public key for RSA and ECDSA callback');
  // }

  // Done with options

  // Pull the certificate from URL

  //


  var strategy = this;

  function jwtVerify(req, token, done) {
    if (!options.passReqToCallback) {
      token = arguments[0];
      done = arguments[1];
      req = null;
    }
    jwt.verify(token, options.certificate, {algorithms: ["RS256"]}, function (err, token) {
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


}
/**
 * Inherit from `BearerStrategy`.
 */
util.inherits(Strategy, BearerStrategy);

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
