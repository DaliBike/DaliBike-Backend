const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const schedule = require('node-schedule');
const reportController = require("./controller/report");

app.use(express.json());

const userRouter = require("./routers/user");
const recordRouter = require("./routers/record");
const mapRouter = require("./routers/map")
const postRouter = require("./routers/post");
const reportRouter = require("./routers/report");
const managerRouter = require("./routers/manager");

const autoApprove = schedule.scheduleJob('* * * * * *', async function() {
  reportController.registerAutoApprove();
});
app.use(express.static('/'));
app.use("/user", userRouter);
app.use("/record", recordRouter);
app.use("/map", mapRouter);
app.use("/post", postRouter);
app.use("/report", reportRouter);
app.use("/manager", managerRouter);


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("404 Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
