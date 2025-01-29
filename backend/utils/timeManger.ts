type SetFunction = (...args: any[]) => void

interface TimeManager {
    timeouts: Map<string, NodeJS.Timeout>;
    add(lobbyId: string, timeoutId: NodeJS.Timeout): void;
    get(lobbyId: string): NodeJS.Timeout | undefined;
    clear(lobbyId: string): void;
    set(SetFunction: SetFunction, time: number, lobbyId: string): void;
}
const timeManager: TimeManager = {
    timeouts: new Map(),
    add: function (lobbyId:string, timeoutId: NodeJS.Timeout) {
        this.timeouts.set(lobbyId, timeoutId);
    },
    get: function (lobbyId: string) {
        return this.timeouts.get(lobbyId);
    },
    clear: function (lobbyId) {
        const timeoutId = this.timeouts.get(lobbyId);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.timeouts.delete(lobbyId);
        }
    },
    set: function (setFunction: SetFunction, time: number, lobbyId:string) {
        const timeoutId = setTimeout(setFunction, time, lobbyId);
        this.add(lobbyId, timeoutId);
    }
}