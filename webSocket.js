const webSocket = require('ws')

const webSocketServer = new webSocket.Server({
    port: 3000,
}, () => console.log('server started on port 3000'))