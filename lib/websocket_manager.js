"use strict";

const { Component } = require("merapi");
const MerapiWebsocket = require("./merapi_websocket");

class WebsocketManager extends Component {
    constructor(config, logger) {
        super();
        this.config = config;
        this.logger = logger;
    }

    initialize(options) {
        const merapiWebsocket = new MerapiWebsocket(options, this.logger);
        merapiWebsocket.initialize();
        return redisClient;
    }
}

module.exports = WebsocketManager;