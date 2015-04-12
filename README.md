#Windows Azure Active Directory Sample REST API Service for Node.js using MongoDB and Restify

This Node.js server will give you with a quick and easy way to set up a REST API Service that's integrated with Windows Azure Active Directory for API protection using the OAuth2 protocol using bearer tokens. The sample server included in the download are designed to run on any platform.

This REST API server is built using Restify and MongoDB with the following features:

* A node.js server running an REST API interface with JSON using MongoDB as persistent storage
* REST APIs leveraging OAuth2 API protection for endpoints using Windows Azure Active Directory

[Refer to our Wiki](https://github.com/AzureADSamples/WebAPI-Nodejs/wiki) for detailed walkthroughs on how to use this server.

We've released all of the source code for this example in GitHub under an Apache 2.0 license, so feel free to clone (or even better, fork!) and provide feedback on the forums.

## How to Use The Service

This is a simple TODO Server that takes JSON requests through REST and responds with the appropriate JSON objects.

#### To use this without Authentication (for testing the endpoints without Authentication)

	$ node server.js

	$ curl -isS http://127.0.0.1:8888 | json
	HTTP/1.1 200 OK
	Connection: close
	Content-Type: application/x-www-form-urlencoded
	Content-Length: 145
	Date: Wed, 29 Jan 2014 03:41:24 GMT

	[
  	"GET     /",
  	"POST    /tasks/:name/:task",
		"POST		 /tasks (for JSON body)",
  	"GET     /tasks",
  	"DELETE  /tasks",
  	"PUT     /tasks/:name",
  	"GET     /tasks/:name",
  	"DELETE  /tasks/:task"
	]

#### To invoke with OAuth2 Authentication (for use with Windows Azure AD)

	$ node server.js -m oauth2

## Quick Start

Getting started with the sample is easy. It is configured to run out of the box with minimal setup.

### Step 1: Register a Windows Azure AD Tenant

To use this sample you will need a Windows Azure Active Directory Tenant. If you're not sure what a tenant is or how you would get one, read [What is a Windows Azure AD tenant](http://technet.microsoft.com/library/jj573650.aspx)? or [Sign up for Windows Azure as an organization](http://azure.microsoft.com/en-us/documentation/articles/sign-up-organization/). These docs should get you started on your way to using Windows Azure AD.

### Step 2: Register your Web API with your Windows Azure AD Tenant

After you get your Windows Azure AD tenant, add this sample app to your tenant so you can use it to protect your API endpoints. If you need help with this step, see: [Register the REST API Service Windows Azure Active Directory](https://github.com/AzureADSamples/WebAPI-Nodejs/wiki/Setup-Windows-Azure-AD)

### Step 3: Download node.js for your platform
To successfully use this sample, you need a working installation of Node.js.

Install Node.js from [http://nodejs.org](http://nodejs.org).

### Step 4: Install MongoDB on to your platform

To successfully use this sample, you must have a working installation of MongoDB. We will use MongoDB to make our REST API persistant across server instances.

Install MongoDB from [http://mongodb.org](http://www.mongodb.org).

**NOTE:** This walkthrough assumes that you use the default installation and server endpoints for MongoDB, which at the time of this writing is: mongodb://localhost


### Step 5: Download the Sample application and modules

Next, clone the sample repo and install the NPM.

From your shell or command line:

* `$ git clone git@github.com:WindowsAzureAD/Azure-AD-TODO-Server-Sample-For-Node.git`
* `$ npm install`

### Step 6: Run the application


* `$ cd node-server	`
* `$ node server.js`


### Acknowledgements

We would like to acknowledge the folks who own/contribute to the following projects for their support of Windows Azure Active Directory and their libraries that were used to build this sample. In places where we forked these libraries to add additional functionality, we ensured that the chain of forking remains intact so you can navigate back to the original package. Working with such great partners in the open source community clearly illustrates what open collaboration can accomplish. Thank you!


- [MongoDB](http://www.mongodb.org) - MongoDB (from "humongous") is an open-source document database, and the leading NoSQL database. Written in C++
- [Restify](http://mcavage.me/node-restify/) - Restify is a node.js module built specifically to enable you to build correct REST web services. ``` node-restify```
- [Restify-OAuth2](https://github.com/domenic/restify-oauth2) - This package provides a very simple OAuth 2.0 endpoint for the Restify framework. ``` restify-oauth2```
- [node-jwt-simple](https://github.com/hokaccha/node-jwt-simple) - Library for parsing JSON Web Tokens (JWT) ```node-jwt-simple```




## About The Code

Code hosted on GitHub under Apache 2.0 license
