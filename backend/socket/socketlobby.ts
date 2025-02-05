import { Server as SocketIOServer, Socket } from "socket.io";

interface JoinLobby {
    lobbyId: string;
    playerName: string;
    isHost: boolean;
}
//TODO: I am still thinking on if I should make a different folder or not
const lobbyHandler = (socket: Socket, io: SocketIOServer) => {
    socket.on('joinLobby', async (data: JoinLobby) => {
        await socket.join(data.lobbyId);
        socket.data.playerName = data.playerName;
        socket.data.isHost = data.isHost;
    });

    socket.on('leaveLobby', (lobbyId: string) => {
        socket.leave(lobbyId);
        console.log(`User left Lobby ${lobbyId}`);
    });

    socket.on('startGame', (lobbyId: string) => {
        io.to(lobbyId).emit('gameStarted');
    });

    socket.on('endGame', (lobbyId: string) => {
        io.to(lobbyId).emit('gameEnded');
    });
};

export default lobbyHandler;