/**
 * Created by wurui on 9/24/16.
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var command=require('./command.js')
var path=require('path');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/admin', function(req, res){
    res.sendFile(path.join(__dirname,'admin.html'));
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);

        io.emit('chat message', msg);
        command.input(msg,function(content){
            console.log('input',content)
            if(typeof content =='object'){
                content=JSON.stringify(content)
            }
            io.emit('chat response', content);
        })
    });

});

app.set('port', process.env.PORT || 9380);

var server = http.listen(app.get('port'), function() {
    console.log('start at port:' + server.address().port);
});