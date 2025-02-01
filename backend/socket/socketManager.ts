import { Server as SocketIOServer } from "socket.io";

//TODO: fix all this
const socketManager = {
    io: SocketIOServer | null = null,
    initialize(server: Server) {
        this.io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL || "*", // Adjust this for security
                credentials: true, // Allow cookies to be sent with requests
            },
        });
    },
    getIO() {
        if (!socketManager.io) {
            throw new Error("Socket.io not initialized");
        }
        return socketManager.io;
    },
};

export default socketManager;