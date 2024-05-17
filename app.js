const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const userRouter = require("./routers/user");
const recordRouter = require("./routers/record");
const mapRouter = require("./routers/map")

app.use("/user", userRouter);
app.use("/record", recordRouter);
app.use("/map", mapRouter);

app.get("*", (req, res) => {
  res.send("404 Not Found");
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})