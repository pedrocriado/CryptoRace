import { Server } from 'http';
import { Server as SocketIOServer } from "socket.io";

interface SocketManager {
    io: SocketIOServer | null;
    initialize: (server: Server) => void;
    getIO: () => SocketIOServer;
}

const socketManager: SocketManager = {
    io: null,
    initialize(server: Server) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: process.env.CLIENT_URL || "*", // Adjust this for security
                credentials: true, // Allow cookies to be sent with requests
            },
        });
    },
    getIO() {
        if (!this.io) {
            throw new Error("Socket.io not initialized");
        }
        return this.io;
    },
};

export default socketManager;