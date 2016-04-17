 // Don't commit this file to your public repos. This config is for first-run
 exports.creds = {
     mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
     issuer: 'https://sts.windows.net/519ea014-04c9-4839-9b4a-8a604aff827a',
     audience: 'urn:ietf:wg:oauth:2.0:oob',
     identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration' // For using Microsoft you should never need to change this.
 };
