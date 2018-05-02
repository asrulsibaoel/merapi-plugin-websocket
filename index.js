"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const WebsocketManager = require("./lib/websocket_manager");

module.exports = function () {

    return {

        *onBeforeComponentsRegister(container) {
            container.register("WebsocketManager", WebsocketManager);
        },
        typeWebsocket(name, opt) {
            // this.apps.push(name);
            return function* (websocketManager, config) {
                opt.config = opt.config || "websocket";
                let cfg = config.default(opt.config, {});

                return websocketManager.initialize(cfg);
            };
        },
    };
};