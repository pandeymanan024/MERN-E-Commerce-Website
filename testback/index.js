const express = require("express");

const app = express();

const port =  8000;

app.get("/login", (req, res) => {
    return res.send("you are visiting a login route");
});

app.listen(port, () => {
    console.log("server is up and running but i am down");
});