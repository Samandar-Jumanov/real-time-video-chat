import { Socket , Server } from 'socket.io'
import Room from '../controller/room'
import RoomType from '../interface';

export const socketServer = (io: Server) => {
    const room = new Room();
    
    io.on('connection', (socket: Socket) => {
       socket.emit("Id" , socket.id)
      socket.on('create-room', (data) => {
        room.createRoom(data.roomName, data.adminName, socket.id);
      });
  
      socket.emit('rooms-available', room.rooms);
  /// Join room process 

   socket.on('join-room', ( data ) => {
    room.joinToRoom(data.roomName, data.userName);
   });
    
      
      socket.emit('leave-room', (data: RoomType) => {
        room.deleteRoom(data.roomName);
      });
      
  
      socket.on('room', (roomName: string) => {
        const foundRoom = room.search(roomName);
        socket.emit('room-info', foundRoom);
      });
  
      socket.on('leave-room', (roomName: string, userName: string) => {
        room.leaveRoom(roomName, userName);
      });

      socket.on('offer', (data) => {
        // Broadcast the offer to the other user
        io.to(data.target).emit('offer', data.offer);
      });
    
      socket.on('answer', (data) => {
        // Broadcast the answer to the other user
        io.to(data.target).emit('answer', data.answer);
      });
    
      socket.on('ice-candidate', (data) => {
        // Broadcast the ice candidate to the other user
        io.to(data.target).emit('ice-candidate', data.candidate);
      });
  
      socket.on('disconnect', () => {
        console.log(`${socket.id} is disconnected`);
        room.removeUserOnDisconnect(socket.id);
      });
    });
  };