const app = require("./app");
const http = require("http");
const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log(`Server is listening on Port ${port}`)
})
