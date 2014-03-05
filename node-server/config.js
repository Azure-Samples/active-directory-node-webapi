 // Don't commit this file to your public repos
    exports.creds = {
    mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
    token_endpoint: 'https://login.windows.net/xxxxxxxxxxxxxxxxx/oauth2/token',
    auth_endpoint: 'https://login.windows.net/xxxxxxxxxxxxxxxxx/oauth2/authorize',
    client_secret: '123', // this is the Secret you generated when configuring your Web API app on Azure AAD

    // required options
    federation_metadata: 'https://login.windows.net/xxxxxxxxxxxxxxxxx/FederationMetadata.xml', // this is the metadata URL from the AAD Portal
    loginCallback: 'http://localhost:8888', // this is the Callback URI you entered for APP ID URI when configuring your Web API app on Azure AAD
    issuer: 'http://localhost:8888',  // this is the URI you entered for APP ID URI when configuring your Web API app on Azure AAD
    client_id: 'xxxxxxxxxxxxxxxxx' // this is the Client ID you received after configuring your Web API app on Azure AAD
}