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

var bunyan = require('bunyan');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy
var util = require('util');
var pem = require('./pem');
var crypto = require('crypto');
var querystring = require('querystring');
var async = require('async');
var jwt = require('jsonwebtoken');
var request = require('request');
var Metadata = require('./metadata').Metadata;

var log = bunyan.createLogger({name: 'Microsoft OpenID Connect Passport Strategy'});

function Strategy(options, callback, verify) {

// You can provide your own cert if you don't want to use Azure AD's certificate from our Identity servers (just in case you're using this for your own things!)

if(options.publicCert) {
  options.certificate = pem.getCertificate(options.publicCert);
}

if(options.metadataurl) {

  log.info(options.metadataurl, 'metadata url provided to Strategy');
  this.metadata = new Metadata(options.metadataurl, "odic");
}

if (!options.certificate && !options.metadataurl) {
  log.warn("No options was presented to Strategy as required.")
   throw new TypeError('OIDCBearerStrategy requires either a PEM encoded public key or a metadata location that contains cert data for RSA and ECDSA callback.');
 }


if (typeof callback == 'function') {
   verify = callback;
//   callback = {};
 }

    // Passport requires a verify function

    if (!verify) {
      throw new TypeError('OIDCBearerStrategy requires a verify callback. Do not cheat!');
    }

    this.metadata.fetch(callback);
    log.info(this.metadata,'Metadata returned');

function requestToUrl(callback) {

  async.waterfall([
    function(next){
      if(!this.metadata.saml0) {
        this.metadata.fetch(next);
        } else {
          next(null);
        }
        target = "";
        console.log(this.metadata);
        }
      ], function (err, target) {
        return callback(err, target);
      });
    }









  function jwtVerify(req, token, done) {
  if (!options.passReqToCallback) {
    token = arguments[0];
    done = arguments[1];
    req = null;
  }

  requestToUrl(callback);
  //  return pem.certToPEM(cert);
  var PEMkey = "";

  jwt.verify(token, PEMkey, options, function (err, token) {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        log.warn('The access token provided to the server was expired');
        done(null, false, 'The access token expired');
      }
      else if (err instanceof jwt.JsonWebTokenError) {
        log.warn('Invalid token was provided to server: ' + err.message);
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

    this.name = 'oidc-bearer'; // Me, a name I call myself.
}

util.inherits(Strategy, BearerStrategy);
    /**
     * Expose `Strategy`.
     */
    module.exports = Strategy;
