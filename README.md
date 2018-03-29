# Merapi Plugin: Websocket

### Introduction

This plugin will connect to Socket.io library.

### Installation

Add plugin to dependency list in `package.json`

```
{
    "name": "application",
    "version": "1.0.0",
    "dependencies": {
        "merapi-plugin-websocket": "^0.0.1"
    }
}
```

Install using npm:

```
npm install merapi-plugin-websocket --save
```

### Usage

Add this several line to your `service.yml`

```
name: publisher
version: 1.0.0
plugins:
    - websocket
websocket:
    port: 3030
    trigger: connection
```

