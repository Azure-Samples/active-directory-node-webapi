 // Don't commit this file to your public repos. This config is for first-run
    exports.creds = {
    mongoose_auth_local: 'mongodb://localhost/tasklist', // Your mongo auth uri goes here
    openid_configuration: 'https://login.microsoftonline.com/hypercubeb2c.onmicrosoft.com/.well-known/openid-configuration?p=b2c_1_B2CSI', // For using Microsoft you should never need to change this.
    openid_keys: 'https://login.microsoftonline.com/common/discovery/keys' // For using Microsoft you should never need to change this. If asbsent will attempt to get from openid_configuration
}
