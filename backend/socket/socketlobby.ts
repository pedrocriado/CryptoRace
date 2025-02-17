import { Server as SocketIOServer, Socket } from "socket.io";
import mongoose from "mongoose";
import { LobbyModel } from "../models/Lobby";

interface JoinLobby {
    lobbyId: string;
    playerName: string;
    isHost: boolean;
}

const lobbyHandler = (socket: Socket, io: SocketIOServer) => {
    socket.on('joinLobby', async (data: JoinLobby) => {
        await socket.join(data.lobbyId);
        socket.data.playerName = data.playerName;
        socket.data.isHost = data.isHost;

        //working but I dont have a client side connection yet so I can't test it
        //const roommateSockets = await io.in(data.roomId).fetchSockets();
        //const players = [];
        //for (roommate of roommateSockets) {
        //    players.push({
        //        id: roommate.id,
        //        name: roommate.data.playerName,
        //       isHost: roommate.data.isHost,
        //        boardPosition: 0,
        //        animationState: 'walking'
        //    });
        //}
    });

    socket.on('leaveLobby', (lobbyId: string) => {
        socket.leave(lobbyId);
    });

    socket.on('startGame', (lobbyId: string) => {
        const objectId = new mongoose.Types.ObjectId(lobbyId);
        const lobby = LobbyModel.findById(objectId);
        lobby.gameStarted = true;
        io.to(lobbyId).emit('gameStarted');
    });

    socket.on('endGame', (lobbyId: string) => {
        const objectId = new mongoose.Types.ObjectId(lobbyId);
        const lobby = LobbyModel.findById(objectId);
        lobby.gameStarted = false;
        io.to(lobbyId).emit('gameEnded');
    });
};

export default lobbyHandler;