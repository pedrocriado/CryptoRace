import { Server as SocketIOServer, Socket } from "socket.io";
import mongoose from "mongoose";
import { LobbyModel } from "../models/Lobby";

interface JoinLobby {
    lobbyId: string;
    playerName: string;
    isHost: boolean;
}
//TODO: return the participants array.
//TODO: I am still thinking on if I should make a different folder or not
const lobbyHandler = (socket: Socket, io: SocketIOServer) => {
    socket.on('joinLobby', async (data: JoinLobby) => {
        await socket.join(data.lobbyId);
        socket.data.playerName = data.playerName;
        socket.data.isHost = data.isHost;
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