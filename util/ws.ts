export const ws = new WebSocket('ws://localhost:3005');

ws.onopen = () => {
    console.log("WS Connexion Sucess");
};
