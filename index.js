"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./lib/router");
const getfn = require("./lib/getfn");

module.exports = function () {

    return {

        *onBeforeComponentsRegister(container) {
            container.register("MerapiWebsocket", require("./lib/merapi_websocket"));
        },
        typeWebsocket(name, opt) {
            this.apps.push(name);
            return function* (config, injector, logger) {
                
                return app;
            };
        },
        *onStart(container) {
            let socket = yield container.resolve("MerapiWebsocket");
            yield service.start();
        },
    };
};