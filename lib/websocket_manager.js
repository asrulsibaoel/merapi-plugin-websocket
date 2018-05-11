"use strict";

const {Component, AsyncEmitter} = require("merapi");
const MerapiWebsocket = require("./merapi_websocket");

class WebsocketManager extends Component.mixin(AsyncEmitter) {
    constructor(config, logger, container) {
        super();
        this.config = config;
        this.logger = logger;
        this.container = container;
    }

    *initialize() {
        const options = this.config.default("websocket", {});
        console.log(options.connection);
        const merapiWebsocket = new MerapiWebsocket(options, this.logger, this.container);
        merapiWebsocket.initialize();
    }
}

module.exports = WebsocketManager;