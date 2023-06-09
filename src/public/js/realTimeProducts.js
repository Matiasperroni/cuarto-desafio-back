
const socket = io();

socket.emit("algo", "nose algo")
socket.on("message", (data)=>{console.log(data)})
socket.on("hola", (asd) => {
    console.log(asd);
})
