const webSocket = require('ws')

const webSocketServer = new webSocket.Server({
    port: 3000,
}, () => console.log('server started on port 3000'))

//обращаемся к серверу
//вторым параметром пишем call back функцию, которая будет отрабатавыть на событие "connection"
//функция connection принимает ws подключение это значит она принимает одного конкретного пользователя
//далее мы на этого пользоваетля вешаем слушатель событий message
wss.on('connection', function connection(ws){

   //второй параметр это call back function которая будет отрабатывать на слушатель событий message
   //когда сообещние будет отправлено будет отрабатывать кол бэк функция
   ws.on('message', function(message){

      //переводим json строку в json объект
       message = JSON.parse(message);

       //next create switch for listeners of events

       switch(message.event){
           //if 'message' handled we send response to all users who authorizated
           case 'message':
               broadcastingMessageToAllUsers(message)
               break;

           case 'connection':
               broadcastingMessageToAllUsers(message)
               break;
       }

    })
})

function broadcastingMessageToAllUsers(message){
  wss.clients.forEach(client =>{

      //we send message all clients who are connecting to server right now
     client.send(JSON.stringify(message));
  })
}
