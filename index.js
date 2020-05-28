const path = require('path');
const express = require('express');
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//inicia el server
const server = app.listen(app.get('port'), () =>{
    console.log('Ay mi rey eschuchame esta', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('nueva penetracion', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });
});