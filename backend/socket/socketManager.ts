import { Server } from 'http';
import { Server as SocketIOServer } from "socket.io";
import lobbyHandler from './socketlobby';

interface SocketManager {
    io: SocketIOServer | null;
    initialize(server: Server): void;
    getIO(): SocketIOServer;
}

const socketManager: SocketManager = {
    io: null,
    initialize(server: Server): void {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: process.env.CLIENT_URL || "*", // Adjust this for security
                credentials: true, // Allow cookies to be sent with requests
            },
        });
        this.io.on("connection", (socket) => {
            if(this.io) {
                lobbyHandler(socket, this.io);
            }
            socket.on("disconnect", () => {
                console.log("Socket disconnected: " + socket.id);
            });
        });
    },
    getIO(): SocketIOServer {
        if (!this.io) {
            throw new Error("Socket.io not initialized");
        }
        return this.io;
    },
};

export default socketManager;