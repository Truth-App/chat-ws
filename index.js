const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const activeUsers = {};

io.on('connection', (socket) => {
  console.log("user joined:", socket.id);

  socket.on('login',(data)=>{
    activeUsers[socket.id]= data;
    console.log("active users :", activeUsers)
  })

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect',()=>{
    delete activeUsers[socket.id];
    console.log("active users",activeUsers);
  })
});



http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
