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

var xml2js = require('xml2js');
var request = require('request');
var aadutils = require('./aadutils');
var async = require('async');

var Metadata = function (url) {
  if(!url) {
    throw new Error("Metadata: url is a required argument");
  }
  this.url = url;
  this.metadata = null;
};

Object.defineProperty(Metadata, 'url', {
  get: function () {
    return this.url;
  }
});

Object.defineProperty(Metadata, 'oidc', {
  get: function () {
    return this.saml;
  }
});


Metadata.prototype.updateOIDCMetadata = function(doc, next) {
  try {
    this.odic = {};

    var issuer = aadutils.getElement(doc, 'EntityDescriptor');
    var token_endpoint = aadutils.getElement(entity, 'IDPSSODescriptor');
    var token_endpoint_auth_methods_supported = aadutils.getElement(entity, 'AuthMethodsSupported');
    var signOn = aadutils.getElement(idp[0], 'SingleSignOnService');
    var signOff = aadutils.getElement(idp[0], 'SingleLogoutService');
    var keyDescriptor = aadutils.getElement(idp[0], 'KeyDescriptor');
    this.odic.loginEndpoint = signOn[0].$.Location;
    this.oidc.logoutEndpoint = signOff[0].$.Location;

    // copy the x509 certs from the metadata
    this.odic.certs = []; // where we put certs
    for (var j=0;j<keyDescriptor.length;j++) {
      this.odic.certs.push(keyDescriptor[j].KeyInfo[0].X509Data[0].X509Certificate[0]);
    }
    next(null);
  } catch (e) {
    next(new Error('Invalid Open ID Connect Metadata' + e.message));
  }
};


Metadata.prototype.fetch = function(callback) {
  var self = this;

  async.waterfall([
    // fetch the metadata for the AAD tenant
    function(next){
      request(self.url, function (err, response, body) {
        if(err) {
          next(err);
        } else if(response.statusCode !== 200) {
          next(new Error("Error:" + response.statusCode +  " Cannot get AAD Federation metadata from " + self.url));
        } else {
          next(null, body);
        }
      });
    },
    function(body, next){
      // Note: xml responses from Azure AAD have a leading \ufeff which breaks xml2js parser!
      JSON.parse(body, function (err, data) {
        self.metatdata = data;
        next(err);

      });
    },
    function(next){
      // update the ODIC SSO endpoints and certs from the metadata
      self.updateODICMetadata(self.metatdata, next);
    },
  ], function (err) {
    // return err or success (err === null) to callback
    callback(err);
  });
};

exports.Metadata = Metadata;
