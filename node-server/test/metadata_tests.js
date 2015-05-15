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

var Metadata = require('../lib/metadata').Metadata;

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var wsfed_metadataUrl = 'https://login.windows.net/GraphDir1.OnMicrosoft.com/federationmetadata/2007-06/federationmetadata.xml';
var oidc_metadataUrl = 'https://login.microsoftonline.com/common/.well-known/openid-configuration';

exports['metadata'] = {

  'metadata has correct URL and option': function(test) {
    test.expect(1);
    // tests here

    test.doesNotThrow(
      function() {
        new Metadata(wsfed_metadataUrl, 'wsfed');
      },
      Error,
      'Metadata method should not fail with url present'
    );

    test.done();
  },
  'missing URL': function(test) {
    test.expect(1);
    // tests here

    test.throws(
      function() {
        new Metadata();
      },
      Error,
      'Metadata method should fail when url not present'
    );

    test.done();
  },

  'missing option': function(test) {
    test.expect(1);
    // tests here

    test.throws(
      function() {
        new Metadata(wsfed_metadataUrl);
      },
      Error,
      'Metadata method should fail when url not present'
    );

    test.done();
  },

  'fetch metadata for WSFed and SAML': function(test) {
    test.expect(7);
    // tests here

    test.doesNotThrow(
      function() {
        var m = new Metadata(wsfed_metadataUrl, "wsfed"); // either wsfed or saml works here. It just indicates to parse XML vs. JSON
        m.fetch(function(err) {
          test.ifError(err, 'method had error before testing properties');
          test.ok(m.saml.certs.length > 0, 'fetch should obtain 1 or more saml x509 certificates');
          test.ok(m.saml.loginEndpoint, 'fetch should obtain saml login endpoint');
          test.ok(m.saml.logoutEndpoint, 'fetch should obtain saml logout endpoint');
          test.ok(m.wsfed.certs.length > 0, 'fetch should obtain 1 or more wsfed x509 certificates');
          test.ok(m.wsfed.loginEndpoint, 'fetch should obtain wsfedlogin endpoint');
        });
      },
      Error,
      'WSFed and SAML should not fail with url present'
    );
    test.done();
  },

  'fetch metadata for OIDC': function(test) {
    test.expect(7);
    // tests here

    test.doesNotThrow(
      function() {
        var m = new Metadata(oidc_metadataUrl, "oidc"); // this indicates to parse JSON vs. XML
        m.fetch(function(err) {
          test.ifError(err, 'method had error before testing properties');
          test.ok(m.oidc.algorithm, 'fetch should obtain odic algorithm');
          test.ok(m.oidc.keyURL, 'fetch should obtain odic Key URL');
        });
      },
      Error,
      'Open ID Connect should not fail with url present'
    );
    test.done();
  }
};
