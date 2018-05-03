"use strict";

const { Component } = require("merapi");
// import * as io from "socket.io";

module.exports = class MerapiWebsocket extends Component {
    constructor(options, logger) {
        super();
        this.logger = logger;
        this._websocketConf = options;
        this._port = this._websocketConf.port ? this._websocketConf.port: 3000;
        this._connection = this._websocketConf.connection ? this._websocketConf.connection: {};
        this._express = component.resolve("express", {});
    }

    initialize() {
        const app = this._express;
        const httpServer = server.createServer(app);
        this._io = require("socket.io")(httpServer);
        this.setupWebsocket();
    }
    *setupWebsocket(component) {
        if (this._connection) {
            this.submitEvent(this._io, "connection",this._connection);
        }
    }

    *submitEvent(io, eventName, objs) {
        try {
            
            io.on(eventName, (socket) => {
                for(const obj in objs) {
                    if (objs.hasOwnProperty(obj)) {
                        const handler = objs[obj];
                        switch(typeof handler) {
                            case "object":
                                this.submitEvent(socket, obj, handler);
                                break;
                            case "array":
                                this.emitEvent(obj, handler, socket);
                                break;
                            default:
                                this.emitEvent(obj, handler, socket);
                                break;
                        }
                    }
                }
                
            });            
        } catch(exception) {
            throw exception;
        }
    }

    emitEvent(eventName, handler, socket) {
        const { componentInstanceName, callBackHandler } = handler.split(".");
        const classHandler = Component.resolve(componentInstanceName, {});
        const methodHandler = classHandler[callBackHandler];
        const execHandler = methodHandler.apply(null, [1,2,3,4]);

        socket.emit(eventName, execHandler);
    }

    *initialize() {

        this.websocketClient = this.setupWebsocket(component);
        this.websocketClient.listen(port);
        console.log("==[Socket running on port: " + port + "]==");
    }


}