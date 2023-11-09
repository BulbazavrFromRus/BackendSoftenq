const tls = require('tls');
const socket = new tls.TLSSocket(/* параметры */);

// Установка предела на количество слушателей событий для объекта TLSSocket
socket.setMaxListeners(200);