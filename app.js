const express = require('express')
const path = require('path')
const app = express()
const port = 3000
app.use(express.json());

const userRouter = require("./routers/user");
const recordRouter = require("./routers/record");
const mapRouter = require("./routers/map")
const postRouter = require("./routers/post");
const reportRouter = require("./routers/report");
const managerRouter = require("./routers/manager");
const commentRouter = require("./routers/comment");

app.use(express.static('/'));
app.use("/user", userRouter);
app.use("/record", recordRouter);
app.use("/map", mapRouter);
app.use("/post", postRouter);
app.use("/report", reportRouter);
app.use("/manager", managerRouter);
app.use("/comment", commentRouter);


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
