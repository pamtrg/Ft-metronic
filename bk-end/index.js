require('dotenv').config();
const cors = require('cors');

const ProxyAgent = require('proxy-agent')
const {app,httpServer} = require('./src/models/socket')
const connectTiktok = require('./src/models/tiktok');
const { io } = require('./src/models/socket');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;




mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected Successfully');
})

app.use(cors())


const routes = require('./src/routes/tiktok');
const routes_bigspy = require('./src/routes/bigspy');
app.use('/api/tiktok', routes)
app.use('/api/bigspy', routes_bigspy)


io.on('connection', (socket) => {
    console.log('New connection from origin', socket.handshake.headers['origin'] || socket.handshake.headers['referer']);
    connectTiktok(socket);

}
)


const port = process.env.PORT;
httpServer.listen(port);
console.info(`Server running! Please visit http://localhost:${port}`);