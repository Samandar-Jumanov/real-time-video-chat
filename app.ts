import express , {Application , Request , Response } from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server , Socket  } from 'socket.io'
import cors from 'cors'
import mongoDBConnection from './utils/connect-mongo'
const app :Application = express()

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
    // credentials: true,
  },
});

app.use(morgan('dev'))
app.use(express.json());
app.use(cors());




app.get('/' , ( request : Request , response : Response ) => {
            response.json({
                message :' Hello world '
            })
})

mongoDBConnection()


server.listen(3001, () =>{
          console.log("Server is running ")
});




