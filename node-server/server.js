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

    /**
    * Module dependencies.
    */

    var fs = require('fs');
    var path = require('path');
    var util = require('util');
    var assert = require('assert-plus');
    var bunyan = require('bunyan');
    var getopt = require('posix-getopt');
    var restify = require('restify');
    var getopt = require('posix-getopt');
    var config = require('./config');

    // array to hold logged in users
    var users = [];

    // Our logger
    var log = bunyan.createLogger({name: 'Windows Azure Active Directory Tutorial'});
/**
* Load Passport for OAuth2 flows
*/

 var passport = require('passport')
  , OIDCBearerStrategy = require('./lib/oidc_strategy');



try { // MongoDB setup

/**
* Setup some configuration
*/
var mongoose = require('mongoose/');
var serverPort = process.env.PORT || 8888;
var serverURI = ( process.env.PORT ) ? config.creds.mongoose_auth_mongohq : config.creds.mongoose_auth_local;


/**
*
* Connect to MongoDB
*/

global.db = mongoose.connect(serverURI);
var Schema = mongoose.Schema;
log.info('MongoDB Schema loaded');


/**
/ Here we create a schema to store our tasks and users. Pretty simple schema for now.
*/

var TaskSchema = new Schema({
  owner: String,
  task: String,
  completed: Boolean,
  date: Date
});


// Use the schema to register a model

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

}

catch(err) {

log.warn("MongoDB error. Did you intall MongoDB?" + err);

}

/**
 *
 * APIs
 */

function createTask(req, res, next) {

    // Resitify currently has a bug which doesn't allow you to set default headers
    // This headers comply with CORS and allow us to mongodbServer our response to any origin

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

    // Create a new task model, fill it up and save it to Mongodb
  var _task = new Task();

  if (!req.params.task) {
          req.log.warn({params: p}, 'createTodo: missing task');
          next(new MissingTaskError());
          return;
      }

        if (Task.find(req.params.task)) {
                req.log.warn('%s already exists', req.params.task);
                next(new TaskExistsError(req.params.task));
                return;
        }


  _task.owner = req.params.owner;
   _task.task = req.params.task;
   _task.date = new Date();

  _task.save(function (err) {
    if (err) {
        req.log.warn(err, 'createTask: unable to save');
        next(err);
    } else {
    res.send(201, _task);

            }
  });

  return next();

}


/**
 * Deletes a Task by name
 */
function removeTask(req, res, next) {

        Task.remove( { task:req.params.task }, function (err) {
                if (err) {
                        req.log.warn(err,
                                     'removeTask: unable to delete %s',
                                     req.params.task);
                        next(err);
                } else {
                        res.send(204);
                        next();
                }
        });
}

/**
 * Deletes all Tasks. A wipe
 */
function removeAll(req, res, next) {
        Task.remove();
        res.send(204);
        return next();
}


/**
 *
 *
 *
 */
function getTask(req, res, next) {


        Task.find(req.params.owner, function (err, data) {
                if (err) {
                        req.log.warn(err, 'get: unable to read %s', req.params.owner);
                        next(err);
                        return;
                }

                res.json(data);
        });

        return next();
}


/**
 * Simple returns the list of TODOs that were loaded.
 *
 */

function listTasks(req, res, next) {
  // Resitify currently has a bug which doesn't allow you to set default headers
  // This headers comply with CORS and allow us to mongodbServer our response to any origin

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  log.info("server getTasks");

  Task.find().limit(20).sort('date').exec(function (err,data) {

    if (err)
      return next(err);

    if (data.length > 0) {
            log.info(data);
        }

    if (!data.length) {
            log.warn(err, "There is no tasks in the database. Did you initalize the database as stated in the README?");
        }

    else {

        res.json(data);

        }
  });

  return next();
}

///--- Errors for communicating something interesting back to the client

