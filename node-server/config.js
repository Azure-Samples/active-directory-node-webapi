 // Don't commit this file to your public repos. This config is for first-run
 exports.creds = {
     mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
     identityMetadata: 'https://login.microsoftonline.com/cff56d8f-f602-4afd-94e4-c95b76f1c81e/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
     validateIssuer: false, // if you have validation on, you cannot have users from multiple tenants sign in
 	passReqToCallback: false,
 	loggingLevel: 'info' // valid are 'info', 'warn', 'error'. Error always goes to stderr in Unix.
 };
