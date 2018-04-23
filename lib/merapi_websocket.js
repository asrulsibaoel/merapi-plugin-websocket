import { callbackify } from "util";

"use strict";

const { Component } = require("merapi");
const Express = require("express");
const server = require("http");
const io = require("socket.io")();

module.exports = class MerapiWebsocket extends Component {
    constructor(options, logger) {
        super();
        this.port = component.resolve("websocket.port", 3000);
        express = component.resolve("express", {});
        this.events = component.resolve("websocket.connection", {});
    }

    *setupWebsocket(component) {

        io.on('connection', function(socket){
            for (let event in events) {
                if (events.hasOwnProperty(event)) {
                    const handler = events[event];
                    const { componentInstanceName, callBackHandler } = handler.split(".");
                    
                    socket.on(event), function (action) {
                        const componentInstanceObject = component.resolve(componentInstanceName, {});
                        io.emmit(event, componentInstanceObject[callBackHandler](params));
                    }
                }
            }
        });

        return io;
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

    // iterateSubHandler(events) {
    //     for (let event in events) {
    //         if (events.hasOwnProperty(event)) {
    //             const handler = events[event];
    //             if (typeof handler === "object") {
    //                 // const callbackHandler = (cbHandler) => {
    //                 //     this.submitEvent(,cbHandler);
    //                 // };
    //                 socket.on(event,);
    //             }
    //             const { componentInstanceName, callBackHandler } = handler.split(".");
    //             socket.on(event, function (action) {
    //                 const componentInstanceObject = component.resolve(componentInstanceName, {});
    //                 io.emmit(event, componentInstanceObject[callBackHandler](params));
    //             });
    //         }
    //     }
    // }

    *initialize() {

        this.websocketClient = this.setupWebsocket(component);
        this.websocketClient.listen(port);
    }


}