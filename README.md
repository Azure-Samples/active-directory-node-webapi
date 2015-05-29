#Windows Azure Active Directory Sample REST API Service for Node.js using MongoDB and Restify

<<<<<<< HEAD
This Node.js server will give you with a quick and easy way to set up a REST API Service that's integrated with Azure Active Directory for API protection. It uses the OAuth2 protocol with bearer tokens. The sample server included in the download are designed to run on any platform.
=======
[![Join the chat at https://gitter.im/AzureADSamples/WebAPI-Nodejs](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AzureADSamples/WebAPI-Nodejs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This Node.js server will give you with a quick and easy way to set up a REST API Service that's integrated with Windows Azure Active Directory for API protection using the OAuth2 protocol. The sample server included in the download are designed to run on any platform.
>>>>>>> master

This REST API server is built using Restify and MongoDB with the following features:

* A node.js server running an REST API interface with JSON using MongoDB as persistent storage
* REST APIs leveraging OAuth2 API protection for endpoints using Windows Azure Active Directory

We've released all of the source code for this example in GitHub under an Apache 2.0 license, so feel free to clone (or even better, fork!) and provide feedback on the forums.


## Quick Start

Getting started with the sample is easy. It is configured to run out of the box with minimal setup.

### Step 1: Register a Windows Azure AD Tenant

To use this sample you will need a Windows Azure Active Directory Tenant. If you're not sure what a tenant is or how you would get one, read [What is an Azure AD tenant](http://technet.microsoft.com/library/jj573650.aspx)? or [Sign up for Azure as an organization](http://azure.microsoft.com/en-us/documentation/articles/sign-up-organization/). These docs should get you started on your way to using Windows Azure AD.

### Step 2: Register your Web API with your Windows Azure AD Tenant

After you get your Windows Azure AD tenant, add this sample app to your tenant so you can use it to protect your API endpoints. If you need help with this step, see: [Register the REST API Service Windows Azure Active Directory](https://github.com/AzureADSamples/WebAPI-Nodejs/wiki/Setup-Windows-Azure-AD)

### Step 3: Download node.js for your platform
To successfully use this sample, you need a working installation of Node.js.

Install Node.js from [http://nodejs.org](http://nodejs.org).

### Step 4: Install MongoDB on to your platform

To successfully use this sample, you must have a working installation of MongoDB. We will use MongoDB to make our REST API persistent across server instances.

Install MongoDB from [http://mongodb.org](http://www.mongodb.org).

**NOTE:** This walkthrough assumes that you use the default installation and server endpoints for MongoDB, which at the time of this writing is: mongodb://localhost. This should work locally without any configuration changes if you run this sample on the same machine as you've installed and ran mongodb.


### Step 5: Download the Sample application and modules

Next, clone the sample repo and install the NPM.

From your shell or command line:

* `$ git clone git@github.com:AzureADSamples/WebAPI-Nodejs.git`
* `$ npm install`

**Did you get an error?:** Restify provides a powerful mechanism to trace REST calls using DTrace. However, many operating systems do not have DTrace available. You can safely ignore these errors.

* `$ cd node-server`
* `$ npm install` (yes, again)

### Step 6: Configure your server using config.js

You will need to update the sample to use your values for audienceURI and for the metadata endpoint.

**NOTE:** You may also pass the `issuer:` value if you wish to validate that as well.

### Step 7: Run the application


* `$ cd node-server	`
* `$ node server.js`

**Is the server output hard to understand?:** We use `bunyan` for logging in this sample. The console won't make much sense to you unless you also install bunyan and run the server like above but pipe it through the bunyan binary:

* `$ node server.js | bunyan`

### Your done!

You will have a server successfully running on `http://localhost:8888`. Your REST / JSON API Endpoint will be `http://localhost:8888/tasks`

### Acknowledgements

We would like to acknowledge the folks who own/contribute to the following projects for their support of Windows Azure Active Directory and their libraries that were used to build this sample. In places where we forked these libraries to add additional functionality, we ensured that the chain of forking remains intact so you can navigate back to the original package. Working with such great partners in the open source community clearly illustrates what open collaboration can accomplish. Thank you!


- [MongoDB](http://www.mongodb.org) - MongoDB (from "humongous") is an open-source document database, and the leading NoSQL database. Written in C++
- [Restify](http://mcavage.me/node-restify/) - Restify is a node.js module built specifically to enable you to build correct REST web services. ``` node-restify```
- [Restify-OAuth2](https://github.com/domenic/restify-oauth2) - This package provides a very simple OAuth 2.0 endpoint for the Restify framework. ``` restify-oauth2```
- [node-jwt-simple](https://github.com/hokaccha/node-jwt-simple) - Library for parsing JSON Web Tokens (JWT) ```node-jwt-simple```
- [http-bearer-strategy](https://github.com/jaredhanson/passport-http-bearer) - HTTP Bearer authentication strategy for Passport and Node.js.




## About The Code

Code hosted on GitHub under Apache 2.0 license
