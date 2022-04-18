const RequestClient = require('./dist/lib/RequestClient');
var s = new RequestClient.default("unix:///var/snap/lxd/common/lxd/unix.socket")
s.get('/1.0').then(data => {
    console.log(data.data)
})
s.websocket('/1.0/events').on('message', (data) => {
    console.log(data.toString());
})