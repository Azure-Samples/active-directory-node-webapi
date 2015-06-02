 // Don't commit this file to your public repos. This config is for first-run
    exports.creds = {
    mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
    audience: 'http://localhost:8888/', // the Audience is the App URL when you registered the application.
    identityMetadata: 'https://login.microsoftonline.com/common/' // Replace the text after p= with your specific policy.
  };
