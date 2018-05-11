"use strict";

const WebsocketManager = require("./lib/websocket_manager");

module.exports = function () {

    return {

        *onAfterComponentsRegister(container) {
            container.register("websocket", WebsocketManager);
        },

        *onStart(container) {
            const websocket = yield container.resolve("websocket");
        }
    };
};