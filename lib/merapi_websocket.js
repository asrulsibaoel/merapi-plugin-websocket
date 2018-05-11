"use strict";

const { Component } = require("merapi");
const io = require("socket.io")();
// import * as io from "socket.io";

module.exports = class MerapiWebsocket extends Component {
    constructor(options, logger, container) {
        super();
        this.logger = logger;
        this._websocketConf = options;
        this._port = options.port ? options.port: 3000;
        this._connection = options.connection ? options.connection: {};
        this._io = io;
        this._container = container;
    }

    *setupWebsocket() {
        if (this._connection) {
            return yield this.submitEvent(this._io, "connection", this._connection);
        } else {
            throw new Error("Websocket config must be defined in service.yml");
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
                                this.emitEvent(io, eventName, handler, socket);
                                break;
                            default:
                                this.emitEvent(io, eventName, handler, socket);
                                break;
                        }
                    }
                }
                
            });

            return io;
        } catch(exception) {
            throw exception;
        }
    }

    *emitEvent(mainIo, eventName, handler, socket) {
        const [componentInstanceName, callBackHandler] = handler.split(".");
        const classHandler = yield this._container.resolve(componentInstanceName, {});
        const methodHandler = classHandler[callBackHandler](socket);
        mainIo.emit(eventName, methodHandler);
    }

    *initialize() {
        try {
            const socket = yield this.setupWebsocket();

            if (socket.listen(this._port)) {
                console.log("\n==[Socket running on port: " + this._port + "]==");
            }
        } catch (exception) {
            throw exception;
        }
    }
}