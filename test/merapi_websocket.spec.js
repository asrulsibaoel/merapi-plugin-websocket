"use strict";

const merapi = require("merapi");
const { async, Component } = require("merapi");
const request = require("supertest");

/* eslint-env node, mocha */
describe("Merapi Plugin: Websocket", () => {
    let port = 3033;

    afterEach(function () {
        port++;
    });

    
    it("Should register the components with 3 nested level", async(function* () {
        const components = {
            'levelOne': {
                'levelTwo': {
                    'levelThree': [
                        'emit',
                    ]
                }
            }
        };

        
    }));
});