function MissingTaskError() {
        restify.RestError.call(this, {
                statusCode: 409,
                restCode: 'MissingTask',
                message: '"task" is a required parameter',
                constructorOpt: MissingTaskError
        });

        this.name = 'MissingTaskError';
}
util.inherits(MissingTaskError, restify.RestError);


function TaskExistsError(owner) {
        assert.string(owner, 'owner');

        restify.RestError.call(this, {
                statusCode: 409,
                restCode: 'TaskExists',
                message: owner + ' already exists',
                constructorOpt: TaskExistsError
        });

        this.name = 'TaskExistsError';
}
util.inherits(TaskExistsError, restify.RestError);


function TaskNotFoundError(owner) {
        assert.string(owner, 'owner');

        restify.RestError.call(this, {
                statusCode: 404,
                restCode: 'TaskNotFound',
                message: owner + ' was not found',
                constructorOpt: TaskNotFoundError
        });

        this.name = 'TaskNotFoundError';
}

util.inherits(TaskNotFoundError, restify.RestError);

/**
 * Our Server
 */


var server = restify.createServer({
        name: "Windows Azure Active Directroy TODO Server",
    version: "1.0.0"
});

        // Ensure we don't drop data on uploads
        server.pre(restify.pre.pause());

        // Clean up sloppy paths like //todo//////1//
        server.pre(restify.pre.sanitizePath());

        // Handles annoying user agents (curl)
        server.pre(restify.pre.userAgentConnection());

        // Set a per request bunyan logger (with requestid filled in)
        server.use(restify.requestLogger());

        // Allow 5 requests/second by IP, and burst to 10
        server.use(restify.throttle({
                burst: 10,
                rate: 5,
                ip: true,
        }));

        // Use the common stuff you probably want
        server.use(restify.acceptParser(server.acceptable));
        server.use(restify.dateParser());
        server.use(restify.queryParser());
        server.use(restify.gzipResponse());
        server.use(restify.bodyParser({ mapParams: true}));
        server.use(restify.authorizationParser());

        /// Now the real handlers. Here we just CRUD

        server.get('/tasks', listTasks);
        server.head('/tasks', listTasks);
        server.get('/tasks/:owner', getTask);
        server.head('/tasks/:owner', getTask);
        server.post('/tasks/:owner/:task', createTask);
        server.post('/tasks', createTask);
        server.del('/tasks/:owner/:task', removeTask);
        server.del('/tasks/:owner', removeTask);
        server.del('/tasks', removeTask);
        server.del('/tasks', removeAll, function respond(req, res, next) { res.send(204); next(); });


        // Register a default '/' handler

        server.get('/', function root(req, res, next) {
                var routes = [
                        'GET     /',
                        'POST    /tasks/:owner/:task',
                        'POST    /tasks (for JSON body)',
                        'GET     /tasks',
                        'PUT     /tasks/:owner',
                        'GET     /tasks/:owner',
                        'DELETE  /tasks/:owner/:task'
                ];
                res.send(200, routes);
                next();
        });

         module.exports.policies = {
           // Default policy for all controllers and actions
           '*': 'authenticated'
         };

         module.exports = function (req, res, done) {
   passport.authenticate('bearer', {session: false}, function(err, user, info) {
     if (err) return done(err);
     if (user) return done();

     return res.send(403, {message: "You are not permitted to perform this action."});
   })(req, res);
 };


// Let's start using Passport.js

 server.use(passport.initialize());



  server.listen(serverPort, function() {

  var consoleMessage = '\n Windows Azure Active Directory Tutorial'
  consoleMessage += '\n +++++++++++++++++++++++++++++++++++++++++++++++++++++'
  consoleMessage += '\n %s server is listening at %s';
  consoleMessage += '\n Open your browser to %s/tasks\n';
  consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n'
  consoleMessage += '\n !!! why not try a $curl -isS %s | json to get some ideas? \n'
  consoleMessage += '+++++++++++++++++++++++++++++++++++++++++++++++++++++ \n\n'

  console.log(consoleMessage, server.name, server.url, server.url, server.url);

});
