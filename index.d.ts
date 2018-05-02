"use strict";

import * as io from  "socket.io";

declare module "merapi-plugin-websokcet" {
    export interface MerapiWebsocket {
        setupWebsocket(): any;
    }

}